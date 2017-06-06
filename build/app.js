$(function() {
  'use strict';
  //////////////////////////////////////////
  //object state
  //////////////////////////////////////////
  var state = {
    question: [],
    correctText: '(งツ)ว',
    wrongText: '(╯°□°）╯︵ ┻━┻',
    score: 0,
    currentQuestion: 0,
    currentPage: 'pageStart',
    lastCorrect: false,
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

  var choicesTemplate = [
    '<div class="options--input" style="background-color: rgba(@color);">',
      '<input type="radio" data-item-id="@index" name="input">',
      '<label for="@index">Color @index</label>',
    '</div>'
  ].join('');

  // var progressItem = [
  //   '<li class="@result">',
  //     '<i class="fa fa-@check" aria-hidden="true"></i>',
  //   '</li>'
  // ].join('');

  //////////////////////////////////////////
  //state modification functions
  //////////////////////////////////////////

  //set current progress item
  function currentProgress (state) {
    var currentQuestion = state.currentQuestion - 1;
    $('.pager li').eq(currentQuestion).addClass("active");
    console.log(state.currentQuestion)
  }

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
  var randomCorrect = function (state, elements) {
    var number = Math.floor(Math.random() * 3);
  }

  //Generate one random color
  var randomColor = function (state) {
    var colorCode = [];
    for (var i = 0; i <3; i++) {
      var number = Math.floor(Math.random() * 250);
      colorCode.push(number);
    }
    return colorCode;
  }

  //get three random RGB codes
  var randomChoices = function (state) {
    var colorCode = [];
    for (var i = 0; i <3; i++) {
      var number = randomColor();
      colorCode.push(number);
    }
    return colorCode;
  }

  //push colors to state
  function pushQuestionInfo (state) {
    state.question.choices = randomChoices();
    state.question.answer = randomCorrect();
  }

  function startPage (state, element) {
    startButton(state);
  };

  function renderQuestion (state) {
    pushQuestionInfo(state);
    $('h2.question .color span').text(state.question.choices[1]);
    currentProgress(state);
    applyColors(state);
  }

  //Apply colors to options
  var applyColors = function (state) {
    var choicesHTML = '';
    console.log('test1')

    state.question.forEach(function(index){
      var choiceHTML = choicesTemplate.replace('@index', '1');
      choicesHTML += choiceHTML;
      console.log('test')
    });

    $('.options').html(choicesHTML);
  }

  //////////////////////////////////////////
  //functions that render state
  //////////////////////////////////////////
  function questionPage (state) {
    state.currentQuestion++;
    renderQuestion(state);
  };

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
