var App = App || {}

App.Hello = (function () {
  function sayHello (message) {
    console.log(new Date(), ' New message from Hello module:', typeof message)
  }

  function update (context) {
    sayHello(context)
  }

  return {
    sayHello: sayHello,
    update: update
  }
})()

// App.Hello.sayHello('Hi') // => Hi
// App.Hello.update('Hi') // => Hi
