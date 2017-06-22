var App = App || {};

App.Question = (function($) {
  'use strict';

  // options template
  var choicesTemplate = [
    '<div class="options--choice">',
    '<div class="options--input" style="background-color: rgb( @color );">',
    '<input type="radio" name="input">',
    '<label>Color @index</label>',
    '</div>',
    '</div>'
  ].join('');

  // Apply colors to the options inputs for this question
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

  // Render Question Page
  function questionPage () {
    //get the state
    var state = App.State.get();

    //create a questions variable that takes in other functions for color choices and the correct answer
    var questions = {
      choices: App.RandomRGB.choices(),
      answer: App.RandomRGB.correctAnswer(),
      isCorrect: false
    }

    state.questions.push(questions);

    state = App.State.get();

    $('h2.question .color span').text(questions.choices[questions.answer]);

    App.Pager.currentProgress();
    applyColors(state);
  }

  // CHECKING USER ANSWER for CORRECT ANSWER
    // add active class to option item
    $('.options').on( 'click', 'input', function () {
      $('.options--input').removeClass('active');
      $(this).parent().addClass('active');
    });

    //submit the form and redner, check, etc
    $('form[name="current-question"]').submit(function (event) {
      event.preventDefault();
      if ($('.options--input').hasClass('active')) {
        App.Answer.answerCheck();
        App.Pager.progressCheck();
        App.Render.setCurrentPage('pageAnswer');
        App.Render.renderQuiz();
      }
      else {
        alert("Don't give up now. At least choose your favorite color out of these!");
      }
    });

  return {
    renderQuestionPage: questionPage
  }

})(jQuery);
