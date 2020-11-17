const logo = document.querySelector('.navegation__image');
const btn = document.querySelector('.navegation__sections button');

logo.addEventListener('click', function (){
    window.location.href='/';
  })
  
  btn.addEventListener('click', function (){
    console.log("Hola");
    window.location.href='/Taller-2-Web/htmls/registrarse.html';
  })