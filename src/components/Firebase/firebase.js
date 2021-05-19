import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCGNKDdH_bkD007Dugz3L-62A-UF5yz-4U",
    authDomain: "mcuquiz-21d0c.firebaseapp.com",
    projectId: "mcuquiz-21d0c",
    storageBucket: "mcuquiz-21d0c.appspot.com",
    messagingSenderId: "396311008147",
    appId: "1:396311008147:web:2ebc104a36ee77ab1c4e66",
    measurementId: "G-G2T0DB4YZV"
  };

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }

    //inscription
    signUpUser = (email,password) => 
    this.auth.createUserWithEmailAndPassword(email,password);

    //connexion
    loginUser = (email,password) =>
    this.auth.signInWithEmailAndPassword(email,password);

    //deconnexion
    signOutUser = () =>
    this.auth.signOut();
}

export default Firebase;