// firebase.initializeApp({
//     apiKey: "AIzaSyBOn9KJJihPr0F0zXNcj_tlHn6tGgxIsMI",
//     authDomain: "saving-by-coding.firebaseapp.com",
//     databaseURL: "https://saving-by-coding.firebaseio.com",
//     projectId: "saving-by-coding",
//     storageBucket: "saving-by-coding.appspot.com",
//     messagingSenderId: "1001321494305",
//     appId: "1:1001321494305:web:7261fc3516fd79bc557060",
//     measurementId: "G-GLKDW56H9N"
// })
// firebase.analytics()
//
// var db = firebase.firestore()

Date.prototype.addDays = (days) => {
    this.setDate(this.getDate() + parseInt(days));
    return this;
}
var name;
var emailAddress;
var phoneNumber;
var userID;
mainMod.controller('MainContentController', ($scope) => {
    // Data is static for now,
    $scope.groups = []
    $scope.events = []
    $scope.announcements = []
    $scope.user = {}
    $scope.userId = "ABC"; // TODO GET ID FROM FIREBASE AUTH


    var UserInfo = db.collection('users').doc($scope.userId);
    userID=$scope.userId;
    let getUserinfo = UserInfo.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', doc.data());
                Username =doc.data(); //Loads all UUID for all project
                $scope.name =Username.name;

            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });


    $scope.getGroups = () => {
        db.collection('groups')
            .where('users', 'array-contains', $scope.userId)
            .get()
            .then((qs) => {
                qs.forEach((doc) => {
                    let group = {id: doc.id}
                    Object.assign(group, doc.data())
                    $scope.groups.push(group)
                })
                console.log($scope.groups)
            })
            .then(() => {
                $scope.$apply()

                $scope.getEvents()
            })
    }


    $scope.getEvents = () => {
        const lastI = Math.ceil($scope.groups.length / 10)
        let iterationsLoaded = 0

        let now = new Date()
        now.setTime(new Date().getTime() - 3600000) // displays notification for an hour
        let threeWeeksLater = new Date();
        threeWeeksLater.setTime(new Date().getTime() + 1209600000) //displays only for two weeks

        for (let i = 0; i < lastI; i++) {
            let groupSubset = $scope.groups.slice(
                i*10,
                (i+1 == lastI) ? $scope.groups.length : (i*10)+10
            )
            let groupIds = groupSubset.map(group => group.id)

            db.collection('events')
                .where('groups', 'array-contains-any', groupIds)
                .where('time', '>=', now)
                .where('time', '<=', threeWeeksLater)
                .get()
                .then((qs) => {
                    console.log("qs.docs.length = " + qs.docs.length)
                    qs.forEach((doc) => {
                        let _event = {id: doc.id}
                        Object.assign(_event, doc.data())
                        $scope.events.push(_event)
                    })
                    iterationsLoaded++
                    if (iterationsLoaded == lastI) {
                        $scope.events.sort((a, b) => a.time.seconds - b.time.seconds)
                        $scope.generateAnnouncements()
                        $scope.$apply()
                    }
                })
        }
    }

    $scope.generateAnnouncements = () => {
        for (let _event of $scope.events) {
            let now = new Date()
            console.log(now)
            now.setTime(_event.time.seconds * 1000)
            console.log(now)
            const millisecDiff = parseInt(_event.time.seconds) - (new Date().getTime() / 1000)
            if (millisecDiff <= 259200000) { // Event within 3 days
                $scope.announcements.push(
                    `You have the event "${_event.name}" in ${Math.round(millisecDiff/3600)} hours!`
                )
            }
        }
    }

    $scope.toDate = (timeObj) => {
        var t = new Date(timeObj.seconds *1000);
        // t.setSeconds(timeObj.seconds)
        return t
    }

    $scope.getLoggedInUser = () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                $scope.userId = user.uid;
                $("#ProfilePicture").attr("src", user.photoURL);
                db.collection("users")
                    .where("userId", "==", $scope.userId)
                    .get()
                    .then((qs) => {
                        let doc = qs.docs[0]
                        let user = {id: doc.id}
                        Object.assign(user, doc.data())
                        $scope.user = user
                    });
                LOAD_ON_STARTUP()
            }
        });
    }

    $scope.redirectToLink = (url) => {
        window.location.href = url
    }

    // On startup
    $scope.getLoggedInUser()

    const LOAD_ON_STARTUP = () => {
        $scope.getGroups()
        $scope.getRegisteredCourses();
    }

    $scope.registeredCourses=[];
    $scope.getRegisteredCourses= function(){
        db.collection("registrations").where("userId", "==", userID)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // console.log("hello")
                    // console.log($scope.registeredCourses);
                    // doc.data() is never undefined for query doc snapshots
                    $scope.registeredCourses.push(doc.data().CourseName);
                    $scope.$apply();
                });
                if( $scope.registeredCourses.length !=0){
                    $("#RegisterNowInCourses").hide();
                }

            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
    }



    $scope.displayEditProfileInformation= function(){
        var docRef = db.collection("users").doc($scope.userId);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                emailAddress= doc.data().email;
                name= doc.data().name;
                phoneNumber= doc.data().phoneNumber;
                $("#email").val(emailAddress);
                $("#fname").val(name);
                $("#phone").val(phoneNumber);



            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    }
    // $scope.updateProfileInformation = function(){
    //     emailAddress= $("#email").val();
    //     name= $("#fname").val();
    //     phoneNumber= $("#phone").val();
    //
    //     db.collection("users").doc($scope.userId).update({
    //         name: name,
    //         email: emailAddress,
    //         phoneNumber: phoneNumber
    //     });
    //
    // }

})

updateProfileInformation = function(){ //This was horribly coded my bad, I was having a bad day I used of used angular but I said fuck it - Jeeva
    emailAddress= $("#email").val();
    name= $("#fname").val();
    phoneNumber= $("#phone").val();

    db.collection("users").doc(userID).set({
        name: name,
        email: emailAddress,
        phoneNumber: phoneNumber
    },{ merge: true });

}
