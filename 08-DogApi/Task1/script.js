const dogImage = document.querySelector('.dog-image');
const previousBtn = document.querySelector('#previous-btn')
const nextBtn = document.querySelector('#next-btn')

let randomDogImg = document.createElement('img');

let array = []
let currentPosition = 0;

getDogs()

function getDogs() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(processResponse)
      .then(renderUsers);
  }

  function processResponse(response) {
    return response.json();
  }

  function renderUsers(data) {
   randomDogImg.src = data.message;
   dogImage.appendChild(randomDogImg)

   array.push(randomDogImg.src)
   currentPosition = array.length -1;
   
  }

  
  nextBtn.addEventListener('click',getDogs)
  previousBtn.addEventListener('click',function(){
    if(currentPosition > 0){
      randomDogImg.src = array[currentPosition - 1];
      currentPosition--;
    }
    
  })