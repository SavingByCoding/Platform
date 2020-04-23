// Your web app's Firebase configuration
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

GoogleSignIn=()=>{
    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log("works");
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
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

RegularLogIn=()=>{
    let email= document.getElementById('username').value;
    let password= document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}


SignOut=()=>{
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}