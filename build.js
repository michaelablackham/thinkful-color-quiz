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

// CHECKING USER ANSWER for CORRECT ANSWER
  // add active class to option item
  $('.options').on( 'click', 'input', function () {
    $('.options--input').removeClass('active');
    $(this).parent().addClass('active');
  });

  //submit the form and redner, check, etc
  $('form[name="current-question"]').submit(function (event) {
    event.preventDefault();
    if ($('.options--input').hasClass('active')) {
      App.Render.answerCheck();
      App.Pager.progressCheck();
      App.Render.setCurrentPage('pageAnswer');
      App.Render.renderQuiz();
    }
    else {
      alert("Don't give up now. At least choose your favorite color out of these!");
    }
  });

// BUTTON CLICKS
  $('button.start').click(function () {
    $('body').removeClass('home').addClass('active');
    App.Render.setCurrentPage('pageQuestion');
    App.Render.renderQuiz();
    $('.pager, #page-reset').fadeIn();
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
var App = App || {}

App.RandomRGB = (function ($) {
  'use strict';

  // CHOOSE RANDOM CORRECT ANSWER
  function correctAnswer () {
    return Math.floor(Math.random() * 3);
  };

  // Generate one random color
  function randomColor () {
    var colorCode = [];
    for (var i = 0; i < 3; i++) {
      var number = Math.floor(Math.random() * 255);
      colorCode.push(number);
    }
    return colorCode;
  };

  // get three random RGB codes
  function randomChoices () {
    var colorCodes = [];
    for (var i = 0; i < 3; i++) {
      colorCodes.push(randomColor());
    }
    return colorCodes;
  };

  // equivalent to `module.exports`
  return {
    choices: randomChoices,
    correctAnswer: correctAnswer
  }
})(jQuery)
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

//RENDER VARIOUS PAGES
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
      lastCorrect: false,
      currentPage: 'pageStart'
    });
    $('.pager li').removeClass('current').removeClass('correct').removeClass('incorrect');
    $(".next").text("Next Question");
  }

  return {
    reset: resetGame
  }

})(jQuery);
var App = App || {};

/**
 * State module
 *
 * This is a pretty simple state manager that implements the Observer Pattern.
 * @see https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript
 */
App.State = (function ($) {
  var state = {
    questions: [],
    correctEmoji: '(งツ)ว',
    correctText: [
      'Great job! You must live in a world of rainbows and unicorns!',
      'Did you really know the answer? Or did you just pick your favorite color?',
      'Yassss queeeen. You got it',
      'You. Is. Good.',
      'I see "Professional Color Identifier" in your future!',
      'Well, color me impressed!',
      'You got lucky that time...',
      'We\'re going to get along just OK'
    ],
    wrongEmoji: '(╯°□°）╯︵ ┻━┻',
    wrongText: [
      'Seriously? Is your favorite color black, like your soul?',
      'Uuuuugggghhhhhhhhh.',
      'The world is a sad place because of your color choice.',
      '50 shades of GRAY must be your favorite book....',
      'You do know what a color is, right?',
      'Preschool must have been tough for you.',
      'On Wednesdays, you WISH you wore pink.',
      'Something tells me you\'d be better suited for identifying smells.'
    ],
    score: 0,
    currentQuestion: 0,
    currentPage: 'pageStart',
    lastCorrect: false,
    totalQuestions: 5
  };

  var observers = []

  function getState() {
    return state;
  }

  function setState(newState) {
    Object.assign(state, newState);
    notify(state);
  }

  function addObserver(observer) {
    observers.push(observer);
  }

  function notify(context) {
    observers.forEach(function (observer) {
      observer.update(context);
    });
  }

  return {
    get: getState,
    set: setState,
    addObserver: addObserver
  };
})(jQuery);
