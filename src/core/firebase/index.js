import firebase from 'firebase';

/**
 * Firebase connection configs. Need to move to environment...
 */
var firebaseConfig = {
    apiKey: "AIzaSyCIZ2yMTbZPbpq3XhD9Gj2Gtd--kvCjuQE",
    authDomain: "messenger-honk.firebaseapp.com",
    databaseURL: "https://messenger-honk.firebaseio.com",
    projectId: "messenger-honk",
    storageBucket: "messenger-honk.appspot.com",
    messagingSenderId: "1052458873827",
    appId: "1:1052458873827:web:861e328d3937fe681f26d6"
};


/* create a new firebase instance. */
export const FIREBASE = firebase.initializeApp(firebaseConfig);