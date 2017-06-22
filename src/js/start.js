var App = App || {};

App.Start = (function($) {
  'use strict';

  function startPage() {
    //this is what is shown on load.
    //this also includes actions needed when restarting the entire quiz
    $('body').addClass('home').removeClass('active resultsPage');
    $('.pager, .reset').hide();
    $('.pager li').removeClass('current correct incorrect').html('');
  }

  // Button Click
  $('button.start').click(function () {
    $('body').removeClass('home').addClass('active');
    App.Render.setCurrentPage('pageQuestion');
    App.Render.renderQuiz();
    $('.pager, #page-reset').fadeIn();
  });

  return{
    renderStartPage: startPage
  }

})(jQuery);
