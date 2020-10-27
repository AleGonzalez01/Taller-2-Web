const btns = document.querySelectorAll('.interaction__buttons .buttons');
const image = document.querySelector('.interaction__image');
const logo = document.querySelector('.navegation__image');
const btn = document.querySelector('.navegation__sections button');

logo.addEventListener('click', function (){
  window.location.href='/index.html';
})

btn.addEventListener('click', function (){
  window.location.href='/htmls/registrarse.html';
})

btns.forEach(function(btn){

    btn.addEventListener('click', function(){
        btn.classList.toggle("buttons--blacks");
        let name = "";
        btns.forEach(function(b){
            name += b.classList.contains("buttons--blacks");
        })
        console.log(name);
        image.style.backgroundImage = 'url(./imagenes/'+name+'.png)';
    })
})


const gallery = document.querySelector('.gallery__background');
const galleryStripe = document.querySelector('.gallery__stripe');
const right = document.querySelector('.gallery__right');
const left = document.querySelector('.gallery__left');
let current = 0;


right.addEventListener('click', function () {
    current++;
    if(current >= galleryStripe.children.length) {
      current = 0;
    }
    const width = gallery.clientWidth;
    galleryStripe.style.transform = 'translate(-' + (width * current) + 'px, 0px)';
  });

left.addEventListener('click', function () {
  current--;

  if(current < 0 ) {
    current = galleryStripe.children.length-1;
  }


  const width = gallery.clientWidth;
  galleryStripe.style.transform = 'translate(-' + (width * current) + 'px, 0px)';
});





