    const db = firebase.firestore();

    const productsRef = db.collection('products');

    const productsList = document.querySelector('.productslist');

    var storageRef = firebase.storage().ref();
    
    function renderProducts (list) {
        productsList.innerHTML = '';
        list.forEach(function (elem) {
          const newProduct = document.createElement('article');
          newProduct.classList.add('product');
      
          const url = `detalles.html?${elem.id}-${elem.name}`;
       // newProduct.setAttribute('href', url);
        
          newProduct.innerHTML = `
          <a class="product__a" href="${url}">
          <img class="product__img" src="${elem.img}" alt="">
          <div class="product__info">
            <h3 class="product__name">${elem.name}</h3>
            <p class="product__price">$ ${elem.price}</p>
            </div>
            </a>
            <div class="product__btns">
            <button class="buttons product__car">Agregar al carrito</button>
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
        productsList.appendChild(newProduct);

        const carbtn = newProduct.querySelector('.product__car');
        carbtn.addEventListener('click',function(){
    
          //Va el carritoooo
    
        });
      });


     
    }
    
    

let objectsList = [];

console.log(window.location.pathname)
    if (window.location.href.indexOf("ListaConsola") > -1 ) {
        console.log("buenas");
      productsRef.where("category", "==", "Consolas")
      .get()
      .then(function(querySnapshot) {
        objectsList = [];
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              const obj = doc.data();
              obj.id = doc.id;
              objectsList.push(obj);
              //console.log(${doc.id} => ${doc.data()});
          });
          renderProducts(objectsList);
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
    }else if (window.location.href.indexOf("ListaJuegos") > -1    ) {
      console.log("buenas");
      productsRef.where("category", "==", "Juegos")
      .get()
      .then(function(querySnapshot) {
        objectsList = [];
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              const obj = doc.data();
              obj.id = doc.id;
              objectsList.push(obj);
              //console.log(${doc.id} => ${doc.data()});
          });
          renderProducts(objectsList);
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  
    } else if (window.location.href.indexOf("ListaAccesorios") > -1    ) {
      productsRef.where("category", "==", "Accesorios")
      .get()
      .then(function(querySnapshot) {
        objectsList = [];
          querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
              const obj = doc.data();
              obj.id = doc.id;
              objectsList.push(obj);
              //console.log(${doc.id} => ${doc.data()});
          });
          renderProducts(objectsList);
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  
      
    }
    
    const filterForm = document.querySelector('.filterform');
filterForm.addEventListener('input', function() {

  let copy = objectsList.slice();

  const order = filterForm.order.value;
  switch(order){
    case 'price_asc':
      copy.sort(function(a, b){
        return a.price - b.price;
      });
      break;
    case 'price_desc':
      copy.sort(function(a, b){
        return b.price - a.price;
      });
      break;
      case 'price_alpha':
      copy.sort(function(a, b){
        return b.name - a.name;
      });
      break;
  }
  const nameFilter = filterForm.name.value;
  if(nameFilter != '') {
    copy = copy.filter(function(elem){
      if(elem.name.toLowerCase().includes(nameFilter)) {
        return true;
      }
      return false;
    });
  }

  const price = filterForm.price.value;
  if(price) {
    copy = copy.filter(function(elem) {
      if(elem.price < parseInt(price)) {
        return true;
      }
    });
  }

  renderProducts(copy);
});
    
