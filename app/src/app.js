angular.module('MyApp',['ngMaterial', 'ngMessages', 'users'])

angular.module('MyApp').controller('MainCtrl', function($mdBottomSheet, $mdToast, userService, mapService) {
  mainCtrl = this

  mainCtrl.showBottomSheet = function() {
    userService.getMembersByLatLng(mapService.data.currentLatLng.lat(), mapService.data.currentLatLng.lng())
    $mdBottomSheet.show({
      templateUrl: '/app/src/bottom-sheet-list.html',
      controller: 'BottomSheetCtrl as bottom'
    })
  };
})

angular.module('MyApp').controller('BottomSheetCtrl', function($mdBottomSheet, userService) {
  bottom = this

  bottom.userData = userService.data

  bottom.goToPerson = function($index) {
    var clickedItem = bottom.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})
