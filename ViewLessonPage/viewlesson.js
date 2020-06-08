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
var app = mainMod

const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

app.controller('AppController', ($scope) => {
    $scope.directory = ["Course Directory", "", "", ""]
    $scope.lessonId = getParameterByName('lessonid')
    $scope.userId = ''
    $scope.assignments = []
    $scope.submissionStatusCounts = {'Correct': 0, 'Incorrect': '0', 'Not Graded Yet': 0, 'Not Submitted Yet': 0}
    $scope.resources = []

    $scope.visitCourseDirectory = () => {
        window.location.href = "../LessonDirectoryPage/lessondirectory.html"
    }

    $scope.homeworkURL = (assignmentId, userAssignmentId, assignmentLanguage) => {
        let url = "../"
        switch (assignmentLanguage) {
            case 'HTML':
                url += "HomeWorkPageHTML/Homework.html"
                break
            case 'Python':
                url += 'HomeworkPagePython/Homework.html'
                break
        }
        url += `?assignmentid=${assignmentId}&userassignmentid=${userAssignmentId}&lessonid=${$scope.lessonId}`
        return url
    }

    $scope.resourceType = (rt) => {
        switch (rt) {
            case '1': return 'Text'
            case '2': return 'Video'
            case '3': return 'Article'
            case '4': return 'Link'
        }
    }

    $scope.assignmentStatus = (completed, status) => {
        if (completed) {
            return "Completed & " + status
        }
        else {
            return "Not Submitted Yet"
        }
    }

    $scope.getLesson = () => {
        db.collection('lessons').doc($scope.lessonId).get().then((doc) => {
            let {name, description, ordinalNumber, unit} = doc.data()
            $scope.name = name
            $scope.description = description
            $scope.ordinalNumber = ordinalNumber
            $scope.unitId = unit
            $scope.getUnit()
        })
    }

    $scope.getUnit = () => {
        db.collection('units').doc($scope.unitId).get().then((doc) => {
            let {name, description, course: courseId, ordinalNumber} = doc.data()
            $scope.unit = {name, description, courseId, ordinalNumber}
            $scope.getCourse()
        })
    }

    $scope.getCourse = () => {
        db.collection('courses').doc($scope.unit.courseId).get().then((doc) => {
            let {name, description, ordinalNumber} = doc.data()
            $scope.course = {name, description, ordinalNumber}
            if ($scope.user.userType !== '2') {
                db.collection("registrations")
                    .where("userId", "==", $scope.userId)
                    .where("courseId", "==", doc.id)
                    .get()
                    .then((qs2) => {
                        if (qs2.empty) {
                            window.location.href = "../LessonDirectoryPage/lessondirectory.html"
                        }
                        else {
                            let doc2 = qs2.docs[0]
                            let registration = {id: doc2.id}
                            Object.assign(registration, doc2.data())
                            $scope.registration = registration
                        }
                    })
            }
            $scope.$apply()
        })
    }

    $scope.getAssignments = () => {
        db.collection('assignments').where('lesson', '==', $scope.lessonId).get().then((qs) => {
            qs.forEach((doc) => {
                let assignment = {id: doc.id, status: 'Submitted'}
                Object.assign(assignment, doc.data())
                $scope.assignments.push(assignment)
                $scope.getUserAssignment($scope.assignments.length-1, assignment.id, assignment.language)
            })
            $scope.assignments.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0))
            $scope.$apply()
        })
    }

    $scope.getResources = () => {
        db.collection('resources').where('lesson', '==', $scope.lessonId).get().then((qs) => {
            qs.forEach((doc) => {
                let resource = {id: doc.id}
                Object.assign(resource, doc.data())
                $scope.resources.push(resource)
            })
            $scope.resources.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0))
            $scope.$apply()
        })
    }

    $scope.getUserAssignment = (assignmentIndex, assignmentId, language) => {
        db.collection("users-assignments")
            .where("user", "==", $scope.userId)
            .where("assignment", "==", assignmentId)
            .get()
            .then((qs) => {
                let userAssignment;
                if (qs.empty) {
                    userAssignment = {
                        assignment: assignmentId,
                        user: $scope.userId,
                        code: '',
                        completed: false,
                        language: language,
                        output: '',
                        status: 'Not Graded Yet'
                    }
                    let id = generateUUID()
                    db.collection("users-assignments")
                        .doc(id)
                        .set(userAssignment)
                    userAssignment.id = id
                }
                else {
                    let doc = qs.docs[0]
                    userAssignment = {id: doc.id}
                    Object.assign(userAssignment, doc.data())
                }
                const len = $scope.assignments.length
                for (let i = 0; i < len; i++) {
                    if ($scope.assignments[i].id === assignmentId) {
                        $scope.assignments[i].userAssignment = userAssignment
                    }
                }
                if (userAssignment.completed) {
                    $scope.submissionStatusCounts[userAssignment.status]++
                }
                else {
                    $scope.submissionStatusCounts['Not Submitted Yet']++
                }
                $scope.$apply()
            })
    }

    $scope.getLoggedInUser = () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                $scope.userId = user.uid
                db.collection("users")
                    .where("userId", "==", $scope.userId)
                    .get()
                    .then((qs) => {
                        let doc = qs.docs[0]
                        let user = {id: doc.id}
                        Object.assign(user, doc.data())
                        $scope.user = user
                        LOAD_ON_STARTUP()
                    })
            }
        });
    }

    // On startup
    $scope.getLoggedInUser()

    const LOAD_ON_STARTUP = () => {
        $scope.getLesson()
        $scope.getAssignments()
        $scope.getResources()
    }
})
