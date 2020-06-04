var provider = new firebase.auth.GoogleAuthProvider();

var user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function(user){
    if (user) {
        userInit(user.uid);
        console.log(user.uid)//Initializes user if they dont have an account
    } else {

    }
});

// var user = firebase.auth().currentUser;
// userInit(user.uid);
// console.log(user.uid)
// GoogleSignUp=()=> {
//     firebase.auth().signInWithPopup(provider).then(function (result) {
//         console.log("works");
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         var token = result.credential.accessToken;
//         // The signed-in user info.
//         var user = result.user;
//
//         db.collection('users').doc(userID).get() //Checks if the Document Exists
//             .then((docSnapshot) => {
//                 if (docSnapshot.exists) {
//                     CreateAccountInDB(); //Creates an account for the user in the DB
//                     AllocateSpaceInDB(); //Allocates Project Space for the User
//                 }
//             });
//
//         // ...
//     }).catch(function (error) {
//         window.open ('../ProfilePage/profile.html','_self',false);
//     });
// };


// function RegularSignUp(){
//     let email= document.getElementById('email').value;
//     let password= document.getElementById('password').value;
//
//     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//     });
//      window.open ('../ProfilePage/profile.html','_self',false); //LAST STEP AFTER INTIIALIZING NEW USER
// };



