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

dropArea.addEventListener("drop", function(e){
    fitxers = fitxers.concat(Array.from(e.dataTransfer.files));

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
    const validExtensions = ["image/jpeg","imatge/jpg","imatge/png","imatge/gif"];

    const docType = file.type;

    if (!docType.includes(validExtensions)){
        console.log("L'arxiu no conté l'extensió permesa");
        fitxers.splice(index,1);
    }

    let reader = new FileReader(); // Ens permet llegir la info del fitxer de manera asíncrona
    reader.readAsDataURL(file);
}

// function mostraImatge(file){
    
//     let prev = `<div class="previewImage">
//                 <img src="${result}"/>
//                 <span>${file.name}</span>
//                 <span onclick="remove(${index})" class="material-symbols-outlined
//                 removeBtn">c</span>
//                 </div>`;
//     preview.innerHTML += prev;
// }