var App = App || {};

App.State = (function ($) {
  var state = {
    question: [],
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
    lastCorrect: false
  };

  function getState() {
    return state;
  }

  function setState(newState) {
    Object.assign(state, newState);
  }

  return {
    get: getState,
    set: setState
  };
})(jQuery);
