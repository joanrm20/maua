// load all of the dependencies asynchronously.

var paths={
  jqueryGrockit:'app/shared/jquery.grockit.js',
  restAngularFactory:'app/api-requests/restAngular.service.js',
  restAngular:'app/api-requests/restAngular.module.js',
  home:'app/home/home.module.js',
  practiceGame:'app/practiceGame/practiceGame.module.js',
  analyticService: 'app/shared/services/analytic.service.js',
  authServices:'app/shared/services/auth.services.js',
  appModule:'app/application/application.module.js',
  appConstants:'app/application/application.constants.js',
  appDirectives:'app/components/application/application.directive.js',
  appController: 'app/application/application.ctrl.js',
  appFilters:'app/application/application.filters.js',
  appServices:'app/application/application.services.js',
  app:'app/app.js'
};

$script([
  paths.jqueryGrockit,
  paths.appModule,
  paths.appConstants,
  paths.appDirectives,
  paths.appController,
  paths.appFilters,
  paths.appServices,
  paths.analyticService

  ],'init')

.ready('init', function() {
  $script([
    paths.restAngular,
    paths.restAngularFactory,
    paths.authServices,
    paths.home,
    paths.practiceGame,
    paths.app
    ], function () {
      angular.bootstrap(document, ['grockitApp']);
    });
});

