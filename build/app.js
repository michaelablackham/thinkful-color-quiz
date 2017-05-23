// (function() {
  'use strict';

  //object state
  var state = [];

  var colors = [];

  //Variables
  var min = 0;
  var max = 250;

  //state modification functions
  //create a for loop to gather 3 random numbers
  function getRandomNumber(min, max) {
    console.log( Math.floor(Math.random()) );

    for (var i = 0; i <3; i++) {

    }
  }

  getRandomNumber();

  //functions that render state
  $('button.start').click(function () {
    $('header').addClass('active');
    $('body').removeClass('home');
    $('#home').fadeOut();
    $('#question').fadeIn();
  });

  //event listeners

  function startButton () {

  }

  function initiateQuiz () {

  }

  initiateQuiz();
// });
