let id=0
class Dep{
  constructor(){
    this.id=id++;
    this.watcher=[]
  }
  add(watcher){
    this.watcher.push(watcher)
  }
  depend(){
    Dep.target.addDep(this)
  }
  notify(){
    this.watcher.forEach(watch => {
      watch.update()
    });
  }
}


export default Dep