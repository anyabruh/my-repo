const container = document.querySelector(".container")
const input = document.querySelector("#user-input")
const comBox = document.querySelector('.comment-box')

let array = [];

let btn = document.querySelector("#addbtn")


btn.addEventListener("click", function(){
    let  msg = document.createElement("div")
    msg.classList.add('msg-container')
    comBox.prepend(msg)


    //<--user PHOTO-->
    let userPhoto = document.createElement('div')
    userPhoto.classList.add('user-photo')
    msg.appendChild(userPhoto)

    let userImg = document.createElement('img');
    userImg.classList.add('user-img')
    userImg.src = 'https://upload.wikimedia.org/wikipedia/en/d/dc/Pocket_Mortys.png'
    userPhoto.appendChild(userImg)
    //<--user PHOTO end-->

    //<--Comm box + email-->
    //user box
    let userBox = document.createElement('div')
    userBox.classList.add('user-box')
    msg.appendChild(userBox)

    //user info
    let userInfo = document.createElement('div')
    userInfo.classList.add('user-info')
    userBox.appendChild(userInfo)

    //user email
    let userEmail = document.createElement("p")
    userEmail.innerText = "example@js.com"
    userInfo.appendChild(userEmail)

    //user msg
    let userMessage = document.createElement('div')
    userMessage.classList.add('user-message')
    userMessage.innerText = input.value
    userBox.appendChild(userMessage)
    //<--Comm box end-->

    //<--Delete section-->
    let deleteSection = document.createElement('div');
    deleteSection.classList.add('delete-section')
    userBox.appendChild(deleteSection)

    let deleteBtn = document.createElement('button');

    deleteBtn.classList.add('delete-btn')
    deleteBtn.innerText = 'Delete';
    deleteSection.appendChild(deleteBtn)

    array.push(msg)


    deleteBtn.addEventListener('click',function(){
        comBox.removeChild(msg)
    })
    
    //<--Delete section end-->
})