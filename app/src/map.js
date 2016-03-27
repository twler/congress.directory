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
  function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    map.panTo(latLng);
  }
  function runLatLng(lat, lng) {
    console.log('runLatLng', lat, lng)
    return userService.getMembersByLatLng(lat, lng)
    .then(function(members) {
      console.log('members', members)
      self.users = [].concat(members)
    })
  }
}
