// Creo las variables para cada elemento de html
let windowsScreen = window.matchMedia("(max-width: 800px)");
console.log(windowsScreen);
let slideIndex = 0;
let icon = document.querySelector(".icon");
let list = document.querySelector(".list");
let overlay = document.querySelector(".overlay");
let parent = document.querySelector(".reviews-profiles");
let slider = document.querySelector(".slider");
let sliderNodes = document.querySelectorAll(".slider .card");
let sliderNode = document.querySelector(".slider .card");
let listNodes = document.querySelectorAll(".bullets li");
let pressed = false;
let x;
let input = document.querySelector("form .text");
let submit = document.querySelector(".submit");
let form = document.querySelector("form");
let size = sliderNode.clientWidth;

// Si se clickea sobre el icono de hamburguesa, entonces produce el siguiente efecto
icon.addEventListener("click", () => {
  if (icon.getAttribute("src") === "./images/icon-hamburger.svg") {
    // Deja los elementos en el medio del eje horizontal
    list.style.left = "50%";
    overlay.style.top = "0%";
    icon.setAttribute("src", "./images/icon-close.svg");
  } else {
    list.style.left = "-50%";
    icon.setAttribute("src", "./images/icon-hamburger.svg");
    overlay.style.top = "-100%";
  }
});

function showSlides() {
  if (windowsScreen.matches) {
    let i;
    let slides = document.getElementsByClassName("card");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 5000);
    // Cambia las imagenes cada 5 segundos
  }
}

if (!windowsScreen.matches) {
  // Mover las cartas de las personas
  parent.addEventListener("mousedown", (e) => {
    pressed = true;
    x = e.offsetX - slider.offsetLeft;
    parent.style.cursor = "grabbing";
  });

  parent.addEventListener("mouseenter", () => {
    parent.style.cursor = "grab";
  });

  parent.addEventListener("mouseup", () => {
    parent.style.cursor = "grab";
  });

  window.addEventListener("mouseup", () => {
    pressed = false;
  });

  parent.addEventListener("mousemove", (e) => {
    if (!pressed) return;
    e.preventDefault();
    slider.style.left = `${e.offsetX - x}px`;
    posChecker();
  });
}

function posChecker() {
  let sliderPos = slider.getBoundingClientRect();
  let parentPos = parent.getBoundingClientRect();
  if (parseInt(slider.style.left) > 0) {
    slider.style.left = "0px";
  } else if (sliderPos.right < parentPos.right) {
    slider.style.left = `-${sliderPos.width - parentPos.width}px`;
  }
}

listNodes.forEach((element, i) => {
  element.addEventListener("click", (e) => {
    listNodes.forEach((element) => {
      element.classList.remove("active");
    });
    console.log(i);
    e.currentTarget.classList.add("active");
  });
});

// Si el email ingresado no cumple los requisitos, lanza el erro
submit.addEventListener("click", (e) => {
  e.preventDefault();
  let val = input.value;
  if (val === "") {
    form.classList.add("error");
  } else if (!val.includes("@")) {
    form.classList.add("error");
  } else if (val.slice(val.indexOf("@") + 1) === "") {
    form.classList.add("error");
  } else {
    form.classList.remove("error");
  }
});

showSlides();


// Actualiza la pagina cada vez que se reescale la misma
window.addEventListener('resize', function () { 
  "use strict";
  window.location.reload(); 
});
