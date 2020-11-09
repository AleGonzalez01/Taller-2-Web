window.addEventListener('load', function () {

    console.log(location.search);
  
    // partimos el location con el separador -
    const parts = location.search.split('-');
    // usamos la primer parte y la limpiamos
    const uid = parts[0].replace('?', '');
  
    // referencia a la base de datos
    const db = firebase.firestore();
    // referencia a la coleción productos
    const productsRef = db.collection('products');
  
    //referencia al producto con el uid específico
    productsRef.doc(uid)
    .get() // traer info de ese producto
    .then(function (snapshot) {
  
      const product = snapshot.data();
  
      const name = document.querySelector('h1');
      name.innerText = product.name;
  
     const image = document.querySelector('.imageproduct');
     image.setAttribute('src', product.img);
      document.querySelector('h2 span').innerText = product.price;
  
      document.querySelector('.details').classList.remove('hidden');
    })
  
    console.log(uid);
  
  });