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

  function startPage() {
    $('body').addClass('home').removeClass('active resultsPage');
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

    App.Pager.render();
    applyColors(state);
  }

  function answerPage () {
    var state = App.State.get();
    // Search about Magic Numbers
    console.log('is this working')
    if (state.currentQuestion === state.totalQuestions) {
      console.log('yes this is wokring')
      $(".next").text("See Final Results");
    }
  }

  function randomText () {
    return Math.floor(Math.random() * 8);
  };

  function answerCheck (){
    var state = App.State.get();
    var answer = $('input:checked').parent().parent().index();
    if (answer === state.questions[state.currentQuestion].answer) {
      state.score++;
      $('#page-answer h2').text(state.correctEmoji);
      $('#page-answer h3').text(state.correctText[randomText()]);
      App.State.set({lastCorrect: true});
    } else {
      $('#page-answer h2').text(state.wrongEmoji);
      $('#page-answer h3').text(state.wrongText[randomText()]);
      App.State.set({lastCorrect: false});
    }
    console.log(state)
  }

  function resultsPage () {
    $('body').addClass("resultsPage");
    $('.pager, #page-reset').hide();
    finalResults();
  }

  function finalResults() {
    var state = App.State.get();
    var halfTotal = Math.ceil(state.totalQuestions/2);
    if (state.score < halfTotal) {
      $('#page-results h2').append(': <span>'+ state.score + '/'+ state.totalQuestions +'</span>');
      $('h3.result').html(
        'Yikes, that\'s embarrassing... You may want to practice a bit more.'
      )
    }
    else {
      $('#page-results h2').append(': <span>'+ state.score + '/'+ state.totalQuestions +'</span>');
      $('h3.result').html(
        'I am <em>mildy</em> impressed by you. Can you do it again?'
      )
    }
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

  function applyColors () {
    var choicesHTML = '';
    var index = 0;
    var state = App.State.get();

    state.questions[state.currentQuestion].choices.forEach(function () {
      var choiceHTML = choicesTemplate.replace('@color', state.questions[state.currentQuestion].choices[index]);
      choicesHTML += choiceHTML;
      index++;
    });

    $('.options').html(choicesHTML);
  };

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
