

//调试程序
//1、Module._load(id, this, /* isMain */ false);    加载模块
//2、Module._resolveFilename 根据相对路径获取绝对路径地址
//3、let module=new Module(filename, parent) //创建模块 id export
//4、tryModuleLoad 尝试解析模块
//5、通过不同的后缀进行加载 .js .json
//6、Module._extensions[extension](this, filename)  //根据后缀名去解析
//7、fs.readFileSync(filename, 'utf8') 读取内容
//8、给文件外加一个函数并且让函数执行 改变this 指向并且传入（module,require,filename,dirname ）
//9、用户会给module.exports 赋值
//10、最终返回module.exports


//实现
let fs = require('fs');
let path = require('path');
let vm = require('vm');
function Module(fileName) {
    this.id = fileName;
    this.exports = {

    }
}
Module.wrapper = [
    '(function(exports ,require,module,__filename,___dirname){',
    '})'
]
Module._extensions = {
    '.js'(module) {
        //读取文件
        let context = fs.readFileSync(module.id, 'utf8') //module.exports = 'hello world'
        //文件外包装函数
        context = Module.wrapper[0] + context + Module.wrapper[1]; //function(module,require,__filename,___dirname){module.exports = 'hello world'}
        const fn = vm.runInThisContext(context);//变成函数
        let exports = module.exports;
        let dirname = path.dirname(module.id)
        //执行函数字符串并且传递参数
        fn.call(exports, exports, req, module, module.id, dirname)

    },
    '.json'(module) {
        //读取文件
        let context = fs.readFileSync(module.id, 'utf8') //{"name":"张三"}
        module.exports = JSON.parse(context);
		
    }
}

Module._resolveFilename = function (fileName) {
    let obsName = path.resolve(__dirname, fileName)
    let isExist = fs.existsSync(obsName)
    if (isExist) {
        return obsName
    } else {
        let ext = Object.keys(Module._extensions);
        for (let i = 0; i < ext.length; i++) {
            let flag = fs.existsSync(obsName + ext[i])
            if (flag) return obsName + ext[i]
        }
        throw new Error('fileName not exist')
    }

}

Module.prototype.load = function () {
    let ext = path.extname(this.id)
    Module._extensions[ext](this)
}
Module._cache = {}//缓存模块
function req(fileName) {
    fileName = Module._resolveFilename(fileName)
    if (Module._cache[fileName]) {
        return Module._cache[fileName].exports;
    }
    let module = new Module(fileName);
    Module._cache[fileName] = module
    module.load()
    return module.exports;
}

let a = req('./b')
let b = req('./useA')
console.log(a)