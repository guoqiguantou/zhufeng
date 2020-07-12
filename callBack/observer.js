//观察者模式
//观察者和被观察者 之间是有联系的 观察者需要把自己加入到被观察者身上  当被观察者状态发生改变时 通知所有观察者

//观察者
class Observer {
    constructor(name){
        this.name=name
    }
    update(state){
        console.log(this.name+'的宝宝现在'+state)
    }
}

//被观察者
class Subscriber {
    constructor(state) {
        this.state = state;
        this.observer=[]
    }
    setState(state) {
        this.state = state;
        this.observer.forEach(item=>{
            item.update(state)
        })
    }
    add(observer){
        this.observer.push(observer)
    }
}

let baby = new Subscriber('开心')
let father = new Observer('老爸')
let mother = new Observer('妈妈')
baby.add(father);
baby.add(mother);
baby.setState('不开心')