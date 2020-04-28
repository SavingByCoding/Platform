var provider = new firebase.auth.GoogleAuthProvider();
var firebaseConfig = {
    apiKey: "AIzaSyBOn9KJJihPr0F0zXNcj_tlHn6tGgxIsMI",
    authDomain: "saving-by-coding.firebaseapp.com",
    databaseURL: "https://saving-by-coding.firebaseio.com",
    projectId: "saving-by-coding",
    storageBucket: "saving-by-coding.appspot.com",
    messagingSenderId: "1001321494305",
    appId: "1:1001321494305:web:7261fc3516fd79bc557060",
    measurementId: "G-GLKDW56H9N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

GoogleSignUp=()=> {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        console.log("works");
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

RegularSignUp=()=>{
    let email= document.getElementById('username').value;
    console.log(email);
    let password= document.getElementById('password').value;
    console.log(password);

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        console.log("hello");
        // Handle Errors here.
        console.log(email);
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
    });
    console.log(firebase.auth().credentials);
};

SignOut=()=>{
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}