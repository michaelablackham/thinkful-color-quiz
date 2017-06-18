$(function() {
  'use strict';

  // App.State.addObserver(App.Hello);
  // var count = 0;
  // setInterval(function () {
  //   count++;
  //   App.State.set({myCount: count});
  // }, 1000);

  setTimeout(function () {
    var state = App.State.get();
    App.State.set({currentPage: 'pageQuestion'})
    App.Render();
  }, 1);
  // App.Render();
  return;


// set the initial currentPage
  function setCurrentPage(newCurrentPage) {
    App.State.set({currentPage: newCurrentPage});
  }

// ADVANCE FROM ANSWERS TO QUESTIONS/RESULTS PAGE
  function advance(state) {
    state.currentQuestion++;
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
  // $('.options').on( 'click', 'input', function () {
  //   $('.options--input').removeClass('active');
  //   $(this).parent().addClass('active');
  // });
  //
  // $('form[name="current-question"]').submit(function (event) {
  //   event.preventDefault();
  //   var answer = $('input:checked').parent().parent().index();
  //   if($('.options--input').hasClass('active')) {
  //     if (answer === state.question.answer) {
  //       $('#page-answer h2').text(state.correctEmoji);
  //       $('#page-answer h3').text(state.correctText[randomPraise()]);
  //       state.lastCorrect = true;
  //     } else {
  //       $('#page-answer h2').text(state.wrongEmoji);
  //       $('#page-answer h3').text(state.wrongText[randomWrong()]);
  //       state.lastCorrect = false;
  //     }
  //     setCurrentPage('pageAnswer');
  //     progressCheck(state);
  //     renderQuiz(state);
  //   }
  //   else {
  //     alert("Don't give up now. At least choose your favorite color out of these three!");
  //   }
  // });

  //////////////////////////////////////////
  // BUTTON CLICKS
  //////////////////////////////////////////
  function startPage(state, elements) {
    startButton(state);
    $('body').addClass('home').removeClass('active');
    $('.pager, .reset').fadeOut();
    $('.pager li').removeClass('current, correct, incorrect').html('');
  }

  var nextButtonEl;
  function nextButton(state, elements) {
    if (!nextButtonEl) {
      nextButtonEl = $('.next');
    }

    if (!nextButtonEl.callbacksAttached) {
      nextButtonEl.click(function (ev) {
        ev.preventDefault();
        advance(state);
      });

      nextButtonEl.callbacksAttached = true;
    }
  }

  //RESET BUTTON
  function reset(state) {
    state.question = [];
    state.score = 0;
    state.currentQuestion = 0;
    state.lastCorrect = false;
    $('.pager li').removeClass('current').removeClass('correct').removeClass('incorrect');
    setCurrentPage('pageStart');
  }

  $(".reset").click(function(event){
    event.preventDefault();
    reset(state);
    renderQuiz(state);
  });

  $(function () {
    renderQuiz(state);
  });
});
