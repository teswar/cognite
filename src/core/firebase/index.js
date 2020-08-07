import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCIZ2yMTbZPbpq3XhD9Gj2Gtd--kvCjuQE",
    authDomain: "messenger-honk.firebaseapp.com",
    databaseURL: "https://messenger-honk.firebaseio.com",
    projectId: "messenger-honk",
    storageBucket: "messenger-honk.appspot.com",
    messagingSenderId: "1052458873827",
    appId: "1:1052458873827:web:861e328d3937fe681f26d6"
};

export const FIREBASE = firebase.initializeApp(firebaseConfig);