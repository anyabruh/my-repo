const logoutBtn = document.getElementById('logout');

let test = window.localStorage;

logoutBtn.addEventListener('click', () =>{
    test.clear();
    window.location = "http://127.0.0.1:5500/login.html"
})

function checkOffline() {
    if(localStorage.getItem('email') === null && localStorage.getItem('password') === null){
        window.location = 'http://127.0.0.1:5500/login.html'
    }
}

checkOffline();
