let inputs = document.querySelectorAll('input'); //Agafem tots els inputs


inputs.forEach((input)=>{
  $(input).on("focusout", function(){
    
    if (isFieldEmpty(input.value)){
     
      input.classList.add("is-invalid");
    } else {
      checkFieldType(input);
      
    }
  });
});

$('#btnUsername').click(function(e){
  console.log("Fet click al @ de usuari")  
  let username = generateUsername();
  console.log(username)
});

$('#form-user-register').submit(function(e){
  
  e.preventDefault(); //Evitem que faci el submit
  alert('fa submit')
});

//Mira quin tipus de camp és i el valida segons quin sigui
function checkFieldType(input) {
  let id = input.id;

  if (id == "validationDNI") {
    if (validateNIF_NIE(input.value)) {
      validateField(input);
    } else {
      invalidateField(input);
    }
  } else if (id == "validationEmail") {
    if (validateEmail(input.value)) {
      validateField(input);
    } else {
      invalidateField(input);
    }
  } else if (id == "validationTelf") {
    if (validateTelf(input.value)) {
      validateField(input);
    } else {
      invalidateField(input);
    }
  } else {
    validateField(input);
  }
}

// Valida el camp i aplica la clase is-valid
function validateField(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
}

// Invalida el camp i aplica la clase is-invalid
function invalidateField(input) {
  input.classList.remove("is-valid");
  input.classList.add("is-invalid");
}
//Mira que el camp s'hagi emplenat
function isFieldEmpty(value){
  if (value === '') return true;
  return false;
}

function validateTelf(value){
  var onlyDigits= /^\d+$/;
  if (!onlyDigits.test(value)){
    console.log('Hi ha lletres')
    return false;
  }else {
    if (value.length === 9)return true;
    console.log('Longitut incorrecta')
    return false;
  }
}

function validateNIF_NIE(value){
  var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
  var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
  var str = value.toString().toUpperCase();

  if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

  var nie = str
    .replace(/^[X]/, '0')
    .replace(/^[Y]/, '1')
    .replace(/^[Z]/, '2');

  var letter = str.substr(-1);
  var charIndex = parseInt(nie.substr(0, 8)) % 23;

  if (validChars.charAt(charIndex) === letter) return true;

  return false;
}


function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
    alert("OK");
    return true;
  }else{
    alert("KO");
    return false;
  }
}

//Genera un nom d'usuari a partir del nom, el cognom i el dni
//primera lletra del nom en minúscula
//les quatre primeres lletres del cognom amb la primera en majúscula
//numeros de les posicions senars del DNI
function generateUsername(){
   
  let name = document.querySelector("#validationNom").value.slice(0,1).toLowerCase();
  let surname = document.querySelector("#validationCognoms").value.replace(" ","").slice(0,4).toLowerCase();
  let surnameSliced = surname.charAt(0).toUpperCase() + surname.slice(1);
  let dni = document.querySelector('#validationDNI').value;
  let dniOddNumbers = "";
  for (let i = 0; i < dni.length; i++) {
    if (i % 2 === 0) {
      dniOddNumbers += dni[i];
    }
  }
  return name + surnameSliced + dniOddNumbers.toLowerCase();
 
}



