const dogImage = document.querySelector('.dog-image');
const previousBtn = document.querySelector('#previous-btn');
const nextBtn = document.querySelector('#next-btn');
const dogList = document.querySelector('.dog-list');
const title = document.querySelector('.main-title');

let randomDogImg = document.createElement('img');


let breedsName = [];
let breedPhoto = [];
let counter = 0;


function getDogNames() {
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {

            let firstBreed = '';
            for(const key in data.message){
                breedsName.push(key);
                addDogList(key);
                firstBreed = key;
                title.innerText = `Random ${firstBreed} photos`
            }
            renderDogImage(firstBreed);
            
        });
}

getDogNames()

function addDogList(unique) {
    let dogBtn = document.createElement('button');
    dogBtn.classList.add('breed-button');
    dogBtn.innerText = unique;

    dogBtn.addEventListener('click', function(){

        const rasaDeCaine = this.innerText;
        title.innerText = `Random ${this.innerText} photos`;
        renderDogImage(rasaDeCaine);
    });
    
    dogList.appendChild(dogBtn)

}


function renderDogImage(breed) {
    fetch(`https://dog.ceo/api/breed/${breed}/images`)
        .then(response => response.json())
        .then(data => {
            counter = 0;
            randomDogImg.src = data.message[counter];
            dogImage.appendChild(randomDogImg)
            
            breedPhoto = data.message;                     
        }); 
    }

    previousBtn.addEventListener('click',function(){
        if(counter > 0){
            counter--;
            randomDogImg.src = breedPhoto[counter];
        }
    });

    nextBtn.addEventListener('click',function(){
        if(counter >= breedPhoto.length -1){
            randomDogImg.src = breedPhoto[breedPhoto.length -1]
        }else{

            counter++;
            randomDogImg.src = breedPhoto[counter];
        }
    })
    
