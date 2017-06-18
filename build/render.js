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

  function startPage(state, elements) {
    startButton(state);
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
    nextButton(state);
  }

  function currentProgress(state) {
    var currentQuestion = state.currentQuestion;
    $('.pager li').eq(currentQuestion).addClass('current');
  }

  function progressCheck(state) {
    var currentQuestion = state.currentQuestion;
    $('.pager li').eq(currentQuestion).removeClass('current');
    if (state.lastCorrect === true) {
      // state.score++;
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
    console.log(state);
    console.log(state.questions[state.currentQuestion].choices)

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

  function startButton(state) {
    $('button.start').click(function () {
      $('body').removeClass('home').addClass('active');
      setCurrentPage('pageQuestion');
      renderQuiz(state);
      $('.pager, .reset').fadeIn();
    });
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

    SECTION_ELEMENTS[state.currentPage].show();

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

  return renderQuiz;
})(jQuery);
