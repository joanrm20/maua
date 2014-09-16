'use strict';

var practiceGame =  angular.module("grockitApp.practice",['ng-breadcrumbs'])
.config(function ($httpProvider,$routeProvider, $controllerProvider, $compileProvider, $provide) {
  practiceGame.controller = $controllerProvider.register;
  practiceGame.directive = $compileProvider.directive;
  practiceGame.routeProvider = $routeProvider;
  practiceGame.factory = $provide.factory;
  practiceGame.service = $provide.service;

  var filePath = {
    common:{
      questTypesDct: 'app/components/question-types/questions-types.directive.js',
      practiceDct: 'app/components/practice/practice.directive.js',
      practiceSrv: 'app/shared/services/practice.service.js',
      youtube: 'assets/javascripts/youtubeModal/bootstrap.youtubepopup.js'
    },
    customPractice:{
      practiceCtrl: 'app/practices/practice.ctrl.js'
    }
  };


  $routeProvider.when('/:subject/custom-practice', {templateUrl: 'app/practices/practice.tpl.html',
    label: 'practice',
    resolve: {deps: function ($q, $rootScope) {
      var deferred = $q.defer(),
      essentials = [
      filePath.customPractice.practiceCtrl,
      filePath.common.questTypesDct,
      filePath.common.practiceDct,
      filePath.common.practiceSrv,
      filePath.common.youtube
      ];
      $script(essentials, function () {
        $rootScope.$apply(function () {
          deferred.resolve();
        });
      });

      return deferred.promise;
    }}, controller: 'CustomPracticeController'
  });



});
