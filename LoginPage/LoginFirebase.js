// Your web app's Firebase configuration
$(document).ready(function () {
var provider = new firebase.auth.GoogleAuthProvider();
GoogleSignIn=()=>{
    firebase.auth().signInWithPopup(provider).then(function(result) {
        console.log("works");
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("id from login"+  user.uid);
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
});


SignOut=()=>{
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
};
