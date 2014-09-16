'use strict';
var home =  angular.module("grockitApp.home",['ng-breadcrumbs']).config(function($httpProvider,$routeProvider, $controllerProvider, $compileProvider, $provide,UserRoles) {
  home.controller = $controllerProvider.register;
  home.directive = $compileProvider.directive;
  home.routeProvider = $routeProvider;
  home.factory = $provide.factory;
  home.service = $provide.service;

  var filePath = {
    dashboard: {
      dashCtrl: 'app/home/dashboard/sDashboard.ctrl.js',
      dashServ: 'app/home/dashboard/sDashboard.service.js',
      dashDirect: 'app/components/dashboard/dashboard.directive.js'
    }
  };

  $routeProvider.when('/:subject/dashboard', {templateUrl: 'app/home/dashboard/dashboard.tpl.html', label: 'Dashboard', resolve: {deps: function ($q, $rootScope) {
    var deferred = $q.defer(),
      essentials = [
        filePath.dashboard.dashDirect,
        filePath.dashboard.dashServ,
        filePath.dashboard.dashCtrl
      ];
    $script(essentials, function () {
      // all dependencies have now been loaded by $script.js so resolve the promise
      $rootScope.$apply(function () {
        deferred.resolve();
      });
    });
    return deferred.promise;
  }},
    controller: 'SimpleDashController'
  });


});

