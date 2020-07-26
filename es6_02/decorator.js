//装饰器

@log1()
class Animal{

}

function log1(){
  console.log('log')
  return function(target){
    console.log('inner1 log')
  }
}