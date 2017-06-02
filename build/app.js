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
        code: [255, 255, 0],
        correct: 'false'
      },
      {
        colorName: 'olive',
        code: [128, 128, 0],
        correct: 'false'
      },
      {
        colorName: 'green',
        code: [0, 128, 0],
        correct: 'false'
      },
      {
        colorName: 'purple',
        code: [128, 0, 128],
        correct: 'false'
      },
      {
        colorName: 'fuchsia',
        code: [255, 0, 255],
        correct: 'false'
      },
      {
        colorName: 'lime',
        code: [0, 255, 0],
        correct: 'false'
      },
      {
        colorName: 'teal',
        code: [0, 128, 128],
        correct: 'false'
      },
      {
        colorName: 'aqua',
        code: [0, 255, 255],
        correct: 'false'
      },
      {
        colorName: 'blue',
        code: [0, 0, 255],
        correct: 'false'
      },
      {
        colorName: 'navy',
        code: [0, 0, 128],
        correct: 'false'
      }
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
    console.log(state.currentPage + ' setting current page')
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


  //////////////////////////////////////////
  //functions that render state
  //////////////////////////////////////////
  function initiateQuiz(state, elements) {
    console.log(state.currentPage+' initiateQuiz')
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
      AnswerPage(state, elements[state.currentPage]);
    }
    else if (state.currentPage === 'pageResult') {
      resultsPage(state, elements[state.currentPage]);
    }
  };

  //////////////////////////////////////////
  //event listeners
  //////////////////////////////////////////

  function startButton (state, SECTION_ELEMENTS) {
    $('button.start').click(function (state, SECTION_ELEMENTS) {
      $('body').removeClass('home').addClass('active');
      setCurrentPage(state, 'pageQuestion');
      initiateQuiz(state, SECTION_ELEMENTS);
      $('.pager').fadeIn();
    });
  }

  $(function () {
    initiateQuiz(state, SECTION_ELEMENTS);
  });
});
