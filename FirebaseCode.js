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


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User logged in already or has just logged in.
        userID=user.uid;
    } else {
        // User not logged in or has just logged out.
    }
});