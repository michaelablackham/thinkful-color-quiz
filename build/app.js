$(function() {
  'use strict';

  //////////////////////////////////////////
  //object state
  //////////////////////////////////////////

  var state = {
    colors: [
      {
        colorName: 'maroon',
        code: [128, 0, 0]
      },
      {
        colorName: 'red',
        code: [255, 0, 0]
      },
      {
        colorName: 'orange',
        code: [255, 165, 0]
      },
      {
        colorName: 'yellow',
        code: [255, 255, 0]
      },
      {
        colorName: 'olive',
        code: [128, 128, 0]
      },
      {
        colorName: 'green',
        code: [0, 128, 0]
      },
      {
        colorName: 'purple',
        code: [128, 0, 128]
      },
      {
        colorName: 'fuchsia',
        code: [255, 0, 255]
      },
      {
        colorName: 'lime',
        code: [0, 255, 0]
      },
      {
        colorName: 'teal',
        code: [0, 128, 128]
      },
      {
        colorName: 'aqua',
        code: [0, 255, 255]
      },
      {
        colorName: 'blue',
        code: [0, 0, 255]
      },
      {
        colorName: 'navy',
        code: [0, 0, 128]
      }
    ],
    correctText: '(งツ)ว',
    wrongText: [
      '(╯°□°）╯︵ ┻━┻'
    ],
    score: 0,
    currentQuestion: 0,
    currentPage: 'start',
    lastCorrect: false,
    colorRandom: 0
  };

  //////////////////////////////////////////
  //Variables
  //////////////////////////////////////////

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

  function pageStart () {

  }

  //Reset the entire time

  $(".options--input input").click(function () {
    $(".options--input").removeClass('active');
    $(this).parent().addClass('active');
  });

  function renderSomething () {
    var template = document;

    document.replace('@content', '#page-start');
  }

  //////////////////////////////////////////
  //functions that render state
  //////////////////////////////////////////
  //create a for loop to gather 3 random numbers
  var Options = function (min, max) {
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
      // $('#root').html($('#page-question').html())
      $('.pager').fadeIn();
    });
  }

  function initiateQuiz () {
    startButton ();
  }

  $(function () {
    //NEW RGB VALUE
    initiateQuiz();
    $('#root').html($('#page-header').html());
    console.log('Random RGB:', ColorQuiz.RandomRGB());
  });
});
