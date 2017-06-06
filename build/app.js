$(function() {
  'use strict';
  //////////////////////////////////////////
  //object state
  //////////////////////////////////////////
  var state = {
    question: [
      {
        choices: [],
        correctAnswer: 0
      },
      {
        choices: [],
        correctAnswer: 0
      },
      {
        choices: [],
        correctAnswer: 0
      },
      {
        choices: [],
        correctAnswer: 0
      },
    ],
    correctText: '(งツ)ว',
    wrongText: '(╯°□°）╯︵ ┻━┻',
    score: 0,
    currentQuestion: 0,
    currentPage: 'pageStart',
    lastCorrect: false,
    correctColor: []
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
  };

  function reset(state) {
    state.score = 0;
    state.currentQuestion = 0;
    setCurrentPage(state, 'pageStart');
  };

  function advance(state) {
    // state.currentQuestion++;
    // if (state.currentQuestion === 5) {
    //   setRoute(state, 'pageResult');
    // }
    // else {
      // currentPage(state, 'pageQuestion');
    // }
  };

  //CHOOSE RANDOM CORRECT ANSWER
  var randomCorrect = function (state) {
    var number = Math.floor(Math.random() * 3);
    console.log(number)
  }

  //GENERATOR RANDOM 3 VALUES
  var randomColor = function (state) {

    var colorCode = [];
    for (var i = 0; i <3; i++) {
      var number = Math.floor(Math.random() * 250);
      colorCode.push(number);
    }
    return colorCode;
  }

  //PUSH RANDOM COLORS TO STATE
  var randomChoices = function (state) {
    var colorCode = [];

    for (var i = 0; i <3; i++) {
      var number = randomColor();
      colorCode.push(number);
    }

    return colorCode;
  }

  function startPage (state, element) {
    // var template = [
    //   "<section id='page-start' class='screen-home container'>",
    //   "  <button class='start pulse-button'>Let's Begin</button>",
    //   "</section>"
    // ].join('');
    //
    // element.html(template);
    // addUIHandlers(state, element);
    startButton(state);
  };

  function questionPage (state, element) {
    console.log(randomChoices());
  };

  //////////////////////////////////////////
  //functions that render state
  //////////////////////////////////////////
  function renderQuiz(state, elements) {
    console.log(state.currentPage+' renderQuiz')
    // default to hiding all routes, then show the current route
    Object.keys(elements).forEach(function(currentPage) {
      elements[currentPage].hide();
    });

    elements[state.currentPage].show();

    if (state.currentPage === 'pageStart') {
      startPage(state, elements[state.currentPage]);
    }
    else if (state.currentPage === 'pageQuestion') {
      questionPage(state, elements[state.currentPage]);
    }
    else if (state.currentPage === 'pageAnswer') {
      answerPage(state, elements[state.currentPage]);
    }
    else if (state.currentPage === 'pageResult') {
      resultsPage(state, elements[state.currentPage]);
    }
  };

  //////////////////////////////////////////
  //event listeners
  //////////////////////////////////////////

  function startButton (state) {
    $('button.start').click(function () {
      $('body').removeClass('home').addClass('active');
      setCurrentPage(state, 'pageQuestion');
      renderQuiz(state, SECTION_ELEMENTS);
      $('.pager').fadeIn();
    });
  }

  $(function () {
    renderQuiz(state, SECTION_ELEMENTS);
  });
});
