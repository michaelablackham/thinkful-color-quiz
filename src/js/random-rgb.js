var App = App || {}

App.RandomRGB = (function ($) {
  'use strict'

  function randomRGB () {
    return {
      choices: randomChoices(),
      correctAnswer: randomCorrect()
    }
  }

  // CHOOSE RANDOM CORRECT ANSWER
  function randomCorrect (state, elements) {
    return Math.floor(Math.random() * 3);
  };

  // Generate one random color
  function randomColor (state) {
    var colorCode = [];
    for (var i = 0; i < 3; i++) {
      var number = Math.floor(Math.random() * 255);
      colorCode.push(number);
    }
    return colorCode;
  };

  // get three random RGB codes
  function randomChoices (state) {
    var colorCode = [];
    for (var i = 0; i < 3; i++) {
      var number = randomColor();
      colorCode.push(number);
    }
    return colorCode;
  };

  // equivalent to `module.exports`
  return randomRGB
})(jQuery)
