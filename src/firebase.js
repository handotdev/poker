import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAbo4Buo954TtevsmP-KLcMYEWy0L4036k",
    authDomain: "poker-loginless.firebaseapp.com",
    databaseURL: "https://poker-loginless.firebaseio.com",
    projectId: "poker-loginless",
    storageBucket: "poker-loginless.appspot.com",
    messagingSenderId: "801107954297",
    appId: "1:801107954297:web:e1b5903f40eb82869722a8",
    measurementId: "G-04PK850D0D"
  };

  firebase.initializeApp(firebaseConfig);
  
  export default firebase;