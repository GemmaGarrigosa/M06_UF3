let fitxers = [];

// Declarem els objectes que farem servir 
let dropArea = document.querySelector('.drop-area');
let dropText = document.querySelector('h2');
let button = document.querySelector('button');
let input = document.querySelector('#input-file');
let preview = document.querySelector('#preview');

//Invalidem per defecte del drag and drop 

let accions = ['dragover','dragleave','drop'];

accions.forEach((evt) => {
    dropArea.addEventListener(evt, prevDefault);
});

function prevDefault (e) {
    e.preventDefault();
}

//Acció dragover

dropArea.addEventListener("dragover", function(){
   document.querySelector('div').classList.add("active");
   dropText.textContent = "Drop to upload files";
   
});

//Acció dragleave

dropArea.addEventListener("dragleave",function(){
    document.querySelector('div').classList.remove("active");
    dropText.textContent = "Drag & Drop files";
});

//Acció drop 

dropArea.addEventListener("drop", function(event){
    console.log('entra en drop')
    fitxers = fitxers.concat(Array.from(event.dataTransfer.files));
    console.log(fitxers)
    showFiles();
});

//Funció showFiles 
function showFiles(){
    
    if (fitxers != null) {

        fitxers.forEach((file,index) =>{
            processFile(file,index);
        });
    }
}

// Funció processFile (file,index)
function processFile(file,index){
    
    const validExtensions = ["image/jpg","image/png","image/gif","image/jpeg"];
    preview.innerHTML = "";
    const docType = file.type;

    if (!validExtensions.includes(docType)){
        console.log("L'arxiu no conté l'extensió permesa");
        fitxers.splice(index,1);
        
    }else {

        let reader = new FileReader(); // Ens permet llegir la info del fitxer de manera asíncrona
        reader.onload = function(event) { // He trobat aquest mètode https://developer.mozilla.org/es/docs/Web/API/FileReader/load_event
            let result = event.target.result;// agafa l'objecte que desencadena l'event i també l'objecte que rep del readAsDataResult()
            let prev = `<div class="previewImage">
            <img src="${result}"/>
            <span>${file.name}</span>
            <span onclick="removeBtn(${index})" class="material-symbols-outlined
            removeBtn">c</span>
            </div>`;
            preview.innerHTML += prev;
        }
        reader.readAsDataURL(file);
    }
}

// Funció removeBtn(i)

function removeBtn(i){
    fitxers.splice(i,1);
    console.log(fitxers)
     preview.innerHTML = "";
    showFiles();
}

// Click al botó Upload Files

button.addEventListener("click", function(e){
    e.preventDefault(); //evita que el formulari s'envii
    input.click(); //t'obre la pestanya per carregar els arxius
});


//Gestiona els arxius seleccionats
input.addEventListener("change", function(){
    console.log('Entra a change')
    let arxiusSeleccionats = input.files;
    fitxers = fitxers.concat(Array.from(arxiusSeleccionats));
    showFiles();
});
