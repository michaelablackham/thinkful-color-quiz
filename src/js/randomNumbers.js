var App = App || {};

App.Random = (function($) {
  'use strict';

  //pick a random number to display and item from the praise/terrible praise arrays
  function randomText () {
    return Math.floor(Math.random() * 8);
  };

})(jQuery);
