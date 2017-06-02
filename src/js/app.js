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
    currentPage: 'pageStart',
    lastCorrect: false,
    colorRandom: 0
  };

  //////////////////////////////////////////
  //Variables
  //////////////////////////////////////////

  var SECTION_ELEMENTS = {
    // 'pageHeader':  $('#page-header'),
    'pageStart':  $('#page-start'),
    'pageQuestion':  $('#page-question'),
    'pageAnswer':  $('#page-answer'),
    'pageResult':  $('#page-results')
  }

  // var progressItem = [
  //   '<li class="@result">',
  //     '<i class="fa fa-@check" aria-hidden="true"></i>',
  //   '</li>'
  // ].join('');

  //////////////////////////////////////////
  //state modification functions
  //////////////////////////////////////////

  //set the initial currentPage
  function setCurrentPage(state, currentPage) {
    state.currentPage = currentPage;
    console.log(state.currentPage)
  };

  function reset(state) {
    state.score = 0;
    state.currentQuestion = 0;
    setCurrentPage(state, 'pageStart');
  };

  function advance(state) {
    // state.currentQuestion++;
    // if (state.currentQuestionIndex === state.questions.length) {
    //   setRoute(state, 'final-feedback');
    // }
    // else {
      // setCurrentPage(state, 'pageQuestion');
    // }
  };

  //CHOOSE ITEM ITEM
  // function checkItem (state, index, newState) {
  //   state.items[index] = newState;
  // }

  function startPage (state, element) {
    startButton();
  };

  function questionPage (state, element) {
    console.log('question test')
  };

  //Reset the entire time

  // $(".options--input input").click(function () {
  //   $(".options--input").removeClass('active');
  //   $(this).parent().addClass('active');
  // });

  // function renderSomething () {
  //   var template = document;
  //
  //   document.replace('@content', '#page-start');
  // }

  //////////////////////////////////////////
  //functions that render state
  //////////////////////////////////////////
  function renderApplication(state, elements) {
    // default to hiding all routes, then show the current route
    console.log(state.currentPage + ' first')
    Object.keys(elements).forEach(function(currentPage) {
      elements[currentPage].hide();
    });

    console.log(state.currentPage + ' second')
    elements[state.currentPage].show();
    console.log(state.currentPage + ' third')

    if (state.currentPage === 'pageStart') {
        startPage(state, elements[state.currentPage]);
    }
    else if (state.currentPage === 'pageQuestion') {
        questionPage(state, elements[state.currentPage]);
    }
    else if (state.currentPage === 'pageAnswer') {
      AnswerPage(state, elements[state.currentPage]);
    }
    else if (state.currentPage === 'pageResult') {
      resultsPage(state, elements[state.currentPage]);
    }
  };

  //create a for loop to gather 3 random numbers
  // var Options = function (min, max) {
  //   for (var i = 0; i <3; i++) {
  //     connsole.log (Math.floor(Math.random() * 250 - 1)) ;
  //   }
  // }

  //////////////////////////////////////////
  //event listeners
  //////////////////////////////////////////

  function startButton (state, SECTION_ELEMENTS) {
    $('button.start').click(function (state, SECTION_ELEMENTS) {
      $('header').addClass('active');
      $('body').removeClass('home');
      setCurrentPage(state, 'pageQuestion');
      renderApplication(state, SECTION_ELEMENTS);
      $('.pager').fadeIn();
    });
  }

  // function initiateQuiz (state, SECTION_ELEMENTS) {
  //   $(pageStart).show();
  //   startButton (state, SECTION_ELEMENTS);
  // }

  $(function () {
    renderApplication(state, SECTION_ELEMENTS);
  });
});
