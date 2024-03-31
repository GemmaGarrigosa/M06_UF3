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

//Extras que no surten al enunciat


let inputs = document.querySelectorAll('input'); //Agafem tots els inputs


inputs.forEach((input)=>{
  $(input).on("focusout", function(){
    let id = input.id;
    let value = input.value;
    if (id == "validationNom" || id == "validationPreu"){
        
        if (value == 0){
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        }else {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
        
    }
     
    
  });
});

document.querySelector(".btn-info").addEventListener("click", function(event) {
    event.preventDefault(); // Evita que el formulari s'enviï
    showInfoForm();
});


function showInfoForm(){

  let nameFlat = document.querySelector('#validationNom').value;
  let town = document.querySelector('#town');
  let price = document.querySelector('#validationPreu').value;
  let road = document.querySelector('#via');
  let street = document.querySelector('#carrer').value;
  let number = document.querySelector('#numero').value;
  let numberFlat = document.querySelector('#pis').value;
  let staircase = document.querySelector('#escala').value;
  let door = document.querySelector('#porta').value;
  let cp = document.querySelector('#cp').value;
  //Com en el select la opció que selecciones passa a estar la primera en l'array d'opcions...
  let selectedDistrict = district.selectedOptions[0].text;
  let selectedNeighborhood = neighborhood.selectedOptions[0].text;
  let selectedTown = town.selectedOptions[0].text;
  let selectedRoad = road.selectedOptions[0].text;

  let directionText = document.querySelector('#nomPis');
  let infoText = document.querySelector('#dir');
  let preuText = document.querySelector('#preu');
  //Carrer + barri + districte
  directionText.innerText = `${nameFlat} ${selectedDistrict} ${selectedNeighborhood}`;
  //NomVia, Numero, pis, escala, porta, CP, Districte, Barri, Poblacio
  infoText.innerText = `${selectedRoad} ${street} ${number} ${numberFlat} ${staircase} ${door} ${cp} ${selectedDistrict} ${selectedNeighborhood} ${selectedTown}`;
  preuText.innerText = `${price} €`;


}