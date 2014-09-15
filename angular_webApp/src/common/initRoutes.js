// load all of the dependencies asynchronously.

var paths={
  jqueryGrockit:'common/jquery.grockit.js',
  restAngularFactory:'app/common/api-requests/restAngular.service.js',
  restAngular:'app/common/api-requests/restAngular.module.js',
  home:'app/home/home.module.js',
  practiceGame:'app/practiceGame/practiceGame.module.js',
  analyticService: 'app/common/services/analytic.service.js',
  generalDirectives:'common/directives/general.directive.js',
  authServices:'app/common/services/auth.services.js',
  application:'app/application/application.module.js',
  appController: 'app/application/application.ctrl.js',
  appFilters:'app/application/application.filters.js',
  appServices:'app/application/application.services.js',
  app:'app/app.js'
};

$script([
  paths.jqueryGrockit,
  paths.application,
  paths.appController,
  paths.appFilters,
  paths.appServices,
  paths.analyticService,
  paths.generalDirectives

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

