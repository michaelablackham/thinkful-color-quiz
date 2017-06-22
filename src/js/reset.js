var App = App || {};

App.Reset = (function($) {
  'use strict';

  //RESET BUTTON
  // resets the entire state, removes all classes on the pager, returns to start page
  function resetGame(state) {
    App.State.set({
      questions: [],
      score: 0,
      currentQuestion: 0,
      lastCorrect: false,
      currentPage: 'pageStart'
    });
    $('.pager li').removeClass('current correct incorrect');
    $(".next").text("Next Question");
  }

  // Button Click
  $(".reset").click(function(ev){
    ev.preventDefault();
    App.Reset.reset();
    App.Render.renderQuiz();
  });

  return {
    reset: resetGame
  }

})(jQuery);
