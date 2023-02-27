document.addEventListener('DOMContentLoaded',fetchUsers)
var users =[]
var main = document.getElementById('main');

// fetching data
function fetchUsers(){
    fetch('https://dummyjson.com/users/?limit=2&select=id,firstName,lastName,email,phone,gender,image')
    .then(res => res.json())
    .then(data => {cardDetails(data.users);
        console.log("data");}
    );
}

// loop for defined limit
function cardDetails(data){
    users= data;
    users.forEach(user => {addUsers(user)
    users.push();
    });
    console.log(users)
}

// adding fetched data
function addUsers(user) {
  console.log(users)
    buttonClass="btn-success"
    if (user.gender == "male")
    buttonClass="btn-primary"

    var userCard = "<div class='card mb-3' id='card" + user.id + "' style='max-width: 460px; margin-top: 20px;'>" +
      "<div class='card-body'><div class='row personal1 mb-3'><div class='col'>" +
      "<h5 id='setName"+user.id+"' class='names'>" + user.firstName +" "+ user.lastName + "</h5>" +
      "<p><img src='mail.png' style='height: 20px; width:20px; margin-right: 2px;'><span id='setEmail"+user.id+"'>" + user.email + "</span></p>" +
      "<p><img src='phone.png' style='height: 20px; width:20px;'><span id='setPhoneNo"+user.id+"'>" + user.phone + "</span></p>" +
      "<div>" +
      "<button type='button' class='btn btn-dark' onclick='updateUser(" + user.id + ")' style='margin-right: 5px;'>Edit</button>" +
      "<button type='button' class='btn btn-danger' onclick='deleteUser(" + user.id + ")'>Delete</button>" +
      "</div>" +
      "</div><div class='col'>" +
      "<button type='submit' class='btn "+buttonClass+"' style='float: right; margin-right: 50px;' id='result'>" + user.gender + "</button>" +
      "<div>" +
      "<img src='" + user.image + "' style='height: 150px; width: 150px; float: right;' id='image1'>" +
      "</div></div></div></div></div>";
  
       main.innerHTML += userCard;
}

// updating fetched data
function updateUser(id) {
console.log(id)
    var nameInput = document.getElementById('setName'+id).innerHTML;
    document.getElementById('inputName').value = nameInput;

    var emailInput = document.getElementById('setEmail'+id).innerHTML;
    document.getElementById('inputEmail').value = emailInput;

    var phoneInput = document.getElementById('setPhoneNo'+id).innerHTML;
    document.getElementById('inputPhoneNo').value = phoneInput;

    var button = document.querySelector(".addContact");
    button.id=id;

    var name = nameInput.value;
    var email = emailInput.value;
    var phone = phoneInput.value;
    var userCard = document.getElementById(id);
  
    // Update the user card with the new data
    userCard = name;
    userCard = email;
    userCard = phone;

    // Send the updated user data to the server
    fetch(`https://dummyjson.com/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        email,
        phone
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json()
    ).then(console.log)
    .catch(err => console.error(err));
}

// function to call in update button
  function addButton(id){

        var userCard = document.getElementById('card'+id);

        var name= document.getElementById('inputName').value;
        userCard.querySelector('#setName'+id).textContent = name;

        var email= document.getElementById('inputEmail').value;
        userCard.querySelector('#setEmail'+id).textContent = email;

        var phone= document.getElementById('inputPhoneNo').value;
        userCard.querySelector('#setPhoneNo'+id).textContent = phone;
  }

// deleting the data
function deleteUser(id) {
  console.log(id)

  if(id > 100)
 {
  const userCard = document.getElementById('card'+id);
  userCard.remove();
  // for index
  index= id-99;
  console.log(index)

  //for removing new card
  users.splice(index);
  console.log(users)
  return;
 }

  fetch(`https://dummyjson.com/users/${id}`, {
    method: 'DELETE'
  })
  .then(res => {
    if (res.ok) {
      const userCard = document.getElementById('card'+id);
      userCard.remove();
      console.log(userCard)
    } else {
      throw new Error('Failed to delete user');
    }
  })
  .catch(err => console.error(err));
}

// creating our own data
function create() {

  var isChecked = document.getElementById('flexRadioDefault1').checked;
  var gender;
  if (isChecked) {
    gender = 'male';
   
  } else {
    gender = 'female';
  }
  console.log(isChecked)

  const name = document.getElementById('inputName').value;
  var regName = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
  // check
  if (!regName.test(name)) {
    document.getElementById("error").innerHTML = 'invalid name';
    document.getElementById('error').classList.remove('d-none');
    return false
  }

  var email = document.getElementById('inputEmail').value;
  var regEmail =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // check
  if (!regEmail.test(email)) {
    document.getElementById("error").innerHTML = 'invalid email';
    document.getElementById('error').classList.remove('d-none');
    return false
  }

  var phone = document.getElementById('inputPhoneNo').value;
  var regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  // check
  if (!regPhone.test(phone)) {
    document.getElementById("error").innerHTML = 'invalid phone';
    document.getElementById('error').classList.remove('d-none');
    return false
  }
    console.log(name)
    console.log(email)
    console.log(phone)
  fetch('https://dummyjson.com/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: name,
      email: email,
      phone: phone,
      gender: gender,
      image: "https://robohash.org/doloremquesintcorrupti.png",
    }),
  })
    .then((res) => res.json())
    .then(data => {addUsers(data),users.push(data)})
    .catch((err) => console.error(err));     
}