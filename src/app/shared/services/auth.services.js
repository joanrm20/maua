angular.module("grockitApp.authServices", ['webStorageModule'])
.constant('UserRoles', {
  admin: 'admin',
  member: 'member',
  guest: 'guest'
})
.factory('Auth', function ($window,$cookies, $cookieStore, UserRoles, webStorage, UsersApi, utilities, $location, $q, Headers,imageVersion) {

  function defaultGroup(user) {
    return  user != null && angular.isDefined(user.currentGroup) ? user.currentGroup : undefined;
  }

  var setUserData = function (response) {
    var user = webStorage.get('currentUser'),
    trackData = user != null && angular.isDefined(user.trackData) ? user.trackData : '',
    currentUser = {
      userId: response.id,
      role: response.guest ? UserRoles.guest : UserRoles.member,
      groupMemberships: response.group_memberships,
      currentGroup: angular.isDefined(defaultGroup(user)) ? defaultGroup(user) :
      response.group_memberships[0].group_id,
      firstName: response.first_name,
      fullName: response.full_name,
      avatarUrl: angular.isDefined(response.avatar_url) || response.avatar_url !== null ?
      response.avatar_url.replace('version', imageVersion.thumbnail) : 'images/avatar.png',
      emailAddress: response.email_address,
      trackData: trackData
    };

    webStorage.add('currentUser', currentUser);
    return currentUser;
  },
  updateUserPromise = null;

  return {
    isLoggedIn: function () {
      return ( !!$cookies["authentication_token"] );
    },
    logout: function () {
      var logOut= utilities.originalGrockit().url + '/logout';
      webStorage.remove('currentUser');
      $cookieStore.remove('authentication_token');
      $window.location.href = logOut;

    },
    getCurrentUserInfo: function () {
      var deferred = $q.defer();

      var currentUser = webStorage.get('currentUser');

      if (currentUser) {
        currentUser.currentGroup = defaultGroup(currentUser);
        webStorage.add('currentUser', currentUser);
        deferred.resolve(currentUser);
      }
      else {
        if(updateUserPromise!==null){
         deferred = updateUserPromise;
       }
       else{
        /*Enable this for unit testing */
          /*var auth = "dXNlcl9pZD1lNzU5ZWRlMC1lOGM1LTAxMzAtNTNlNi0xMjMxMzkwZWY5ODE";
          Headers.setDefaultHeader(auth);*/

          UsersApi.self().then(function (result) {
           var userData = setUserData(result.data.user);
           deferred.resolve(userData);
         }).catch(function error(e) {
           deferred.resolve(webStorage.get('currentUser'));
         });
       }


     }
     return deferred.promise;

   },
   getUpdateUserData: function () {
    updateUserPromise = $q.defer();
    Headers.updateDefaultHeader();
    UsersApi.self().then(function (result) {
      var userData = setUserData(result.data.user);
      updateUserPromise.resolve(userData);
    }).catch(function errorHandler(e) {
      updateUserPromise.resolve(webStorage.get('currentUser'));
    });

    return updateUserPromise.promise;
  },
  updateUserInfo: function (currentUser) {
    webStorage.add('currentUser', currentUser);
  }


};
});

