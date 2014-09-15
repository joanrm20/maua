'use strict';
(function(app) {
 app.config(function($routeProvider) {
 })
 .run(function ($rootScope, $location, Auth,Utilities,Alerts) {

   $rootScope.$on("$locationChangeStart", function(event, next, current) {

     if (Auth.isLoggedIn()) {

       Auth.getUpdateUserData().then(function (response) {

         if (response != null) {
           if ($location.path() === '/' || $location.path() === '/' + response.currentGroup || $location.path() == '') {

            Utilities.internalRedirect('/' + response.currentGroup+ '/dashboard');
           }
         }

       }).catch(function errorHandler(e) {
         Alerts.showAlert(Alerts.setErrorApiMsg(e), 'danger');
       });

     }
     else {
       $rootScope.$destroy();
       $("body").html('The user is not logged in! <a href=\"/logout\">Click here to restart</a>.');
       event.preventDefault();

     }
    });


   });
}(angular.module("grockitApp", [
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngCookies',
  'grockitApp.analyticService',
  'grockitApp.application',
  'grockitApp.requests',
  'grockitApp.authServices',
  'grockitApp.practiceGame',
  'grockitApp.home',
  'grockitApp.directives'
  ]))
);

