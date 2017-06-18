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
      lastCorrect: false
    });
    $('.pager li').removeClass('current').removeClass('correct').removeClass('incorrect');
    App.Render.setCurrentPage('pageStart');
  }

  return {
    reset: resetGame
  }

})(jQuery);
