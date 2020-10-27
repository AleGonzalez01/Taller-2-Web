
  const db = firebase.firestore();

  const productsRef = db.collection('products');

const productsList = document.querySelector('.productslist');

//Aqui es donde agregamos un producto
const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const newProduct = {
    name: form.name.value,
    price: form.price.value,
    img: form.image.value,
    descrip: form.descrip.value
   
  };

  productsRef // referencia de la colección
  .add(newProduct) // cree un nuevo elemento en la colección
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      getProducts();
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
});

// creación de nuevos productos a partir de la lista
function renderProducts (list) {
    productsList.innerHTML = '';
    list.forEach(function (elem) {
      const newProduct = document.createElement('article');
      newProduct.classList.add('product');
  
      newProduct.innerHTML = `
      <img class="product__img" src="${elem.img}" alt="">
      <div class="product__info">
        <h3 class="product__name">${elem.name}</h3>
        <p class="product__price">$ ${elem.price}</p>
        <p class="product__descrip">${elem.descrip}</p>
        </div>
        <div class="product__btns">
        <button class="product__delete">Eliminar</button>
      <button class="product__edit">Editar</button>
      </div>
        
      
      `;

      // seleccionamos el botón "Eliminar" que se acaba de crear en este elemento
    const deleteBtn = newProduct.querySelector('.product__delete');
    deleteBtn.addEventListener('click',function(){
      productsRef // referencia de la colección
      .doc(elem.id) // referencia de un documento específico en esa colección
      .delete() // elimine el documento asociado a esa referencia
      .then(function() {
        // debería entrar si todo sale bien
        console.log("Document successfully deleted!");
        getProducts(); // traiga los productos cuando estemos seguros de que ya eliminó el que le dijimos
      })
      .catch(function(error) {
        // debería entrar si ocurre algún error
        console.error("Error removing document: ", error);
      });
    });

    // seleccionar el botón de editar
    // al hacer click al botón de editar
    const editBtn = newProduct.querySelector('.product__edit');
    editBtn.addEventListener('click', function() {
      form.name.value = elem.name;
    });

    productsList.appendChild(newProduct);
  });
}


function getProducts(){
    productsRef  // referencia de la colección
    .get() // pide todos los documentos de la colección
    .then((querySnapshot) => {
      const objects = [];
      querySnapshot.forEach((doc) => {
          const obj = doc.data();
          obj.id = doc.id;
          objects.push(obj);
          console.log(`${doc.id} => ${doc.data()}`);
      });
      renderProducts(objects);
    });
  }
  
  // render inicial con todos los productos
  getProducts();
  


const btns = document.querySelectorAll('.admin__buttons .buttons');

btns.forEach(function(btn){

    btn.addEventListener('click', function(){
        btn.classList.toggle("buttons--blacks");
    })
})