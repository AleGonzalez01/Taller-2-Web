const db = firebase.firestore();
const carRef = db.collection('car');
var storageRef = firebase.storage().ref();

const productsCarList = document.querySelector('.productslist');

function renderCarProducts(list) {
    productsCarList.innerHTML = '';
  list.forEach(function (elem, i) {
    const newCarProduct = document.createElement('article');
    newCarProduct.classList.add('car__cont');

    newCarProduct.innerHTML = `
    <div class="car__info">
      <h3 class="car__name">${elem.name}</h3>
      <p class="car__price">$ ${elem.price}</p>
      </div>
      <div class="car__btn">
      <button class="product__delete detele__car">Eliminar</button>
    </div>
    `;
    
    //Prueba
    carRef.doc(userInfo.uid).get().then((doc) => {
      if (doc.exists) {
        //console.log(doc.data().products);
        var value = doc.data().productos.reduce(function (previousValue, currentValue) {
          return {
            price: previousValue.price + currentValue.price,
          }
        });

        document.querySelector('.product__priceTotal').innerHTML = `<strong>Total: </strong>$${value.price}`;
      }
    });

    //Delete
    const deleteButton = newCarProduct.querySelector('.detele__car');
    deleteButton.addEventListener('click', function () {

    carRef.doc(userInfo.uid).get().then((doc) => {
        if (doc.exists) {
          doc.data().productos.then(function () {
            console.log("Document successfully deleted!");
            getCarProducts();
          });
        }
      });
    });

    productsCarList.appendChild(newCarProduct);
  });
}

let carList = [];
function getCarProducts() {
  carRef.doc(userInfo.uid).get().then((doc) => {
    carList = [];
    if (doc.exists) {
      doc.data().productos.forEach(function (item) {
        carList.push(item);
      });
    }

    renderCarProducts(carList);
  });
}

const comprarUno = document.querySelector('.btn__comprar');

comprarUno.addEventListener("click", function(event){
  window.location.href="/Taller-2-Web/htmls/checkout.html"
});
