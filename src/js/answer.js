var App = App || {};

App.Answer = (function($) {
  'use strict';

  //pick a random number to display and item from the praise/terrible praise arrays
  function randomText () {
    return Math.floor(Math.random() * 8);
  };

  //Checking answer and including the appropriate emoji and text
  function answerCheck (){
    var state = App.State.get();
    var answer = $('input:checked').closest('.options--choice').index();
    var $answerH2 = $('#page-answer h2');
    var $answerH3 = $('#page-answer h3');

    if (answer === state.questions[state.currentQuestion].answer) {
      //add number to score -- this is shown on final results page
      state.score++;
      //add text and emoji to answr page
      $answerH2.text(state.correctEmoji);
      $answerH3.text(state.correctText[randomText()]);
      state.lastCorrect = true;
    } else {
      //add text and emoji to answr page
      $answerH2.text(state.wrongEmoji);
      $answerH3.text(state.wrongText[randomText()]);
      state.lastCorrect = false;
    }

    console.log(state)
  }

  // Render Answer Page
  function answerPage () {
    var state = App.State.get();
    var $nextButton = $(".next");
    // if the current question is the total question, change text on next button
    if (state.currentQuestion === state.totalQuestions-1) {
      $nextButton.text("See Final Results");
    }
  }

  // ADVANCE FROM ANSWERS TO QUESTIONS/RESULTS PAGE
  function advance() {
    var state = App.State.get();
    App.State.set({currentQuestion: state.currentQuestion+1});
    if (state.currentQuestion === state.totalQuestions) {
      App.Render.setCurrentPage('pageResult');
    }
    else {
      App.Render.setCurrentPage('pageQuestion');
    }
    App.Render.renderQuiz();
  }

  // On to next question
  $(".next").click(function(event){
    event.preventDefault();
    advance();
  });

  return {
    answerCheck: answerCheck,
    renderAnswerPage: answerPage
  }
})(jQuery);
