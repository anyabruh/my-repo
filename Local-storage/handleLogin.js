const alertMsg = document.querySelector('.alert-msg')
const loginBtn = document.getElementById('login');
const userBtn = document.getElementById('get');


const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');




loginBtn.addEventListener('click',validateUser)

    function validateUser() {
        fetch('https://contact-agenda-rest-api.herokuapp.com/users')
        .then(res => res.json())
        .then(data => {
            for(const key in data){
                checkUser(data,key)
            }
        })
    }


function checkUser (data,key) {
    if(data[key].email === inputEmail.value && data[key].password === inputPassword.value){
        window.location = "http://127.0.0.1:5500/index.html"
        localStorage.setItem('email', `${data[key].email}`)
        localStorage.setItem('password', `${data[key].password}`)
        alertMsg.style.display = 'none'

    }else{
        console.log('fail');
        alertMsg.style.display = 'block'
    }
}

function checkOnline() {
    if(localStorage.getItem('email') !== null && localStorage.getItem('password') !== null){
        window.location = 'http://127.0.0.1:5500/index.html'
    }
}

checkOnline();
