let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  //get toys for site
  const configGET ={
    method:"GET", 
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json",
    }
  }
  function refreshPage(){
    
    document.getElementById('toy-collection').innerHTML = "";
    // document.getElementsByClassName('input-text')[0].inp;
  fetch('http://localhost:3000/toys', configGET)
  .then(function(response){
    return response.json()
  })
  .then(data=>{data.forEach(image=>renderImages(image))})
  }
  //add new toy to site

const addToys = document.querySelector('.submit');
addToys.addEventListener('click', (event)=>{
  event.preventDefault();
  let name = document.getElementsByClassName('input-text')[0].value;
  let image = document.getElementsByClassName('input-text')[1].value;

  fetch('http://localhost:3000/toys', {
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      name:name,
      image:image,
      likes:0
    })
  });
  name.innerText = "";
  image.innerText = "";
  name.value="";
  image.value = "";
  refreshPage();
});


//create info holders
function renderImages(data){
  
  //create toy containers
  const container = document.getElementById('toy-collection');
  const div = document.createElement('div');
  div.className = "card"
  container.appendChild(div);

  //add h2 with name
  const name = document.createElement('h2');
  name.innerHTML = data.name;
  div.appendChild(name);
  

  //add img tag with src of attibute and class name 'toy-avatar'
  const img = document.createElement('img');
  img.className = 'toy-avatar';
  img.src = data.image;
  div.appendChild(img);
  

  // add p tag with likes number
  const p = document.createElement('p');
  p.innerText = `${data.likes} LIKES`;
  div.appendChild(p);
  

  // add button with id attribute set to toy's id #
  const button = document.createElement('button');
  button.setAttribute('class', 'like-btn');
  button.setAttribute('id', data.id);
  button.innerText = "Click To Like"
  div.appendChild(button);
  button.addEventListener('click', (event)=>{
    
    data.likes = parseInt(data.likes) + 1;
    fetch(`http://localhost:3000/toys/${data.id}`,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    })
    refreshPage();
    //document.getElementClassName('input-text').reset();
  })

}
refreshPage();


document.getElementById('form').reset();
}
)