$(function() {
  'use strict';

  //////////////////////////////////////////
  // object state
  //////////////////////////////////////////

  var state = {
    question: [],
    correctEmoji: '(งツ)ว',
    correctText: [
      'Great job! You must live in a  world of rainbows and unicorns!',
      'Did you really know the answer? Or did you just pick your favorite color?',
      'Yassss queeeen. You got it',
      "Taste the rainbow bitches"
    ],
    wrongEmoji: '(╯°□°）╯︵ ┻━┻',
    wrongText: [
      'Seriously? Is your favorite color black, like your soul?',
      'Uuuuugggghhhhhhhhh',
      'The world is a sad place because of your color choice',
      '50 shades of GRAY must be your favorite book....'
    ],
    score: 0,
    currentQuestion: 0,
    currentPage: 'pageStart',
    lastCorrect: false
  };

  //////////////////////////////////////////
  // Variables
  //////////////////////////////////////////

  var SECTION_ELEMENTS = {
    'pageStart':  $('#page-start'),
    'pageQuestion':  $('#page-question'),
    'pageAnswer':  $('#page-answer'),
    'pageResult':  $('#page-results')
  }

  var choicesTemplate = [
    '<div class="options--choice">',
    '<div class="options--input" style="background-color: rgb( @color );">',
    '<input type="radio" name="input">',
    '<label>Color @index</label>',
    '</div>',
    '</div>'
  ].join('');

  var progressIcon = '<i class="fa fa-@check" aria-hidden="true"></i>';

  //////////////////////////////////////////
  // state modification functions
  //////////////////////////////////////////

  // set current progress item
  function currentProgress(state) {
    var currentQuestion = state.currentQuestion;
    $('.pager li').eq(currentQuestion).addClass("current");
  }

  function progressCheck(state) {
    var currentQuestion = state.currentQuestion;
    $('.pager li').eq(currentQuestion).removeClass('current');
    if (state.lastCorrect === true) {
      $('.pager li').eq(currentQuestion).addClass("correct");
      $('.pager li').eq(currentQuestion).append(progressIcon.replace('@check', 'check'));
    } else {
      $('.pager li').eq(currentQuestion).addClass("incorrect");
      $('.pager li').eq(currentQuestion).append(progressIcon.replace('@check', 'close'));
    }
  }

  // set the initial currentPage
  function setCurrentPage(state, currentPage) {
    state.currentPage = currentPage;
  }

  function advance(state) {
    state.currentQuestion++;
    console.log(state)
    if (state.currentQuestion === 5) {
      setCurrentPage(state, 'pageResult');
    }
    else {
      setCurrentPage(state, 'pageQuestion');
    }

    renderQuiz(state);
  }

  //////////////////////////////////////////
  // functions that render state
  //////////////////////////////////////////


  //////////////////////////////////////////
  // RENDER RESULTS
  //////////////////////////////////////////
  function resultsPage (state) {
    nextButton(state);
  }

  //////////////////////////////////////////
  // RENDER ANSWERS
  //////////////////////////////////////////
  function answerQuestion(state) {
    var currentQuestion = state.currentQuestion;
  }

  function answerPage (state) {
    if (state.currentQuestion >= 4) {
      $(".next").text("See Final Results");
    }
    nextButton(state);
  }

  function randomPraise () {
    return Math.floor(Math.random() * 4);
  };

  function randomWrong () {
    return Math.floor(Math.random() * 4);
  };

  //////////////////////////////////////////
  // RENDER QUESTIONS
  //////////////////////////////////////////
  function renderQuestion(state) {
    pushQuestionInfo(state);
    createQuestionText(state);
    currentProgress(state);
    applyColors(state);
  }

  function questionPage (state) {
    renderQuestion(state);
  }

  //////////////////////////////////////////
  // CREATE QUESTIONS
  /////////////////////////////////////////
  // Push colors to state
  function pushQuestionInfo(state) {
    // var randomRGBData = App.RandomRGB()

    // state.question.choices = randomRGBData.choices
    // state.question.answer = randomRGBData.correctAnswer
    state.question.choices = randomChoices();
    state.question.answer = randomCorrect();
  }

  // Add "correct color" to question text
  function createQuestionText(state) {
    $('h2.question .color span').text(state.question.choices[state.question.answer]);
  }

  // Apply colors to options
  function applyColors (state) {
    var choicesHTML = '';
    var index = 0;

    state.question.choices.forEach(function () {
      var choiceHTML = choicesTemplate.replace('@color', state.question.choices[index]);
      choicesHTML += choiceHTML;
      index++;
    });

    $('.options').html(choicesHTML);
  };


  //////////////////////////////////////////
  // CREATE RGB COLORS
  //////////////////////////////////////////
  // CHOOSE RANDOM CORRECT ANSWER
  function randomCorrect (state, elements) {
    return Math.floor(Math.random() * 3);
  };

  // Generate one random color
  function randomColor (state) {
    var colorCode = [];
    for (var i = 0; i < 3; i++) {
      var number = Math.floor(Math.random() * 250);
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

  //////////////////////////////////////////
  // CHECKING USER ANSWER TO CORRECT ANSWER
  //////////////////////////////////////////
  // add active class to option item
  $(".options").on( "click", "input", function () {
    $(".options--input").removeClass('active');
    $(this).parent().addClass('active');
  });

  $("form[name='current-question']").submit(function(event) {
    event.preventDefault();
    var answer = $("input:checked").parent().parent().index();
    if( $(".options--input").hasClass("active") ){
      if ( answer === state.question.answer ) {
        $('#page-answer h2').text(state.correctEmoji);
        $('#page-answer h3').text(state.correctText[randomPraise()]);
        state.lastCorrect = true;
      } else {
        $('#page-answer h2').text(state.wrongEmoji);
        $('#page-answer h3').text(state.wrongText[randomWrong()]);
        state.lastCorrect = false;
      }
      setCurrentPage(state, 'pageAnswer');
      progressCheck(state);
      renderQuiz(state);
    }
    else {
      alert("Don't give up now. At least choose your favorite color out of these three!");
    }
  });

  //////////////////////////////////////////
  // BUTTON CLICKS
  //////////////////////////////////////////
  function startPage(state, elements) {
    startButton(state);
    $('body').addClass('home').removeClass('active');
    $('.pager, .reset').fadeOut();
    $('.pager li').removeClass('current, correct, incorrect').html("");
  }

  function startButton(state) {
    $('button.start').click(function () {
      $('body').removeClass('home').addClass('active');
      setCurrentPage(state, 'pageQuestion');
      renderQuiz(state);
      $('.pager, .reset').fadeIn();
    });
  }

  function nextButton(state, elements) {
    $(".next").click(function(event){
      event.preventDefault();
      advance(state);
    });
  }

  //RESET BUTTON
  function reset(state) {
    state.question = [];
    state.score = 0;
    state.currentQuestion = 0;
    state.lastCorrect = false;
    setCurrentPage(state, 'pageStart');
    console.log(state)
  }

  $(".reset").click(function(event){
    event.preventDefault();
    reset(state);
    renderQuiz(state);
  });

  //////////////////////////////////////////
  // RENDER ENTIRE QUIZ
  //////////////////////////////////////////
  function renderQuiz(state) {
    // default to hiding all current page, then show the currentpage
    Object.keys(SECTION_ELEMENTS).forEach(function (currentPage) {
      SECTION_ELEMENTS[currentPage].hide();
    });

    SECTION_ELEMENTS[state.currentPage].show();

    if (state.currentPage === 'pageStart') {
      startPage(state, SECTION_ELEMENTS[state.currentPage]);
    }
    else if (state.currentPage === 'pageQuestion') {
      questionPage(state, SECTION_ELEMENTS[state.currentPage]);
    }
    else if (state.currentPage === 'pageAnswer') {
      answerPage(state, SECTION_ELEMENTS[state.currentPage]);
    }
    else if (state.currentPage === 'pageResult') {
      resultsPage(state, SECTION_ELEMENTS[state.currentPage]);
    }
  }

  $(function () {
    renderQuiz(state);
    console.log("current Question" + state.currentQuestion)
  });
});
