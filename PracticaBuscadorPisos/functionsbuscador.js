let district = document.querySelector("#district");
let neighborhood = document.querySelector("#neighborhood");

$("#neighborhood").prop("disabled", true); // Inhabilita el selector 

$("#district").on("change", function(){
    let selectionValue = $(this).val(); // agafa el que hi ha a dins de value="X"

    // com s'ha seleccionat un valor perque ha fet un onchange, treiem el disabled 
    neighborhood.disabled = false;
    getNeighborhoodByDistrictId(selectionValue);
});

//Agafem les dades dels districtes i construim les opcions
fetch('getDistrictes.php')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach(item => {
            let optionsDistrict = document.createElement("option");
            optionsDistrict.value = item.id;
            optionsDistrict.text = item.name;
            district.appendChild(optionsDistrict);
        })
    });


// Funció que fa el fetch dels barris 
function getNeighborhoodByDistrictId(idDistrict){
    
    let formData = new FormData();
    formData.append("id",idDistrict);

    let options = {
        method: 'POST',
        body: formData
    }

    fetch('getBarris.php', options)
        .then((response)=> response.json())
        .then((data)=> {
            neighborhood.innerHTML = ""; //netegem a cada selecció
            data.forEach(item => {               
                let optionsHood = document.createElement("option");
                optionsHood.value = item.id;
                optionsHood.text = item.name;
                neighborhood.appendChild(optionsHood);
                
            })
        });
     

        

}



