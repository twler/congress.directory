(function(){
  'use strict';

  angular.module('users')
    .service('userService', ['$http', '$q', UserService]);

  /**
   * Users DataService
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   *
   * @returns {{loadAll: Function}}
   * @constructor
   */
  function UserService($http, $q){

    var members = $q.defer()

    function getMembers (stateCode) {
      members = $q.defer()
      if (!stateCode) { stateCode = '' }
      $http({ method: 'GET', url: 'https://www.govtrack.us/api/v2/role?current=true&state=' + stateCode })
        .success(function(data, status) {
          console.log('success', data)
          members.resolve(data.objects)
        }).error(function(data, status) {
          console.log('error', data)
          members.reject(data)
        }).finally(function() { console.log('finally') })
        // .error (data, status) -> _handleError deferred, data, status
        // .finally () -> _endRequest()
    }

    function getMembersByLatLng (lat, lng) {
      members = $q.defer()
      // if (!stateCode) { stateCode = '' }
      $http({ method: 'GET', url: 'https://congress.api.sunlightfoundation.com/legislators/locate?latitude=' + lat + '&longitude=' + lng + '&apikey=d9733fd4fa5a43cda9885da876a67848' })
        .success(function(data, status) {
          console.log('success', data)
          members.resolve(data.objects)
        }).error(function(data, status) {
          console.log('error', data)
          members.reject(data)
        }).finally(function() { console.log('finally') })
    }

    // Promise-based API
    return {
      loadAllUsers: function() {
        // Simulate async nature of real remote calls
        return $q.when(members);
      },
      apiData: function(stateCode) {
        getMembers(stateCode)
        return $q.when(members.promise)
      },
      getMembersByLatLng: function (lat, lng) {
        getMembersByLatLng(lat, lng)
        return $q.when(members.promise)
      }

    };
  }

})();
