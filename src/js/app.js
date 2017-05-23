// (function() {
  'use strict';
  //////////////////////////////////////////
  //object state
  //////////////////////////////////////////
  var state = {
    // questions: [
    //   {
    //     rgba: rgbValue
    //   }
    // ]
  };

  var colors = {
    value: []
  };

  //////////////////////////////////////////
  //Variables
  //////////////////////////////////////////
  var min = 0;
  var max = 250;

  var progressItem = [
    '<li class="@result">',
      '<i class="fa fa-@check" aria-hidden="true"></i>',
    '</li>'
  ].join('');

  //////////////////////////////////////////
  //state modification functions
  //////////////////////////////////////////

  //CHOOSE ITEM ITEM
  // function checkItem (state, index, newState) {
  //   state.items[index] = newState;
  // }

  $(".options--input input").click(function () {
    $(".options--input").removeClass('active');
    $(this).parent().addClass('active');
  });

  //////////////////////////////////////////
  //functions that render state
  //////////////////////////////////////////
  //create a for loop to gather 3 random numbers
  var RGBValue = function (min, max) {
    for (var i = 0; i <3; i++) {
      connsole.log (Math.floor(Math.random() * 250 - 1)) ;
    }
  }

  //////////////////////////////////////////
  //event listeners
  //////////////////////////////////////////

  function startButton () {
    $('button.start').click(function () {
      $('header').addClass('active');
      $('body').removeClass('home');
      $('#home').hide();
      $('#question').fadeIn('slow');
      $('.pager').fadeIn();
    });
  }

  function initiateQuiz () {
    startButton ();
  }
  //NEW RGB VALUE
  initiateQuiz();
// });
