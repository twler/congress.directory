(function(){
  'use strict';

  angular.module('users').service('mapService', ['userService', MapService]);

  function MapService(userService) {

    var _data, map, marker

    var _data = {
      startCenter: { lat: 37.4419, lng: -95.1419 },
      currentLatLng: null
    }

    var map = new google.maps.Map(document.getElementById('map'), {
      center: _data.startCenter,
      zoom: 4
    })

    var marker = new google.maps.Marker({
      position: _data.startCenter,
      map: map,
      title: 'Current Location'
    })

    map.addListener('click', function(e) {
      _data.currentLatLng = e.latLng
      marker.setPosition(e.latLng)
      map.panTo(e.latLng)
    })

    // Exports
    return {
      data: _data
    }


  }

})();
