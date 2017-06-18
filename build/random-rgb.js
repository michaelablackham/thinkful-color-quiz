var App = App || {}

App.RandomRGB = (function ($) {
  'use strict';

  // CHOOSE RANDOM CORRECT ANSWER
  function correctAnswer () {
    return Math.floor(Math.random() * 3);
  };

  // Generate one random color
  function randomColor () {
    var colorCode = [];
    for (var i = 0; i < 3; i++) {
      var number = Math.floor(Math.random() * 255);
      colorCode.push(number);
    }
    return colorCode;
  };

  // get three random RGB codes
  function randomChoices () {
    var colorCodes = [];
    for (var i = 0; i < 3; i++) {
      colorCodes.push(randomColor());
    }
    return colorCodes;
  };

  // equivalent to `module.exports`
  return {
    choices: randomChoices,
    correctAnswer: correctAnswer
  }
})(jQuery)
