(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.where39 = {}));
}(this, (function (exports) { 'use strict';

  /** @format */


  /** @format */



  function getIndexOfK(arr, k) {
    for (var i = 0; i < arr.length; i++) {
      var index = arr[i].indexOf(k);
      if (index > -1) {
        return [i, index]
      }
    }
  }

  /** @format */
  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
   }

  function toWords(lat, lng) {
    var longitude = ((lng - 180) % 360) + 180;
    var latitude = lat;

    longitude += 180;
    latitude += 90;

    var finalwords = new Array(5);
    var latw = latitude;
    var lngw = longitude;
    for (let i = 0; i < 5; i++) {
      let tilesize = tilesizes[i];
      let seeds = tileseeds[i];
      let clatw = Math.floor(latw / tilesize);
      let clngw = Math.floor(lngw / tilesize);

      latw -= tilesize * clatw;
      lngw -= tilesize * clngw;
      finalwords[i] = seeds[clatw][clngw];
    }
    console.log(finalwords)
    insertParam("words", finalwords)
    return finalwords
  }

function insertParam(key, value) {
  console.log(value)
    key = encodeURIComponent(key);
    value = encodeURIComponent(value.slice(0, 4));
    
    var passcode = getUrlVars()["passcode"];
    window.history.pushState({ path: refresh }, '', refresh);

    if(passcode){
      var refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + "?passcode=" + encodeURIComponent(passcode) + "&words=" + value;    
    }
    else{
      var refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + "?words=" + value;  
    }

       
    window.history.pushState({ path: refresh }, '', refresh);
}
  function fromWords(words) {
    var lat = 0;
    var lng = 0;

    for (let i = 0; i < words.length; i++) {
      let [wlat, wlng] = getIndexOfK(tileseeds[i], words[i]);
      lat += wlat * tilesizes[i];
      lng += wlng * tilesizes[i];
    }

    lng -= 180;
    lat -= 90;

    return {lat, lng}
  }

  function formatWords(words) {
    return `${words[0]} ${words[1] || '_'} ${words[2] || '_'} ${words[3] ||
    '_'} ${words[4] ? '(' + words[4] + ')' : ''}`
  }

  exports.formatWords = formatWords;
  exports.fromWords = fromWords;
  exports.toWords = toWords;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
