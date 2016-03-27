(function(){

  angular.module('users').controller('UserController', ['$scope', 'userService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', UserController]);

  function UserController($scope, userService, $mdSidenav, $mdBottomSheet, $log) {
    var self = this

    self.selected     = null
    self.users        = []
    self.selectUser   = selectUser
    self.toggleList   = toggleUsersList
    self.makeContact  = makeContact

    function runState(stateCode) {
      return userService.apiData(stateCode)
      .then(function(members) {
        self.users = [].concat(members)
      })
    }

    function runLatLng(lat, lng) {
      console.log('runLatLng', lat, lng)
      return userService.getMembersByLatLng(lat, lng)
      .then(function(members) {
        console.log('members', members)
        self.users = [].concat(members)
      })
    }

    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }

    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
    }

    function makeContact(selectedUser) {

      $mdBottomSheet.show({
        controllerAs  : "cp",
        templateUrl   : './src/users/view/contactSheet.html',
        controller    : [ '$mdBottomSheet', ContactSheetController],
        parent        : angular.element(document.getElementById('content'))
      }).then(function(clickedItem) {
        $log.debug( clickedItem.name + ' clicked!');
      });

      function ContactSheetController( $mdBottomSheet ) {
        this.user = selectedUser;
        this.actions = [
          { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
          { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
          { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
          { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
        ];
        this.contactUser = function(action) {
          $mdBottomSheet.hide(action);
        };
      }
    }

    self.mapObject = {
      scope: 'usa',
      // options: {
      //   width: 600,
      //   legendHeight: 60 // optionally set the padding for the legend
      // },
      geographyConfig: {
        highlighBorderColor: '#EAA9A8',
        highlighBorderWidth: 2
      },
      fills: {
        'HIGH': '#CC4731',
        'MEDIUM': '#306596',
        'LOW': '#667FAF',
        'defaultFill': '#DDDDDD'
      }
    }

    var map;
    angular.initMap = function() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.4419, lng: -95.1419 },
        zoom: 4
      });
      map.addListener('click', function(e) {
        runLatLng(e.latLng.lat(), e.latLng.lng())
        placeMarkerAndPanTo(e.latLng, map)
        // map.panTo(e.latLng);
        map.setZoom(8)
      });
    }

    // var map;
    // angular.initMap = function() {
    //   map = new google.maps.Map(document.getElementById('map'), {
    //     center: { lat: 37.4419, lng: -95.1419 },
    //     zoom: 4
    //   });
    //   map.addListener('click', function(e) {
    //     runLatLng(e.latLng.lat(), e.latLng.lng())
    //     placeMarkerAndPanTo(e.latLng, map)
    //     // map.panTo(e.latLng);
    //     map.setZoom(8)
    //   });
    //   function placeMarkerAndPanTo(latLng, map) {
    //     var marker = new google.maps.Marker({
    //       position: latLng,
    //       map: map
    //     });
    //     map.panTo(latLng);
    //   }
    // }

  }

})();
