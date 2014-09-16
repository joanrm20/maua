'use strict';

var practiceGame =  angular.module("grockitApp.question",['ng-breadcrumbs'])
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
        practiceSrv: 'app/practice/common/practice.service.js',
        youtube: 'assets/javascripts/youtubeModal/bootstrap.youtubepopup.js'
      },
      question:{
        questionCtrl: 'app/questions/question.ctrl.js'
      }
    };


    $routeProvider.when('/:subject/questions/:questionId', {templateUrl: 'app/questions/question.tpl.html',
      label: 'practice',
      resolve: {deps: function ($q, $rootScope) {
        var deferred = $q.defer(),
          essentials = [
            filePath.question.questionCtrl,
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
      }}, controller: 'QuestionController'
    });



  });
