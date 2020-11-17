const logo = document.querySelector('.navegation__image');
const btn = document.querySelector('.navegation__sections button');

logo.addEventListener('click', function (){
  console.log("Buenas");
    window.location.href='/taller-2-Web/';
  })
  
  btn.addEventListener('click', function (){
    console.log("Hola");
    window.location.href='/Taller-2-Web/htmls/registrarse.html';
  })