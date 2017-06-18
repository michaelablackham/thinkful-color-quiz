var App = App || {};

App.Render = (function($) {
  'use strict';

  var SECTION_ELEMENTS = {};

  var choicesTemplate = [
    '<div class="options--choice">',
    '<div class="options--input" style="background-color: rgb( @color );">',
    '<input type="radio" name="input">',
    '<label>Color @index</label>',
    '</div>',
    '</div>'
  ].join('');

  var progressIcon = '<i class="fa fa-@check" aria-hidden="true"></i>';

  function startPage() {
    $('body').addClass('home').removeClass('active');
    $('.pager, .reset').fadeOut();
    $('.pager li').removeClass('current, correct, incorrect').html('');
  }

  function questionPage (state, element) {
    var state = App.State.get();

    var questions = {
      choices: App.RandomRGB.choices(),
      answer: App.RandomRGB.correctAnswer()
    }

    state.questions.push(questions);
    App.State.set({questions: state.questions});

    state = App.State.get();

    $('h2.question .color span').text(questions.choices[questions.answer]);

    currentProgress(state);
    applyColors(state);
  }

  function answerPage (state) {
    // Search about Magic Numbers
    if (state.currentQuestion === state.total) {
      $(".next").text("See Final Results");
    }
  }

  function randomPraise () {
    return Math.floor(Math.random() * 8);
  };

  function randomWrong () {
    return Math.floor(Math.random() * 8);
  };

  function answerCheck (state){
    var state = App.State.get();
    var answer = $('input:checked').parent().parent().index();
    if (answer === state.questions[state.currentQuestion].answer) {
      $('#page-answer h2').text(state.correctEmoji);
      $('#page-answer h3').text(state.correctText[randomPraise()]);
      App.State.set({lastCorrect: true});
    } else {
      $('#page-answer h2').text(state.wrongEmoji);
      $('#page-answer h3').text(state.wrongText[randomWrong()]);
      App.State.set({lastCorrect: false});
    }
  }

  function currentProgress(state) {
    var currentQuestion = state.currentQuestion;
    $('.pager li').eq(currentQuestion).addClass('current');
  }

  function progressCheck(state) {
    var currentQuestion = state.currentQuestion;
    $('.pager li').eq(currentQuestion).removeClass('current');
    if (state.lastCorrect === true) {
      $('.pager li').eq(currentQuestion).addClass("correct");
      $('.pager li').eq(currentQuestion).append(progressIcon.replace('@check', 'check'));
    }
    else {
      $('.pager li').eq(currentQuestion).addClass('incorrect');
      $('.pager li').eq(currentQuestion).append(progressIcon.replace('@check', 'close'));
    }
  }

  function applyColors (state) {
    var choicesHTML = '';
    var index = 0;

    state.questions[state.currentQuestion].choices.forEach(function () {
      var choiceHTML = choicesTemplate.replace('@color', state.questions[state.currentQuestion].choices[index]);
      choicesHTML += choiceHTML;
      index++;
    });

    $('.options').html(choicesHTML);
  };

  function resultsPage (state) {
    console.log("I am supposed to render the results page");
  }

  // set the initial currentPage
  function setCurrentPage(newCurrentPage) {
    App.State.set({currentPage: newCurrentPage});
  }

  function renderQuiz() {
    // Renders the app
    var state = App.State.get();

    // default to hiding all current page, then show the currentpage
    Object.keys(SECTION_ELEMENTS).forEach(function (currentPage) {
      SECTION_ELEMENTS[currentPage].hide();
    });

    // SHOW THE CURRENT PAGE
    SECTION_ELEMENTS[state.currentPage].show();

    //SWITCH TO SHOW THE NEW PAGE and run that pages' function
    switch (state.currentPage) {
      case 'pageStart':
        startPage(state, SECTION_ELEMENTS[state.currentPage]);
        break;
      case 'pageQuestion':
        questionPage(state, SECTION_ELEMENTS[state.currentPage]);
        break;
      case 'pageAnswer':
        answerPage(state, SECTION_ELEMENTS[state.currentPage]);
        break;
      case 'pageResult':
        resultsPage(state, SECTION_ELEMENTS[state.currentPage]);
        break;
      default:
        throw new Error('Unexpected page.');
    }
  }

  $(function () {
    Object.assign(SECTION_ELEMENTS, {
      pageStart: $('#page-start'),
      pageQuestion: $('#page-question'),
      pageAnswer: $('#page-answer'),
      pageResult: $('#page-results')
    });
  });

  return {
    renderQuiz: renderQuiz,
    setCurrentPage: setCurrentPage,
    answerCheck: answerCheck
  };
})(jQuery);
