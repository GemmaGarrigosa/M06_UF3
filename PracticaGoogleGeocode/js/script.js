let map;
let button = document.querySelector("#findLoc");
let marcador = document.querySelector("#marcador");
let marker = null;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const center ={ lat: 41.390205, lng: 2.154007 };
  map = new Map(document.getElementById("map"), {
    center: center,
    zoom: 15,
  });

   marker= new google.maps.Marker({
    position: center,
    map,
    title: "El meu barri!",
  });

}


button.addEventListener("click", mostraCoordenades);

marcador.addEventListener("click",mouMarcador);



function mostraCoordenades() {
  //Revem el valor del input de adreça
    let adreca = document.getElementsByName('adreca')[0].value;
    let geocoder = new google.maps.Geocoder();
    let address=adreca;
    geocoder.geocode( { 'address': address}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();

            let latitut = document.getElementById("latitude");
            let longitut = document.getElementById("longitude");

            latitut.value = latitude;
            longitut.value = longitude;
            
            let pos = new google.maps.LatLng(latitude, longitude);
            map.setCenter(pos);
            map.setZoom(16);

            if (marker != null){
                marker.setMap(null);
            }
           marker = new google.maps.Marker({
              position: pos,
              map: map,
            
          });
          
          
         } else {
           alert("No s'ha trobat la direcció");
         }
    });
    
}

function mouMarcador() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
      map.setZoom(20);
       new google.maps.Marker({
        position: pos,
        map: map,
        title: "Estàs aquí"
      });
    });
  }
}

initMap();