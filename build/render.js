var App = App || {};

App.Render = (function($) {
  'use strict';

  var SECTION_ELEMENTS = {};

  var choicesTemplate = [
    '<div class="options--choice">',
    '<div class="options--input" style="background-color: rgb( @color );">',
    '<input type="radio" name="input">',
    '<label>Color @index</label>',
    '</div>',
    '</div>'
  ].join('');

  function startPage() {
    //this is what is shown on load.
    //this also includes actions needed when restarting the entire quiz
    $('body').addClass('home').removeClass('active resultsPage');
    $('.pager, .reset').hide();
    $('.pager li').removeClass('current correct incorrect').html('');
  }

  function questionPage () {
    //get the state
    var state = App.State.get();

    //create a questions variable that takes in other functions for color choices and the correct answer
    var questions = {
      choices: App.RandomRGB.choices(),
      answer: App.RandomRGB.correctAnswer(),
      isCorrect: false
    }

    state.questions.push(questions);

    state = App.State.get();

    $('h2.question .color span').text(questions.choices[questions.answer]);

    App.Pager.currentProgress();
    applyColors(state);
  }

  function answerPage () {
    var state = App.State.get();
    var $nextButton = $(".next");
    // if the current question is the total question, change text on next button
    if (state.currentQuestion === state.totalQuestions-1) {
      $nextButton.text("See Final Results");
    }
  }

  function resultsPage () {
    //show elements that should be seen on the results page
    $('body').addClass("resultsPage");
    $('.pager, #page-reset').hide();
    $('.resultsPage #page-results button.reset').show();
    //get the final results for the game
    finalResults();
  }

//CHECKING ANSWER TO BE RIGHT OR WRONG

  //pick a random number to display and item from the praise/terrible praise arrays
  function randomText () {
    return Math.floor(Math.random() * 8);
  };

  //Checking answer and including the appropriate emoji and text
  function answerCheck (){
    var state = App.State.get();
    var answer = $('input:checked').parent().parent().index();
    var $answerH2 = $('#page-answer h2');
    var $answerH3 = $('#page-answer h3');

    if (answer === state.questions[state.currentQuestion].answer) {
      //add number to score -- this is shown on final results page
      state.score++;
      //add text and emoji to answr page
      $answerH2.text(state.correctEmoji);
      $answerH3.text(state.correctText[randomText()]);
      state.lastCorrect = true;
    } else {
      //add text and emoji to answr page
      $answerH2.text(state.wrongEmoji);
      $answerH3.text(state.wrongText[randomText()]);
      state.lastCorrect = false;
    }
  }

//CREATING THE FINAL RESULTS INFORMATION
  function finalResults() {
    var state = App.State.get();
    var $resultH3 = $('h3.result');
    //add the final score to the title of the page
    $('#page-results h2').text(state.score + '/'+ state.totalQuestions);
    //add sad answer to the final results page for a certain amount being wrong
    if (state.score === 0) {
      //text for nothing correct
      $resultH3.html('I think I\'ll pretend like I didn\'t see anything here..')
    }
    else if (state.score === state.totalQuestions) {
      // text for a perfect score
      $resultH3.html('Woah. Okay. I tip my hat to you sir.');
    }
    else if (state.score < Math.ceil(state.totalQuestions/2) && state.score > 0) {
      //text for less than half correct but more than 0
      $resultH3.html('Yikes, that\'s embarrassing... You may want to practice a bit more.');
    }
    else {
      //text for more than half being correct but not a perfect score
      $resultH3.html('I am <em>mildy</em> impressed by you. Can you do it again?');
    }
  }

  // set the initial currentPage
  function setCurrentPage(newCurrentPage) {
    App.State.set({currentPage: newCurrentPage});
  }

  function renderQuiz() {
    // Renders the app
    var state = App.State.get();

    // default to hiding all current page, then show the currentpage
    Object.keys(SECTION_ELEMENTS).forEach(function (currentPage) {
      SECTION_ELEMENTS[currentPage].hide();
    });

    // SHOW THE CURRENT PAGE
    SECTION_ELEMENTS[state.currentPage].show();

    //SWITCH TO SHOW THE NEW PAGE and run that pages' function
    switch (state.currentPage) {
      case 'pageStart':
        startPage(state, SECTION_ELEMENTS[state.currentPage]);
        break;
      case 'pageQuestion':
        questionPage(state, SECTION_ELEMENTS[state.currentPage]);
        break;
      case 'pageAnswer':
        answerPage(state, SECTION_ELEMENTS[state.currentPage]);
        break;
      case 'pageResult':
        resultsPage(state, SECTION_ELEMENTS[state.currentPage]);
        break;
      default:
        throw new Error('Unexpected page.');
    }
  }

// Apply colors to the options inputs for this question
  function applyColors () {
    var choicesHTML = '';
    var index = 0;
    var state = App.State.get();

    state.questions[state.currentQuestion].choices.forEach(function () {
      var choiceHTML = choicesTemplate.replace('@color', state.questions[state.currentQuestion].choices[index]);
      choicesHTML += choiceHTML;
      index++;
    });

    $('.options').html(choicesHTML);
  };

  $(function () {
    Object.assign(SECTION_ELEMENTS, {
      pageStart: $('#page-start'),
      pageQuestion: $('#page-question'),
      pageAnswer: $('#page-answer'),
      pageResult: $('#page-results')
    });
  });

  return {
    renderQuiz: renderQuiz,
    setCurrentPage: setCurrentPage,
    answerCheck: answerCheck
  };
})(jQuery);
