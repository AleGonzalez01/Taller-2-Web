    const db = firebase.firestore();

    const productsRef = db.collection('products');

    const productsList = document.querySelector('.productslist');

    var storageRef = firebase.storage().ref();
    
    function renderProducts (list) {
        productsList.innerHTML = '';
        list.forEach(function (elem) {
          const newProduct = document.createElement('article');
          newProduct.classList.add('product');
      
          const url = `detalles.html?${elem.id}-${elem.title}`;
        newProduct.setAttribute('href', url);
        
          newProduct.innerHTML = `
          <img class="product__img" src="${elem.img}" alt="">
          <div class="product__info">
            <h3 class="product__name">${elem.name}</h3>
            <p class="product__price">$ ${elem.price}</p>
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
