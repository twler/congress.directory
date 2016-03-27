(function(){
  'use strict';

  angular.module('users').service('userService', ['$http', '$q', UserService]);

  function UserService($http, $q) {

    var members = $q.defer()
    var _data = {
      filteredMembers: []
    }

    function getMembersBy (obj) {
      var filteredMembers = []
      $http({ method: 'GET', url: 'https://www.govtrack.us/api/v2/role?current=true&state=' + obj.state })
      .success(function(data, status) {
        var i;
        for (i = 0; i < data.objects.length; i++) {
          if (data.objects[i].role_type == 'senator' || data.objects[i].district == obj.district){
            filteredMembers.push(data.objects[i])
          }
        }
        _data.filteredMembers = filteredMembers
        members.resolve(filteredMembers)
      })
      .error(function(data, status) {
        console.log('error', data)
        members.reject(data)
      })
    }

    function getMembersByLatLng (lat, lng) {
      members = $q.defer()
      var url = 'https://congress.api.sunlightfoundation.com/districts/locate?latitude=' + lat + '&longitude=' + lng + '&apikey=d9733fd4fa5a43cda9885da876a67848';
      $http({ method: 'GET', url: url })
      .success(function(data, status) {
        getMembersBy({ state: data.results[0].state, district: data.results[0].district })
      })
      .error(function(data, status) {
        console.log('error', data)
        members.reject(data)
      })
    }

    // Promise-based API
    return {
      getMembersByLatLng: function (lat, lng) {
        getMembersByLatLng(lat, lng)
        return $q.when(members.promise)
      },
      data: _data
    };
  }

})();
