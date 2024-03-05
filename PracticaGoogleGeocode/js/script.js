let map
let button = document.querySelector("button");

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const center ={ lat: 41.390205, lng: 2.154007 },
  map = new Map(document.getElementById("map"), {
    center,
    zoom: 15,
  });

  new google.maps.Marker({
    position: center,
    map,
    title: "El meu barri!",
  });

}

initMap();

button.addEventListener("click", mostraCoordenades);





function mostraCoordenades() {
  //Revem el valor del input de adreça
    let adreca = document.getElementsByName('adreca')[0].value;
    alert(adreca);
    let geocoder = new google.maps.Geocoder();
    let address=adreca;
    geocoder.geocode( { 'address': address}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
           
            console.log(`aquesta es la latitud: ${latitude} i aquesta es la longitut: ${longitude}`);
            
            
         }
    });
    
}