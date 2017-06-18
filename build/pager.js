var App = App || {}

App.Pager = (function () {
  'use strict';

  var templates = {
    pager: [
        '<h3>Progress</h3>',
        '<ul>@pager-items</ul>'
    ].join(''),
    pagerItem: '<li class="@pager-item-classes"></li>',
    progressIcon: '<i class="fa fa-@check" aria-hidden="true"></i>'
  }

  function renderPager (questionsResults) {
    if (!questionsResults) {
      questionsResults = [];
    }

    var state = App.State.get();

    var pagerItemsHTML = '';
    for (var i = 0; i < state.totalQuestions; i++) {
      var pagerItemClass;

      if (i === state.currentQuestion) {
        pagerItemClass = 'current';
      }
      else if (questionsResults.length) {
        console.log('something is happening')
        pagerItemClass = questionsResults.shift() ? 'correct' : 'incorrect';
        // $('.pager li').eq(currentQuestion).append(progressIcon.replace('@check', 'check'));
      }
      else {
        pagerItemClass = '';
      }

      pagerItemsHTML += templates.pagerItem.replace('@pager-item-classes', pagerItemClass);
    }

    $('.pager').html(templates.pager.replace('@pager-items', pagerItemsHTML));

  // function currentProgress(state) {
  //   var currentQuestion = state.currentQuestion;
  //   $('.pager li').eq(currentQuestion).addClass('current');
  // }
  //
  // function progressCheck(state) {
  //   var currentQuestion = state.currentQuestion;
  //   $('.pager li').eq(currentQuestion).removeClass('current');
  //   if (state.lastCorrect === true) {
  //     $('.pager li').eq(currentQuestion).addClass("correct");
  //     $('.pager li').eq(currentQuestion).append(progressIcon.replace('@check', 'check'));
  //   }
  //   else {
  //     $('.pager li').eq(currentQuestion).addClass('incorrect');
  //     $('.pager li').eq(currentQuestion).append(progressIcon.replace('@check', 'close'));
  //   }
  // }

}

  return {
    render: renderPager
  }
})();
