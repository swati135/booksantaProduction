import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  // apiKey: "AIzaSyASyOjOtJla-X-b3io2eLoaUc_bIRFSIIc",
  // authDomain: "book-santa-app.firebaseapp.com",
  // databaseURL: "https://book-santa-app.firebaseio.com",
  // projectId: "book-santa-app",
  // storageBucket: "book-santa-app.appspot.com",
  // messagingSenderId: "69634746716",
  // appId: "1:69634746716:web:6fbbfc110fb4475365f999",
  // measurementId: "G-DLB7XC0JPL"

  /*********   JISHNU   *************/
  // apiKey: "AIzaSyATtE1aHIL-l53G_4rpKdtLsDr7cfAj0B8",
  // authDomain: "booksanta-d7f05.firebaseapp.com",
  // databaseURL: "https://booksanta-d7f05.firebaseio.com",
  // projectId: "booksanta-d7f05",
  // storageBucket: "booksanta-d7f05.appspot.com",
  // messagingSenderId: "478252789411",
  // appId: "1:478252789411:web:d8414eea606ac136c15916",
  // measurementId: "G-4XJVNGHR3C"


  // /*********   SWATI   *************/
  apiKey: "AIzaSyBKPahVreSMuSpBEqGhQX410ER4KNXNWgo",
  authDomain: "book-santa-jishnu-8dc1f.firebaseapp.com",
  databaseURL: "https://book-santa-jishnu-8dc1f.firebaseio.com",
  projectId: "book-santa-jishnu-8dc1f",
  storageBucket: "book-santa-jishnu-8dc1f.appspot.com",
  messagingSenderId: "60101140316",
  appId: "1:60101140316:web:b456663f5f978e47f32b99",
  measurementId: "G-1K9HWB2FE4"
};


// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
