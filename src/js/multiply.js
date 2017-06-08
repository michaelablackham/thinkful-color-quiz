var App = App || {};

App.multiply = (function () {

  var message = "One more operation done with multiply!"

  function multiply (x, y) {
    var total = 0

    for (var i = 0; i < y; i++) {
      total = App.sum(total, x)
    }

    console.log(message)
    return total
  }

  return multiply
})();
