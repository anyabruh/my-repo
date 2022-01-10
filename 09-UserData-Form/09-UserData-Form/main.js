const first_name = document.querySelector('.input-first-name');
const last_name = document.querySelector('.input-last-name');
const mobile = document.querySelector('.input-mobile-phone');
const street = document.querySelector('.input-street');
const number = document.querySelector('.input-street-number');
const city = document.querySelector('.input-city');
const country = document.querySelector('.input-country');
const userContainer = document.querySelector('.user-container');
const editButton = document.querySelector('.update-button')
const userPhone = document.querySelector('.user-phone');
const inputs = document.querySelectorAll('input')
const error = document.getElementById('error');



//buttons
const sendBtn = document.querySelector('.send-button')
const deleteBtn = document.querySelector('.delete-btn')


const user = [];
let userIndex = 0;

getUsers();

function getUsers() {
  fetch('https://contact-agenda-rest-api.herokuapp.com/users')
  .then(response => response.json())
  .then(data => displayUsers(data));
}


sendBtn.addEventListener('click', sendUser)


function sendUser() {

    const newUser = {
        first_name : first_name.value,
        last_name : last_name.value,
        mobile: mobile.value,
        adress: {
            street: street.value,
            number: number.value,
            city: city.value,
            country: country.value
    }
  }

  if(newUser.first_name !== '' && newUser.last_name !== '') {

    fetch('https://contact-agenda-rest-api.herokuapp.com/users',{
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(newUser),
    })
    .then(res => {
      console.log('Request complete', res);
      getUsers();
    })
    
    error.style.display = 'none'
    inputs.forEach(input =>  input.value = '')

  }else {
    error.style.display = 'block'
  }
  }



  
  function renderUser(user) {

      
      let userbox = document.createElement('div');
      userbox.classList.add('user-card')


      let topSideContact = document.createElement('div');
      topSideContact.classList.add('top-side-contact');
      
      let topButtons = document.createElement('div');
      topButtons.classList.add('top-buttons')
      
      let userBasicContact = document.createElement('div')
      userBasicContact.classList.add('contact-basic')
      
      let usernamePhoto = document.createElement('div');
      usernamePhoto.classList.add('username-photo')
      
      let userPicture = document.createElement('img');
      userPicture.src = 'user.png'

    if(user.first_name !== '' && user.last_name !== '') {

      let userFirstLast = document.createElement('p');
      userFirstLast.innerHTML = `${user.first_name} ${user.last_name}`;

    
      usernamePhoto.append(userPicture);
      usernamePhoto.append(userFirstLast);
    } 
      
      


      userBasicContact.append(usernamePhoto);

      if(user.hasOwnProperty('mobile') === true && user.mobile !== '') {

        let userPhone = document.createElement('div');
        userPhone.classList.add('user-phone');
  
        let userPhonePicture = document.createElement('img');
        userPhonePicture.src = 'smartphone.png'
  
        let userPhoneText = document.createElement('p');
        userPhoneText.innerHTML = `${user.mobile}`;

        userPhone.append(userPhonePicture)
        userPhone.append(userPhoneText)

        userBasicContact.append(userPhone)

      }
     

       topSideContact.append(userBasicContact)
       topSideContact.append(topButtons)
       userbox.append(topSideContact)
       
       
       if(user.hasOwnProperty('adress') === true && user.adress.street !== '') {

         let userDetailContact = document.createElement('div')
         userDetailContact.classList.add('contact-details')
         
         userDetailContact.innerHTML = `
         <div class='adress-photo'>
         <img src='adress.png'>
         <div class='adress-spans'>
         <span>${user.adress.street}</span>
         <span>${user.adress.number}, </span>
         <span>${user.adress.city}, </span>
         <span>${user.adress.country}</span>
         </div>
         </div>
         
         `
         userbox.append(userDetailContact)
        }
        
        let editBtn = document.createElement('img');
        editBtn.src = 'edit.png'
        editBtn.classList.add('edit-btn')
        topButtons.append(editBtn)
        
        let deleteBtn = document.createElement('img');
        deleteBtn.src = 'delete.png'
        deleteBtn.classList.add('delete-btn')
        topButtons.append(deleteBtn)
        
        

      userContainer.append(userbox)
      
      
      
      editBtn.addEventListener('click', function(){
        editUser(user.id)
        userIndex = user.id
        console.log(userIndex);
        editButton.style.display = 'block';
        sendBtn.style.display = 'none';
      })
      
      deleteBtn.addEventListener('click',function(){
        deleteUser(user.id)
        
        
      })
      
    }
    editButton.addEventListener('click',function(){
      updateUserData(userIndex)
      editButton.style.display = 'none';
      sendBtn.style.display = 'block';
    })
    
    

    function displayUsers(users) {
    userContainer.innerHTML = '';
      for(const key in users){
  

          let user = users[key]

          renderUser(user);      
        }
       
    }
    

    function editUser(userId) {
        fetch("https://contact-agenda-rest-api.herokuapp.com/users/" + userId, {
      method: "GET",
    })
    .then(response => response.json())
    .then(data => populateFields(data));

  };



function updateUserData(uid) {

  if(first_name.value !== '' && last_name.value !== '') {

    fetch("https://contact-agenda-rest-api.herokuapp.com/users/" + uid, {
      method: 'PUT',
      body: JSON.stringify({
        first_name: first_name.value,
        last_name: last_name.value,
        mobile: mobile.value,
        adress: {
          street: street.value,
          number: number.value,
          city: city.value,
          country: country.value
        }
      }),
      
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(getUsers)
    
    
    error.style.display = 'none'
    inputs.forEach(input =>  input.value = '');

  }
  else {
    error.style.display = 'block'
    inputs.forEach(input =>  input.value = '');
  }
};


function deleteUser(id) {
    fetch("https://contact-agenda-rest-api.herokuapp.com/users/" + id, {
      method: "DELETE",
    })
    .then(getUsers);
  }
    

    
  function populateFields(data){
        first_name.value = data.first_name
        last_name.value = data.last_name
        mobile.value = data.mobile
        street.value = data.adress.street
        number.value = data.adress.number
        city.value = data.adress.city
        country.value = data.adress.country
    }
