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

mainMod.controller('MainContentController', ($scope) => {
    // Data is static for now,
    $scope.groups = []
    $scope.events = []
    $scope.announcements = []
    $scope.user = {}
    $scope.userId = "ABC"; // TODO GET ID FROM FIREBASE AUTH


    var UserInfo = db.collection('users').doc($scope.userId);
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
        let threeWeeksLater = new Date()
        threeWeeksLater.setTime(new Date().getTime() + 1814400000)

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
    }
})
