// let alertFn=(n)=>()=>{console.log(n)}
// Promise.resolve().then(alertFn(3))
// setImmediate(alertFn(2))
// setTimeout(alertFn(1),0)

setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
  Promise.resolve().then(_ => {
    console.log('before timeout')
  }).then(_ => {
    Promise.resolve().then(_ => {
      console.log('also before timeout')
    })
  })
})

console.log(2)
