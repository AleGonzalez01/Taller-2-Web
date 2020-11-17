const perfil = document.querySelector('.perfil');
const name = document.querySelector('.perfil__span');
const info = document.querySelector('.perfil__info');

var userInfo;

firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        const db = firebase.firestore();
      const usersRef = db.collection('users');
      usersRef.doc(user.uid).get().then(function (doc) {
        if(doc.exists) {
          const data = doc.data();
          userInfo = data;
          name.innerText = data.firstname;
          info.innerText=data.email;
        

        if(data.admin) {
          const showAdmin = document.querySelector('.showadmin');
          showAdmin.classList.remove('hidden');

          showAdmin.addEventListener("click", function() {
            window.location.href='/Taller-2-Web/htmls/admin.html';
          });

        
        }
      }
    });
}
});