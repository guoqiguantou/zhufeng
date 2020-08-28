import './a'
import './b'
console.log(a)

// require('./index.css')

let fn=()=>{
  console.log(99)
}
fn()

console.log(DEV)

$.ajax({url:"/api/user",success:function(result){
  $("#root").html(result);
}});