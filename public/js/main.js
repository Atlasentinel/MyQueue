const input = document.querySelector("input");
const counter = document.querySelector(".count");

const maxLength = input.getAttribute("maxlength");

input.addEventListener("input", (event) => {
  const valueLength = event.target.value.length;
  const leftCharLength = maxLength - valueLength;

  if (leftCharLength < 0) return;
  counter.innerHTML = leftCharLength;
});


