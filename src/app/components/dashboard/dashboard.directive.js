(function() {
  'use strict';
  angular
    .module("grockitApp.components")
    .directive('trackList', trackList)
    .directive('challengeDashboard', challengeDashboard)
    .directive('doNow', doNow);

  trackList.$inject = ['utilities'];
  challengeDashboard.$inject = ['utilities'];


  function trackList(utilities) {
    var directive = {
      link: link,
      templateUrl: 'app/components/dashboard/templates/track-list.tpl.html',
      restrict: 'A',
      scope: {
        tracks: '=',
        startPractice: '=',
        isVisible: '=',
        canPractice: '=',
        titles: '='
      }
    };
    return directive;

    function link(scope, element, attrs) {
      var pagesShown = 1,
        pageSize = 5;

      angular.element("#mySel2").select2({
        closeOnSelect: false
      });
      scope.trackTest = {
        id: "baebea04-ed61-9dd9-dca2-d389f4957224",
        items: [],
        name: "Arithmetic and Number Properties",
        score_prediction: null,
        total_questions_answered: 162,
        total_questions_answered_correctly: 87,
        total_questions_available: 161,
        type: "Track",
        url: "/gre/tracks/baebea04-ed61-9dd9-dca2-d389f4957224/practice"
      };
      scope.itemsLimit = function() {
        return pageSize * pagesShown;
      };
      scope.hasMoreItemsToShow = function() {
        if (angular.isDefined(scope.titles))
          return pagesShown < (scope.titles.length / pageSize);
      };
      scope.showMoreItems = function() {
        pagesShown = pagesShown + 1;
      };



      /*This needs to be check it and if it's not used anymore, then remove the code*/
      var overlayTrack = null;
      scope.shouldShowOverlay = function(track) {
        if (track.hasScore) {
          return false;
        } else if (overlayTrack === null) {
          overlayTrack = track;
          return true;
        } else {
          return overlayTrack.id === track.id;
        }
      }
      scope.empty = function(track) {
        return angular.isDefined(track.items) && track.items.length > 0 ? true : false;
      }
      scope.getYourScorePredictionUrl = function(track) {
        var baseUrl = utilities.originalGrockit(false).url;
        utilities.redirect(baseUrl + '/assessment/for_track/' + track.id);
      }
    }
  }

  function challengeDashboard(utilities) {
    var directive = {
      link: link,
      templateUrl: 'app/components/dashboard/templates/dashboard-challenge.tpl.html',
      restrict: 'A',
      scope: {
        challenges: '='
      }
    };
    return directive;

    function link(scope, element, attrs) {
      scope.newChallenge = function(index) {
        var currentChallenge = scope.challenges[index],
          pieces = currentChallenge.url.split("/"),
          id = pieces[pieces.length - 1],
          baseUrl = utilities.originalGrockit().url;

        scope.challengeId = id;
        utilities.redirect(baseUrl + '/assessment/introcards/' + scope.challengeId);

      };
    }
  }

  function doNow() {
    var directive = {
      templateUrl: 'app/components/dashboard/templates/do-now.tpl.html',
      restrict: 'A',
      scope: false
    };
    return directive;
  }
})();
