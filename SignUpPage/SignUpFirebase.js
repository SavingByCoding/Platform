var provider = new firebase.auth.GoogleAuthProvider();

GoogleSignUp=()=> {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        console.log("works");
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        db.collection('users').doc(userID).get() //Checks if the Document Exists
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    CreateAccountInDB(); //Creates an account for the user in the DB
                    AllocateSpaceInDB(); //Allocates Project Space for the User
                }
            });


        // ...
    }).catch(function (error) {

    });
};


RegularSignUp=()=>{
    let email= document.getElementById('username').value;
    let password= document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });

};
SignOut=()=>{
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
}

