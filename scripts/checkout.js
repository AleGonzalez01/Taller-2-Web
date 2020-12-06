const db = firebase.firestore();
const carRef = db.collection('car');
const checkOutRef = db.collection('orders');

const formCheckOut = document.querySelector('.check');


let arrayOrders;
formCheckOut.addEventListener('submit', function (event) {
  event.preventDefault();

  const newOrder = {
    name: formCheckOut.name.value,
    dni: Number(formCheckOut.dni.value),
    email: formCheckOut.email.value,
    direction: formCheckOut.direction.value,
    method: form.method.value,

  };


  checkList = {
    ordersInfo: newOrder,
    orders: arrayOrders,
  }

  //arrayOrders.push();
  checkOutRef.add(checkList).then().catch(function (error) {
    console.error("Error adding document: ", error);
  });
})




function getOrders() {
  carRef.doc(userInfo.uid).get().then((doc) => {
    if (doc.exists) {
      arrayOrders = doc.data();//console.log(doc.data().products);
    }
  });
}


var value;


function getTotals() {
  carRef.doc(userInfo.uid).get().then((doc) => {
    if (doc.exists) {
      value = doc.data().productos.reduce(function (previousValue, currentValue) {
        return {
          price: previousValue.price + currentValue.price,
        }
      });
    }
  });
}

function getDelete(){
    carRef.doc(userInfo.uid).delete().then(function () {
      console.log("Document successfully deleted!");
    })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
}

const comprar = document.querySelector('.btn__action');

comprar.addEventListener("click", function(event){
    event.preventDefault();

    const newOrder = {
      name: formCheckOut.name.value,
      dni: Number(formCheckOut.dni.value),
      email: formCheckOut.email.value,
      direction: formCheckOut.direction.value,
      method: formCheckOut.method.value,
  
    };
  
  
    checkList = {
      ordersInfo: newOrder,
      orders: arrayOrders,
    }
  
    //arrayOrders.push();
    checkOutRef.add(checkList).then().catch(function (error) {
      console.error("Error adding document: ", error);
    });

});

