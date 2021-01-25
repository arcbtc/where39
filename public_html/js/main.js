/** @format */

var L = window.L
var where39 = window.where39

var map = L.map('map').fitWorld()

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
   }
var paracode = getUrlVars()["passcode"];
if (paracode >= 1 && paracode <= 9999999){
    var url = window.location.origin;
  var attrib =  '<button id="inputbox" onclick="_mylocation()">My location</button><br/><form onsubmit="_zoomTo(); return false"><input type="text" name="lng" id="inp" placeholder="Enter four bip39 words" style="width:70%"><input style="width:30%" type="submit" value="submit"></form><div><b style="color:red;width:70%;float:left;" >Word-list shuffled using '+ paracode +'</b><a href="'+url+'"><input style="width:30%;float: right;"  type="submit" value="unshuffle"></a></div> BETA   <a href="https://github.com/arcbtc/where39">learn more about where39</a>';
  }
  else{
    
  var attrib =  '<button id="inputbox" onclick="_mylocation()">My location</button><br/><form onsubmit="_zoomTo(); return false"><input type="text" name="lng" id="inp" placeholder="Enter four bip39 words" style="width:70%"><input value="submit" style="width:30%" type="submit"></form><div id="shuffle"><form onsubmit="_passcode(); return false"><input style="width:70%" id="passbox" type="number" name="quantity" min="1" max="9999999" placeholder="Shuffle words enter 1-9999999"><input type="submit" value="shuffle" style="width:30%"></form></div>BETA  <a href="https://github.com/arcbtc/where39">learn more about where39</a>';
    }


L.tileLayer(
 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmVuYXJjIiwiYSI6ImNra2QybXdidTA3NzEyd255MXp6cjczbDEifQ.ZyN1juw69Q2spV4fpLxGBQ',
  {
    zoomSnap: 2,
    maxZoom: 18,
  //  accessToken: 'pk.eyJ1IjoiYmVuYXJjIiwiYSI6ImNra2QybXdidTA3NzEyd255MXp6cjczbDEifQ.ZyN1juw69Q2spV4fpLxGBQ',
    attribution:
    attrib,
    id: 'mapbox/streets-v11'
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
  var inpStrr = document.getElementById('inp').value;
  var inpStr = inpStrr.toLowerCase();
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
function _passcode(e) {
  var numberr = document.getElementById('passbox');
  window.location.href = "?passcode=" + numberr.value;

  
}
