var App = App || {}

App.Pager = (function () {
  'use strict';

  function currentProgress() {
    var state = App.State.get();
    var currentQuestion = state.currentQuestion;
    $('.pager li').eq(currentQuestion).addClass('current');
  }

  function progressCheck() {
    var state = App.State.get();
    var $pagerItem = $('.pager li');
    var progressIcon = '<i class="fa fa-@check" aria-hidden="true"></i>';
    var currentQuestion = state.currentQuestion;
    $pagerItem.eq(currentQuestion).removeClass('current');

    if (state.lastCorrect === true) {
      $pagerItem.eq(currentQuestion).addClass("correct");
      $pagerItem.eq(currentQuestion).append(progressIcon.replace('@check', 'check'));
    }
    else if (state.lastCorrect === false){
      $pagerItem.eq(currentQuestion).addClass('incorrect');
      $pagerItem.eq(currentQuestion).append(progressIcon.replace('@check', 'close'));
    }
  }

  return {
    currentProgress: currentProgress,
    progressCheck: progressCheck
  }
})();
