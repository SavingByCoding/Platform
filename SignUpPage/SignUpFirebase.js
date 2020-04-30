var provider = new firebase.auth.GoogleAuthProvider();

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