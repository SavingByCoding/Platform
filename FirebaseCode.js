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


function userInit (){
    db.collection('users').doc(userID).get() //Checks if the Document Exists
        .then((docSnapshot) => {
            if (!docSnapshot.exists) {
                console.log("pt 2");
                CreateAccountInDB(); //Creates an account for the user in the DB
                AllocateSpaceInDB(); //Allocates Project Space for the User
            }
        });
}

const generateUUID = () => { // V4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

CreateAccountInDB= () => {
    let data = {
        userId: userID,
        name: document.getElementById("name").value, //Add name from input
        userType: 1,
        dateOfBirth: getCurrentDate(), //Change to Date of Birth from input
        dateJoined: getCurrentDate(),
        isSpaceAllocated: true,
        isAccountCreated: true
    };
    db.collection('users').doc(userID).set(data);
};


AllocateSpaceInDB= () => {
    let project1UUID= generateUUID();
    let project2UUID= generateUUID();
    let project3UUID= generateUUID();
    let project4UUID=generateUUID();
    let project5UUID=generateUUID();
    let project6UUID=generateUUID();
    let project7UUID=generateUUID();
    let project8UUID=generateUUID();
    let project9UUID=generateUUID();
    let project10UUID=generateUUID();

    let projectsuuid= [];
    projectsuuid.push(project1UUID,project2UUID,project3UUID,project4UUID,project5UUID,project6UUID,project7UUID,project8UUID,project9UUID,project10UUID);

    let projects = {
        Project1: project1UUID,
        Project2: project2UUID,
        Project3: project3UUID,
        Project4: project4UUID,
        Project5: project5UUID,
        Project6: project6UUID,
        Project7: project7UUID,
        Project8: project8UUID,
        Project9: project9UUID,
        Project10: project10UUID
    };
    console.log(projectsuuid)
    db.collection('user-projects').doc(userID).set(projects);
    FormatProjects(projectsuuid);



};

function FormatProjects (array){
    let ProjectFormat= {
        code: "",
        langauge:"EMPTY",
        name: "Empty Project"

    };
    array.forEach(function (uuid,index) {
        db.collection('projects').doc(uuid).set(ProjectFormat);
    });
}



getCurrentDate=()=>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
}
