var userID;
firebase.initializeApp({
    apiKey: "AIzaSyBOn9KJJihPr0F0zXNcj_tlHn6tGgxIsMI",
    authDomain: "saving-by-coding.firebaseapp.com",
    databaseURL: "https://saving-by-coding.firebaseio.com",
    projectId: "saving-by-coding",
    storageBucket: "saving-by-coding.appspot.com",
    messagingSenderId: "1001321494305",
    appId: "1:1001321494305:web:7261fc3516fd79bc557060",
    measurementId: "G-GLKDW56H9N"
});
firebase.analytics();
var db = firebase.firestore();

 // var user = firebase.auth().currentUser;
//  console.log(userID);
//  var signedIn; //Code for sign in sign out
//
// firebase.auth().onAuthStateChanged(function(user){
//     if (user) {
//         tempid = user.uid;
//         userID
//         console.log(userID);
//         signedIn = true;
//         ChangeNavBar();
//         userInit(); //Initializes user if they dont have an account
//     } else {
//         // User not logged in or has just logged out.
//         signedIn = false;
//         ChangeNavBar();
//     }
// });
//
// console.log(userID);
//
// //Functionality to add
// // Create a function that returns a boolean if the user is logged in
// function isUserLoggedIn(){
//     return signedIn
// }
//
// function getUserID(){
//     console.log(userID)
//     return userID;
// }


function SignOut(){
    firebase.auth().signOut().then(function() {
        console.log("sign out works")
    }, function(error) {
        console.log("sign out didnt work")
    });
}

