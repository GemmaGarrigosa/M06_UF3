
let inputemail = document.querySelector('#inputemail');
let inputpwd = document.querySelector('#inputpwd');
let inputconfpwd = document.querySelector('#inputconfpwd');
let inputcodi= document.querySelector('#inputcodi');
let inputs = document.querySelectorAll('input');
let errors = [];
//VARIABLES CONTRASSENYA

let lowerCaseLetters = /[a-z]/;
let upperCaseLetters = /[A-Z]/;
let numbers = /[0-9]/;
let specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;



// F O C U S  O U T //

inputs.forEach((input)=>{
    input.addEventListener("focusout",function(){
        eliminaError(input); //eliminem el error per a que no es repliqui al fer focusout
        if (input.value == ''){
            input.style.borderColor = "red";
            afegeixError(input, "Introdueix un valor");
        } else {

            if (input.id == inputemail.id){
                if (!validateEmail(input.value)){
                    input.style.borderColor = "red";
                    afegeixError(input, "Correu invalid");
                }else {
                    input.style.borderColor = "green";
                }
            }else{
                input.style.borderColor = "green";
            }
            
        }
    });
});

// I N P U T  D E  P A S S W O R D //

inputpwd.addEventListener("input", function(){
    errors = [];
    eliminaError(inputpwd);
    let passwd = inputpwd.value;
    let teMinuscules = lowerCaseLetters.test(passwd);
    let teMajuscules = upperCaseLetters.test(passwd);
    let teNumero = numbers.test(passwd);
    let teCaractersEspecials = specialChars.test(passwd);

    if (passwd.length > 15 || passwd.length < 8) {
        errors.push(' 8 caracters com a mínim i 15 com a màxim');
    } 

    if (!teMinuscules){
        errors.push('1 lletra minúscula mínim');
    }

    if (!teMajuscules){
        errors.push('1 lletra majúscula mínim');
    }

    if (!teNumero){
        errors.push('1 número mínim');
    }

    if (!teCaractersEspecials){
        errors.push('1 caràcter especial mínim');
    }

    if (errors.length > 0){
        inputpwd.style.borderColor = "red";
         mostraErrorsPassword(errors,inputpwd);
    } else {
        inputpwd.style.borderColor = "green";
    }

});

// C O M P R O V A C I Ó  C O N F I R M A C I O  P A S S W D

inputconfpwd.addEventListener("input", function(){
    eliminaError(inputconfpwd)
    if (inputconfpwd.value == inputpwd.value){
        inputconfpwd.style.borderColor = "green";
        eliminaError(inputconfpwd);
    } else {
        inputconfpwd.style.borderColor = "red";
        afegeixError(inputconfpwd, "Les contrassenyes no coincideixen");
    }
});


// S U B M I T 

let formulari = document.querySelector('form');

formulari.addEventListener("submit", function (e){
    e.preventDefault(); //Evitem que s'envii
    if (validaTot){
        formulari.submit();
    }
    console.log('no valid');
    return;
    
});

// Funció que mira que tingui codi postal valid
function validaTot (){
    let valid = true;
    inputs.forEach(input =>{
        if (input.value == ""){
            valid = false;
        }

        if (input.id == "inputemail"){
            if (!validateEmail(input.value)){
                valid =false;
            }
        }
        if (input.id == "inputpwd"){
            let password = input.value;
            if (password.length < 8 || password.length > 15 ||!/[a-z]/.test(password) ||!/[A-Z]/.test(password) ||!/[0-9]/.test(password) ||!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
                valid =false;
            }
        }

        if (input.id == "inputconfpwd"){
            if (input.value != inputpwd.value){
                valid =false;
            }
        }
 
    });
    
    return valid;
}

function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
       return true;
    }else{
       return false;
    }
}

//Funció que et un span amb el missatge que tu li posis
function afegeixError(input,missatge){
    let span = document.createElement("span");
    span.innerHTML = "</br>" + missatge;
    span.style.borderColor = "red";
    span.style.color = "red";
    span.classList.add('msg-error'); //afegim una classe per despres poder eliminar-lo perque sinó no el troba
    input.parentNode.insertBefore(span,input.nextSibling);
}
//Funció que mira si el input conté un span amb la classe msg-error, si el conté l'elimina
function eliminaError(input){
    let error = input.nextElementSibling;
    if (error && error.classList.contains('msg-error')){
        input.parentNode.removeChild(error);
    }
}
//Crea una llista amb l'array d'errors 
function mostraErrorsPassword(errors,input) {
    let ul = document.createElement('ul');
    errors.forEach(e => {
        let li = document.createElement('li');
        li.textContent = e;
        ul.appendChild(li);
          
    });

    ul.style.color = "red";
    ul.classList.add('msg-error');

    input.parentNode.insertBefore(ul, input.nextSibling);
    errors = [];
}

