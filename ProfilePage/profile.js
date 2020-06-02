firebase.initializeApp({
    apiKey: "AIzaSyBOn9KJJihPr0F0zXNcj_tlHn6tGgxIsMI",
    authDomain: "saving-by-coding.firebaseapp.com",
    databaseURL: "https://saving-by-coding.firebaseio.com",
    projectId: "saving-by-coding",
    storageBucket: "saving-by-coding.appspot.com",
    messagingSenderId: "1001321494305",
    appId: "1:1001321494305:web:7261fc3516fd79bc557060",
    measurementId: "G-GLKDW56H9N"
})
firebase.analytics()

var db = firebase.firestore()

mainMod.controller('MainContentController', ($scope) => {
    // Data is static for now,
    $scope.groups = []
    $scope.events = [ // TODO REMOVE STATIC DATA
        {"id":"I7Nt11aTTtrhJOnTAxFN","groups":["iTFed79fKFvoy2dl494N"],"name":"U1 L3 Python Dev Webinar","archived":true,"description":"In this call, we will go over arithmetic operations in Python. We will also discusss how to undergo Python development!","time":{"seconds":1587153600,"nanoseconds":0},"link":"https://www.google.com/"},
        {"id":"2e633c63-e5d3-4999-8c3a-dfcaa09660ee","archived":true,"description":"This is the last call for your cohort. Hope you had fun learning Python!","link":"https://google.com","time":{"seconds":1587232800,"nanoseconds":0},"groups":[],"name":"Last Call for Cohort 2"},
        {"id":"ed79c696-c247-46b7-809a-2d3b23a3909c","archived":true,"description":"We hope you had a great time learning Python with us!","time":{"seconds":1587338100,"nanoseconds":0},"link":"https://google.com","groups":[],"name":"Last Call for Cohort 3"},
        {"id":"74d61a8f-86ea-4183-bd31-209be992cdf2","archived":true,"description":"Welcome! We will teach you about our organization's mission.","link":"https://google.com","time":{"seconds":1587776400,"nanoseconds":0},"groups":[],"name":"Intro Call"},
        {"id":"e63d1714-537e-439a-831b-429e9f5de4c5","description":"We introduce you to Codeology here","time":{"seconds":1591311600,"nanoseconds":0},"link":"https://www.google.com/","groups":[],"name":"Welcome to Codeology","archived":false}
    ]
    $scope.announcements = []

    $scope.userId =  // TODO GET ID FROM FIREBASE AUTH

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
            })
            .then(() => {
                $scope.$apply()
                $scope.getEvents()
            })
    }

    $scope.getEvents = () => {
        const lastI = Math.ceil($scope.groups.length / 10)
        let iterationsLoaded = 0
        for (let i = 0; i < lastI; i++) {
            let groupSubset = $scope.groups.slice(
                i*10,
                (i+1 == lastI) ? $scope.groups.length : (i*10)+10
            )
            let groupIds = groupSubset.map(group => group.id)
            db.collection('events')
                .where('groups', 'array-contains-any', groupIds)
                .get()
                .then((qs) => {
                    qs.forEach((doc) => {
                        let _event = {id: doc.id}
                        Object.assign(_event, doc.data())
                        $scope.events.push(_event)
                    })
                    iterationsLoaded++
                    if (iterationsLoaded+1 == lastI) {
                        $scope.events.sort((a, b) => b.time.seconds - a.time.seconds)
                        if ($scope.events.length > 5) {
                            $scope.events = $scope.events.slice(0, 5)
                        }
                        $scope.$apply()
                    }
                })
        }
    }

    $scope.toDate = (timeObj) => {
        let t = new Date(1970, 0, 1)
        t.setSeconds(timeObj.seconds)
        return t
    }

    // On startup
    $scope.getGroups()
})
