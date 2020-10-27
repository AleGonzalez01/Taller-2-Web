const auth = document.querySelector('.auth');
const authWith = auth.querySelector('.auth__with');
const authWithout = auth.querySelector('.auth__without');
const authProfileSpan = auth.querySelector('.auth__profile span');
const closebtn = document.querySelector('.navegation__sections button');
const authSignout = auth.querySelector('.auth__signout');

firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada
      authWith.classList.remove('hidden');
      authWithout.classList.add('hidden');
      closebtn.classList.add('hidden');
      auth.classList.remove('hidden');
  
      const db = firebase.firestore();
      const usersRef = db.collection('users');
      usersRef.doc(user.uid).get().then(function (doc) {
        if(doc.exists) {
          const data = doc.data();
          authProfileSpan.innerText = data.firstname;
        }
      });
    } else {
      // si no existe quiere decir que no ha iniciado sesión o acaba de cerrar sesión
      auth.classList.add('hidden');
      authWith.classList.add('hidden');
      authWithout.classList.remove('hidden');
      closebtn.classList.remove('hidden');
    }
  });

  // cerrar sesión
  authSignout.addEventListener('click', function(event) {
    event.preventDefault();
    firebase.auth().signOut();
  });