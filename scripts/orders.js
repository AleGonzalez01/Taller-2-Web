const db = firebase.firestore();
const ordersRef = db.collection('orders');

const ordersListhistorial = document.querySelector('.productslist');

function renderOrders(list) {
    ordersListhistorial.innerHTML = '';
    list.forEach(function (elem, i) {
        const newOrder = document.createElement('article');
        newOrder.classList.add('order__cont');

        newOrder.innerHTML = `
        <div class="order__info">
        <h3 class="order__name">${elem.name}</h3>
        <h3 class="order__name">${elem.email}</h3>
        <h3 class="order__name">${elem.method}</h3>
        </div>
              `;

              ordersListhistorial.appendChild(newOrder);
    });
}

let orderList = [];
function getOrdersInfo() {
    ordersRef.get().then((querySnapshot) => {
        orderList = [];
        querySnapshot.forEach((doc) => {
            const obj = doc.data().ordersInfo;
            orderList.push(obj);
            console.log(`${doc.id} => ${doc.data().ordersInfo}`);
        });
        renderOrders(orderList);
    });
}

getOrdersInfo();