(function() {
  'use strict';

  angular
  .module("grockitApp.dashboard")
  .service('dashboard', dashboard)

  dashboard.$inject = ['$q', 'DashboardApi'];

  function dashboard($q, DashboardApi) {
    var dashboardData = null;
    this.setDashboardData = function(groupId) {
      var deferred = $q.defer();
      DashboardApi.getDashboard(groupId).then(function(result) {
        dashboardData = null;
        dashboardData = result.data.dashboard
        console.log(dashboardData.sections[0].smart_practice)
        deferred.resolve(true);

      });

      return deferred.promise;
    }

    this.getScorePrediction = function() {
      return dashboardData.score_prediction;
    };
    this.getProgress = function() {
      var history = {};

      history.lastWeek = dashboardData.progress.last_week[0].total_questions;
      history.today = dashboardData.progress.today[0].total_questions;

      return history;
    }
    this.getSmartPractice = function() {
      return dashboardData.sections[0].smart_practice;
    }
    this.getChallenge = function() {
      return dashboardData.sections[1].challenge;
    }

  }

})();
