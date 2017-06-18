var App = App || {}

App.Pager = (function () {
  'use strict';

  var templates = {
    pager: [
        '<h3>Progress</h3>',
        '<ul>@pager-items</ul>'
    ].join(''),
    pagerItem: '<li class="@pager-item-classes"></li>'
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
        pagerItemClass = questionsResults.shift() ? 'correct' : 'incorrect';
      }
      else {
        pagerItemClass = '';
      }

      pagerItemsHTML += templates.pagerItem.replace('@pager-item-classes', pagerItemClass);
    }

    $('.pager').html(templates.pager.replace('@pager-items', pagerItemsHTML));
  }

  return {
    render: renderPager
  }
})()
