/** @format */

var L = window.L
var where39 = window.where39

var map = L.map('map').fitWorld()

L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  {
    zoomSnap: 2,
    maxZoom: 16,

    attribution:
      '<button id="inputbox" onclick="_mylocation()">My location</button><br/><form onsubmit="_zoomTo(); return false"><input type="text" name="lng" id="inp" placeholder="Enter four bip39 words"><input type="submit"></form>',
    id: 'mapbox.streets'
  }
).addTo(map)

// map.locate({setView: true, maxZoom: 3});
map.setView(new L.LatLng(19.476950206488414, -2.6367187500000004), 3)

function _mylocation(e) {
  map.locate({setView: true, maxZoom: 13})

  function onLocationFound(e) {
    var radius = e.accuracy / 2

    var fourwords = where39.formatWords(
      where39.toWords(e.latlng.lat, e.latlng.lng)
    )

    L.marker(e.latlng)
      .addTo(map)
      .bindPopup(
        "<b style='font-size: 15px'>" +
          fourwords +
          '</b><br/>' +
          'You are within ' +
          radius +
          ' meters from this point<br/>' +
          e.latlng.lat +
          ' ' +
          e.latlng.lng
      )
      .openPopup()

    L.circle(e.latlng, radius).addTo(map)
  }

  function onLocationError(e) {
    window.alert(e.message)
  }

  map.on('locationfound', onLocationFound)
  map.on('locationerror', onLocationError)
}

var popup = L.popup()

function onMapClick(e) {
  var fourwords = where39.formatWords(
    where39.toWords(e.latlng.lat, e.latlng.lng)
  )

  popup
    .setLatLng(e.latlng)
    .setContent(
      "<b style='font-size: 15px'>" +
        fourwords +
        '</b><br/>' +
        e.latlng.lat +
        ' ' +
        e.latlng.lng
    )
    .openOn(map)
}

map.on('click', onMapClick)

function _zoomTo(e) {
  var inpStr = document.getElementById('inp').value
  var inpsplt = inpStr
    .split(' ')
    .map(x => x.trim())
    .filter(x => x)

  var res = where39.fromWords(inpsplt)

  var lat = res.lat
  var lng = res.lng

  map.panTo(new L.LatLng(lat, lng))

  L.marker([lat, lng], {})
    .addTo(map)
    .bindPopup(
      "<b style='font-size: 15px'>" +
        inpsplt[0] +
        ' ' +
        inpsplt[1] +
        ' ' +
        inpsplt[2] +
        ' ' +
        inpsplt[3] +
        '</b><br/>' +
        lat +
        ' ' +
        lng
    )
    .openPopup()

  map.setView(new L.LatLng(lat, lng), 13)
}
