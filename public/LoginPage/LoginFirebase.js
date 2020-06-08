// Your web app's Firebase configuration
var provider = new firebase.auth.GoogleAuthProvider();
var id;
let email;
let FullName;
let ProfilePicURL;
GoogleSignIn=()=> {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        id=user.uid
        email= user.email;
        FullName=user.displayName;
        ProfilePicURL= user.photoURL;
        userInit(id,function () {
            setTimeout(function(){window.location='../ProfilePage/profile.html'}, 2000)
            // window.open ('../ProfilePage/profile.html','_self',false);
            // console.log("here")
        });
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


function userInit (id,callback1){
    db.collection('users').doc(id).get() //Checks if the Document Exists
        .then((docSnapshot) => {
            if (!docSnapshot.exists) {
                CreateAccountInDB(id,AllocateSpaceInDB); //Creates an account for the user in the DB
                //AllocateSpaceInDB(id); //Allocates Project Space for the User
            }
        });
    callback1();
}

// const generateUUID = () => { // V4
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
//         var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
//         return v.toString(16)
//     })
// }

CreateAccountInDB= (id,callback2) => {
    let data = {
        userId: id,
        email: email,
        name: FullName, //Add name from input
        userType: 1,
        profilepictureURL: ProfilePicURL, //Change to Date of Birth from input
        dateJoined: getCurrentDate(),
        isRegistered: false,
        isSpaceAllocated: true,
        isAccountCreated: false
    };
    db.collection('users').doc(id).set(data);
    callback2(id);
};


AllocateSpaceInDB= (id) => {
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
    db.collection('user-projects').doc(id).set(projects);
    FormatProjects(projectsuuid);

};

function FormatProjects (array){
    let ProjectFormat= {
        code: "",
        language:"EMPTY",
        name: "Empty Project"

    };
    array.forEach(function (uuid,index) {
        db.collection('projects').doc(uuid).set(ProjectFormat);
    });
    //window.open ('../ProfilePage/profile.html','_self',false);
}


//
// getCurrentDate=()=>{
//     var today = new Date();
//     var dd = String(today.getDate()).padStart(2, '0');
//     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yyyy = today.getFullYear();
//
//     return mm + '/' + dd + '/' + yyyy;
// }



// RegularLogIn=()=>{
//     let email= document.getElementById('username').value;
//     let password= document.getElementById('password').value;
//     firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         console.log(errorCode);
//         console.log(errorMessage);
//         // ...
//     });
//     //window.open ('../ProfilePage/profile.html','_self',false);
// }

SignOut=()=>{
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }).catch(function (error) {
        // An error happened.
    });
};
