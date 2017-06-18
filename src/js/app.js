$(function() {
  'use strict';

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

  //////////////////////////////////////////
  // CHECKING USER ANSWER TO CORRECT ANSWER
  //////////////////////////////////////////
  // add active class to option item
  $('.options').on( 'click', 'input', function () {
    $('.options--input').removeClass('active');
    $(this).parent().addClass('active');
  });

  $('form[name="current-question"]').submit(function (event) {
    event.preventDefault();
    if($('.options--input').hasClass('active')) {
      App.Pager.render();
      App.Render.answerCheck();
      App.Render.setCurrentPage('pageAnswer');
      App.Render.renderQuiz();
    }
    else {
      alert("Don't give up now. At least choose your favorite color out of these three!");
    }
  });

  //////////////////////////////////////////
  // BUTTON CLICKS
  //////////////////////////////////////////

  $('button.start').click(function () {
    $('body').removeClass('home').addClass('active');
    App.Render.setCurrentPage('pageQuestion');
    App.Render.renderQuiz();
    $('.pager, .reset').fadeIn();
  });

  $(".reset").click(function(event){
    event.preventDefault();
    App.Reset.reset();
    App.Render.renderQuiz();
  });

  $(".next").click(function(event){
    event.preventDefault();
    advance();
  });

  $(function () {
    App.State.get();
    App.Render.renderQuiz();
  });
});
