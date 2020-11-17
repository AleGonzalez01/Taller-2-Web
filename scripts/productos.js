
window.addEventListener('load', function () {

  // partimos el location con el separador -
  const parts = location.search.split('-');
  // usamos la primer parte y la limpiamos
  const uid = parts[0].replace('?', '');

   // referencia a la base de datos
 const db = firebase.firestore();
 // referencia a la coleción productos
 const productsRef = db.collection('products');
 const carFeo = db.collection('car');

   
 let arregloFeo = [];
 var storageRef = firebase.storage().ref();


  //referencia al producto con el uid específico
  productsRef.doc(uid)
    .get() // traer info de ese producto
    .then(function (snapshot) {

      const product = snapshot.data();
      const img1 = document.querySelector('.details__images1');
      const img2 = document.querySelector('.details__images2');
      const img3 = document.querySelector('.details__images3');
      const thumbs = document.querySelectorAll('.details__images img');
      const imageProduct = document.querySelector('.imageproduct');

      const productName = document.querySelector('h1');
      productName.innerText = product.name;

      const detail = document.querySelector('p');
      detail.innerText = product.descrip;


      imageProduct.setAttribute('src', product.img);
      document.querySelector('h2 span').innerText = "$ " + product.price;

      document.querySelector('.details').classList.remove('hidden');

      if (product.storageImgs && product.storageImgs.length > 0) {
        storageRef.child(product.storageImgs[0]).getDownloadURL().then(function (url) {
          img1.src = url;
          imageProduct.src = url;
        }).catch(function (error) {
          // Handle any errors
        });

        storageRef.child(product.storageImgs[1]).getDownloadURL().then(function (url) {
          img2.src = url;
        }).catch(function (error) {
          // Handle any errors
        });

        storageRef.child(product.storageImgs[2]).getDownloadURL().then(function (url) {
          img3.src = url;
        }).catch(function (error) {
          // Handle any errors
        });
      }

      function galleryHandle(event) {
        const src = event.target.getAttribute('src');
        imageProduct.setAttribute('src', src);
      }

      thumbs.forEach(function (elem, index) {
        elem.addEventListener('click', galleryHandle);
      });

      const agregar = document.querySelector('.details__btn');

      
      function carList(feo){
        arregloFeo=feo;
        if(userInfo){
          const shopcar ={
            name: product.name,
            price: Number(product.price)
          }
          arregloFeo.push(shopcar);
          shopcar2= {
            productos:arregloFeo
          }
          carFeo.doc(userInfo.uid).set(shopcar2).catch(function(error){
            console.log("hola: ", error);
          });
        }

      }

      function getCar(){
        carFeo.doc(userInfo.uid).get().then((doc)=> {
          if(doc.exists && doc.data().productos != undefined){
            arregloFeo= doc.data().productos;
            shopcar2=doc.data().productos;
            carList(arregloFeo);
          }else if(doc.exists && doc.data().productos != undefined){
            carList(arregloFeo);
          }else if(!doc.exists){
            carList(arregloFeo);
          }
        })
      }

      agregar.addEventListener('click',function(){
        getCar();
  
      });
    });

});


