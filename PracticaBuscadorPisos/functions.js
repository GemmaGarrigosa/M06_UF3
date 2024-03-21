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


$('#form-user-register').submit(function(e){
  
  e.preventDefault(); //Evitem que faci el submit
  alert('fa submit')
});

//Mira quin tipus de camp és i el valida segons quin sigui
function checkFieldType (input){
  let id = input.id;

  if (id == "validationDNI"){
    if (validateNIF_NIE(input.value)){
      validateField(input);
    } 
  } else if (id == "validationEmail"){
    if (validateEmail(input.value)){
      validateField(input);
    }
  } else if (id == "validationTelf"){
    if (validateTelf(input.value)){
      validateField(input);
    }
  } else {
    validateField(input);
  }

}

//Treu la class de is-invalid i posa is-valid
function validateField (input){
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
}

//Mira que el camp s'hagi emplenat
function isFieldEmpty(value){
  if (value === '') return true;
  return false;
}

function validateTelf(value){
  if (value.length == 9) return true;
  return false;
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

