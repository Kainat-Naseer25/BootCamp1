document.addEventListener('DOMContentLoaded',fetchUsers)

// fetching data
function fetchUsers(){
    fetch('https://dummyjson.com/users/?limit=4&select=id,firstName,lastName,email,phone,gender,image')
    .then(res => res.json())
    .then(data => {cardDetails(data.users);
        console.log("data");}
    );
}

// loop for defined limit
function cardDetails(users){
    users.forEach(users => {addUsers(users)}
    );
}

// adding fetched data
function addUsers(user) {
    var userCard = "<div class='card mb-3' id='card" + user.id + "' style='max-width: 460px; margin-top: 20px;'>" +
      "<div class='card-body'><div class='row personal1 mb-3'><div class='col'>" +
      "<h5 id='setName"+user.id+"' class='names'>" + user.firstName +" "+ user.lastName + "</h5>" +
      "<p><img src='mail.png' style='height: 20px; width:20px;'><span id='setEmail"+user.id+"'>" + user.email + "</span></p>" +
      "<p><img src='phone.png' style='height: 20px; width:20px;'><span id='setPhoneNo"+user.id+"'>" + user.phone + "</span></p>" +
      "<div>" +
      "<button type='button' class='btn btn-dark' onclick='updateUser(" + user.id + ")'>Edit</button>" +
      "<button type='button' class='btn btn-danger' onclick='deleteUser(" + user.id + ")'>Delete</button>" +
      "</div></div><div class='col'>" +
      "<button type='submit' class='btn btn-primary' style='float: right; margin-right: 50px;'>" + user.gender + "</button>" +
      "<div>" +
      "<img src='" + user.image + "' style='height: 150px; width: 150px; float: right;'>" +
      "</div></div></div></div></div>";
  
    var main = document.getElementById('main');
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
  fetch(`https://dummyjson.com/users/${id}`, {
    method: 'DELETE'
  })
  .then(res => {
    if (res.ok) {
      const userCard = document.getElementById('card'+id);
      userCard.remove();
    } else {
      throw new Error('Failed to delete user');
    }
  })
  .catch(err => console.error(err));
}

// creating our own data
function create(){
 
}