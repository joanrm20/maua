angular.module("grockitApp.home")

.directive('scorePrediction', function() {
  return {
    restrict: 'A',
    templateUrl: 'app/components/dashboard/templates/scorePrediction.tpl.html',
    scope: {
      groupTitle: '=',
      totalScore: '=',
      rangeInit: '=',
      rangeEnd: '=',
      isVisible: '=',
      noScoreMessage: '@'
    },
    link: function (scope, element, attrs) {
      scope.hasScore = function () {
        return (scope.totalScore !== null && scope.totalScore > 0);
      };
    }
  };
})

.directive('trackList', function(Utilities) {
  return {
    restrict: 'A',
    templateUrl: 'app/components/dashboard/templates/track-list.tpl.html',
    scope: {
      tracks: '=',
      startPractice: '=',
      getScore: '=',
      isVisible: '='
    },
    link: function (scope, element, attrs) {
      scope.panelBaseId = attrs.collapsePanelBodyId;
      scope.panelId = attrs.collapsePanelId;

      scope.hasScore = function (track) {
        return (scope.getScore(track) !== null && scope.getScore(track) > 0);
      };

      scope.getYourScorePredictionUrl = function(track){
        var baseUrl=Utilities.originalGrockit(false).url;
        Utilities.redirect(baseUrl+'/assessment/for_track/'+track.id);
      }
    }

  };
})

.directive('historyChart', function() {
  return {
    restrict: 'A',
    templateUrl: 'app/components/dashboard/templates/dashboard-history.tpl.html',
    scope: {
      historyInfo: '='
    }
  };
})

.directive('challengeDashboard', function(Utilities) {
  return {
    restrict: 'A',
    templateUrl: 'app/components/dashboard/templates/dashboard-challenge.tpl.html',
    scope: {
      challenges: '='
    },
    link: function(scope){
      scope.newChallenge = function (index) {
        var currentChallenge = scope.challenges[index];
        scope.challengeId=currentChallenge.id;
        var baseUrl = Utilities.originalGrockit().url;
        Utilities.redirect(baseUrl+'/assessment/introcards/'+scope.challengeId);

      };

    }
  };
});

