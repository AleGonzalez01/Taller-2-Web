
  const db = firebase.firestore();

  const productsRef = db.collection('products');

const productsList = document.querySelector('.productslist');

var storageRef = firebase.storage().ref();
var imagePaths = [];

//Aqui es donde agregamos un producto



const form = document.querySelector('.form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
  
   
    const newProduct = {
      name: form.name.value,
      price: form.price.value,
      img: form.image.value,
      descrip: form.descrip.value,
      category: form.category.value,
      storageImgs: imagePaths,
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
  
      const url = `detalles.html?${elem.id}-${elem.name}`;
    //newProduct.setAttribute('href', url);
    
      newProduct.innerHTML = `
      <a class="product__a" href="${url}">
      <img class="product__img" src="${elem.img}" alt="">
      <div class="product__info">
        <h3 class="product__name">${elem.name}</h3>
        <p class="product__price">$ ${elem.price}</p>
        <p class="product__descrip">${elem.descrip}</p>
        <p class="product__category">${elem.category}</p>
        </div>
        </a>
        <div class="product__btns">
        <button class="product__delete hidden showadmin">Eliminar</button>
      <button class="product__edit hidden showadmin">Editar</button>
      </div>
        
      
      `;

      if(elem.storageImgs) {
        elem.storageImgs.forEach(function(imageRef) {
          storageRef.child(imageRef).getDownloadURL().then(function(url) {
            // Or inserted into an <img> element:
            var img = newProduct.querySelector('img');
            img.src = url;
          }).catch(function(error) {
            // Handle any errors
          });
        })
      }

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
      form.image.value = elem.img;
      form.price.value = elem.price;
      form.descrip.value = elem.descrip;
      form.category.value = elem.value;
      selectedItem = elem;
    });

    if(userInfo && userInfo.admin) {
      deleteBtn.classList.remove('hidden');
      editBtn.classList.remove('hidden');
    }

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

  

  const images = form.querySelectorAll('.form__imginput');
images.forEach(function(group, index) {
  const input = group.querySelector('input');
  const img = group.querySelector('img');
  input.addEventListener('change', function () {
  
    // Create a reference to 'mountains.jpg'
    var newImageRef = storageRef.child(`products/${Math.floor(Math.random()*999999999)}.jpg`);
  
    var file = input.files[0]; // use the Blob or File API
  
    var reader = new FileReader();
    reader.readAsDataURL(file); // convert to base64 string
    reader.onload = function(e) {
      img.src = e.target.result;
    }
  
    newImageRef.put(file).then(function(snapshot) {
      console.log(snapshot)
      console.log('Uploaded a blob or file!');
      imagePaths[index] = snapshot.metadata.fullPath;
    });
  });
});
  
  // render inicial con todos los productos
  getProducts();
  


