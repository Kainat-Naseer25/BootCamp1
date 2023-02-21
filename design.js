
function add() {

    console.log("run");
    //for name
    var inputName = document.getElementById("inputName").value
    // regex pattern
    var regName = /^[a-zA-Z\s]*$/;
    // check
    if (!regName.test(inputName)) {
      document.getElementById("error").innerHTML = 'invalid name';
      document.getElementById('error').classList.remove('d-none');
      //document.getElementById("error").style.display="block"
      return false
    }
  
    //for email
    var inputEmail = document.getElementById("inputEmail").value
    // regex pattern
    var regEmail =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // check
    if (!regEmail.test(inputEmail)) {
      document.getElementById("error").innerHTML = 'invalid email';
      document.getElementById('error').classList.remove('d-none');
      return false
    }
  
    //for phone
    var inputPhoneNo = document.getElementById("inputPhoneNo").value
    // regex pattern
    var regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    // check
    if (!regPhone.test(inputPhoneNo)) {
      document.getElementById("error").innerHTML = 'invalid phone';
      document.getElementById('error').classList.remove('d-none');
      return false
    }
  
    console.log('run')

    document.getElementById("setName").innerHTML = inputName;
    document.getElementById("setEmail").innerHTML = inputEmail;
    document.getElementById("setPhoneNo").innerHTML = inputPhoneNo;
    
    var isChecked = document.getElementById('flexRadioDefault1').checked;
    var button_value;
    var button = document.getElementById("result")

    if(isChecked){
        button_value = document.getElementById('btn1').innerHTML;
        button.classList.remove("btn-success");
        button.classList.add("btn" ,"btn-primary");
    }
    else {
        button_value = document.getElementById('btn2').innerHTML;
        button.classList.remove("btn-primary");
        button.classList.add("btn" ,"btn-success");
    }
    button.innerHTML=button_value;


    var card = document.getElementById("card");
    card.classList.remove("d-none")

    var setName = document.getElementById("setName");
    setName.innerHTML= inputName;

    var setEmail = document.getElementById("setEmail");
    setEmail.innerHTML= inputEmaili;

    var setPhoneNo = document.getElementById("setPhoneNo");
    setPhoneNo.innerHTML= inputPhoneNo;

        var reader = new FileReader();
        reader.onload = function(){
          var image = document.getElementById('image');
          image.src = reader.result;
        };
        reader.readAsDataURL(document.getElementById("file").files[0])
}