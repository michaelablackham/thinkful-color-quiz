$(function() {
  'use strict';

// ADVANCE FROM ANSWERS TO QUESTIONS/RESULTS PAGE
  function advance(state) {
    App.State.get();
    App.State.set({currentQuestion: state.currentQuestion++});
    console.log(App.State.get())
    // state.currentQuestion++;
    if (state.currentQuestion === state.totalQuestions) {
      setCurrentPage('pageResult');
    }
    else {
      setCurrentPage('pageQuestion');
    }
    renderQuiz(state);
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
      // progressCheck(state);
      App.Render.answerCheck();
      App.Render.setCurrentPage('pageAnswer');
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
