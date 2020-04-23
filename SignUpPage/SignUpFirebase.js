var provider = new firebase.auth.GoogleAuthProvider();
var firebaseConfig = {
    apiKey: "AIzaSyCKzKvzgyg6mhOw11DH4R2VAGeCWT1rAuU",
    authDomain: "savingbycoding-222b6.firebaseapp.com",
    databaseURL: "https://savingbycoding-222b6.firebaseio.com",
    projectId: "savingbycoding-222b6",
    storageBucket: "savingbycoding-222b6.appspot.com",
    messagingSenderId: "881760339308",
    appId: "1:881760339308:web:9f91a36ad42928ff4e5f49",
    measurementId: "G-PTGHQ5MEFQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

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