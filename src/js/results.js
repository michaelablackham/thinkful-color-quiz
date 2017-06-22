var App = App || {};

App.Results = (function($) {
  'use strict';

  // CREATING THE FINAL RESULTS INFORMATION
    function finalResults() {
      var state = App.State.get();
      var $resultH3 = $('h3.result');
      //add the final score to the title of the page
      $('#page-results h2').text(state.score + '/'+ state.totalQuestions);
      //add sad answer to the final results page for a certain amount being wrong
      if (state.score === 0) {
        //text for nothing correct
        $resultH3.html(state.finalResults.terrible)
      }
      else if (state.score === state.totalQuestions) {
        // text for a perfect score
        $resultH3.html(state.finalResults.perfect);
      }
      else if (state.score < Math.ceil(state.totalQuestions/2) && state.score > 0) {
        //text for less than half correct but more than 0
        $resultH3.html(state.finalResults.okay);
      }
      else {
        //text for more than half being correct but not a perfect score
        $resultH3.html(state.finalResults.good);
      }
    }

    // Render Results Page
    function resultsPage () {
      //show elements that should be seen on the results page
      $('body').addClass("resultsPage");
      $('.pager, #page-reset').hide();
      $('.resultsPage #page-results button.reset').show();
      //get the final results for the game
      finalResults();
    }

    return {
      renderResultsPage: resultsPage
    }
})(jQuery);
