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

  function renderPager () {

    var state = App.State.get();
    var questions = state.questions.slice(0);
    var totalQuestions = state.totalQuestions;

    console.log('questions:', questions);

    var pagerItemsHTML = '';
    for (var i = 0; i < totalQuestions; i++) {
      var pagerItemClass;
      console.log('current index:', i);

      if (i === state.currentQuestion) {
        pagerItemClass = 'current';
      }
      else if (questions.length) {
        // console.log('something is happening');
        var question = questions.shift();
        console.log('current index:', i, 'current question:', question);
        console.log('answer type:', typeof question.answer, 'user  answer type:', typeof question.userAnswer);

        if (i > state.currentQuestion || typeof question.userAnswer !== 'number') {
          pagerItemClass = '';
        }
        else {
          pagerItemClass = (question.answer === question.userAnswer)
          ? 'correct'
          : 'incorrect';
        }
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
