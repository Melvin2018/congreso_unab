import firebase from 'firebase/app'

require("firebase/auth");
require("firebase/firebase");
require("firebasse/storage");
require("firebase/functions");

var firebaseConfig = {
    apiKey: "AIzaSyD_r-fsHv2vBk35CDUGYqDS_S3e41qON3M",
    authDomain: "congreso-96692.firebaseapp.com",
    databaseURL: "https://congreso-96692.firebaseio.com",
    projectId: "congreso-96692",
    storageBucket: "congreso-96692.appspot.com",
    messagingSenderId: "429946637850",
    appId: "1:429946637850:web:df2091c30c53f1b4bacba3",
    measurementId: "G-XMJ6K257YN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const auth = firebase.auth()
  const db = firbase.firestore()
  const storage = firebase.storage()
  const functions = firebase.functions()


  export {
    firebase,
    auth,
    db,
    storage,
    functions
  }

