let selectCategoria = document.querySelector("#categoria");
let selectSubCat = document.querySelector("#subcategoria");
let optionsCat = document.createElement("option");

fetch("categoria.php")
    .then((response) => response.json())
    .then((data) =>{
        console.log(data);
        data.forEach(item => {
            let optionsCat = document.createElement("option");
            optionsCat.value = item.id;  
            optionsCat.text = item.nom; 
            selectCategoria.appendChild(optionsCat);
        });
       
    })
    .catch((error) => {
        console.log("No ha rebut dades");
    });

selectCategoria.addEventListener("change", function(){
    let formData = new FormData();
    formData.append("categoria", this.value);

    let options = {
        method: 'POST',
        body: formData
    }
    selectSubCat.innerHTML = '';
    fetch("subcategoria.php",options)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(item => {
            let optionsCat = document.createElement("option");
            optionsCat.value = item.id;  
            optionsCat.text = item.nom; 
            selectSubCat.appendChild(optionsCat);
            });
        });
});

