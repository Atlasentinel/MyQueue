const input = document.querySelector("input");
const counter = document.querySelector(".count");

const maxLength = input.getAttribute("maxlength");

input.addEventListener("input", (event) => {
  const valueLength = event.target.value.length;
  const leftCharLength = maxLength - valueLength;

  if (leftCharLength < 0) return;
  counter.innerHTML = leftCharLength;
});



var modal = document.querySelector(".Update");

var popup = document.querySelector(".popup");

var close = document.querySelector(".closepup");

modal.addEventListener('click', openModal);

close.addEventListener('click', openModal);

popup.style.display ="none";

function openModal(){
  
  if(popup.style.display == "none"){
  popup.style.display = "block";
  popup.style.animation = 'fading  0.2s';
  }else{
    
  popup.style.animation = 'fadiout 0.2s';
  popup.style.display = "none";
  
  }


  
}