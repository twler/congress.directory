(function(){

  angular
  .module('users')
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
  }])

  angular
    .module('users')
    .controller('UserController', [
      '$scope', 'userService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
      UserController
    ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController($scope, userService, $mdSidenav, $mdBottomSheet, $log) {
    var self = this

    self.selected     = null
    self.users        = []
    self.selectUser   = selectUser
    self.toggleList   = toggleUsersList
    self.makeContact  = makeContact

    // Load all registered users

    userService.loadAllUsers()
    .then(function( users ) {
      self.users    = [].concat(users)
      self.selected = users[0]
    });

    // *********************************
    // Internal methods
    // *********************************

    function runState(stateCode) {
      return userService.apiData(stateCode)
      .then(function(members) {
        self.users = [].concat(members)
      })
    }

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
    }

    /**
     * Show the Contact view in the bottom sheet
     */
    function makeContact(selectedUser) {

      $mdBottomSheet.show({
        controllerAs  : "cp",
        templateUrl   : './src/users/view/contactSheet.html',
        controller    : [ '$mdBottomSheet', ContactSheetController],
        parent        : angular.element(document.getElementById('content'))
      }).then(function(clickedItem) {
        $log.debug( clickedItem.name + ' clicked!');
      });

      /**
       * User ContactSheet controller
       */
      function ContactSheetController( $mdBottomSheet ) {
        this.user = selectedUser;
        this.actions = [
          { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
          { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
          { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
          { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
        ];
        this.contactUser = function(action) {
          // The actually contact process has not been implemented...
          // so just hide the bottomSheet

          $mdBottomSheet.hide(action);
        };
      }
    }

    self.mapObject = {
      scope: 'usa',
      options: {
        width: 600,
        legendHeight: 60 // optionally set the padding for the legend
      },
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
      // data: {
      //   "AZ": {
      //     "fillKey": "MEDIUM",
      //   },
      //   "CO": {
      //     "fillKey": "HIGH",
      //   },
      //   "DE": {
      //     "fillKey": "LOW",
      //   },
      //   "GA": {
      //     "fillKey": "MEDIUM",
      //   }
      // },
    }
    self.clicked = function(geography) {
      self.stateName = geography.properties.name;
      self.stateCode = geography.id;
      runState(self.stateCode)
      .then(function() {
        // $scope.$apply()
      })
    }

  }

})();
