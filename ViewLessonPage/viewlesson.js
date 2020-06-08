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
var app = angular.module('SBCViewLesson', []);

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
        url += `?assignmentid=${assignmentId}&userassignmentid=${userAssignmentId}`
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
                $scope.assignments[assignmentIndex].userAssignment = userAssignment
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

app.controller("myCont1", function ($scope) {

    $scope.logo = "../LogoWithWords.png";


    $scope.menuName1 = "Home";
    $scope.menuName1Link = "../HomePage/index.html";
    let m1 = document.getElementById("m1")
    m1.href = $scope.menuName1Link;

    $scope.menuName2 = "-About Us-";
    $scope.menuName2Link = "../AboutPage/AboutPage.html";
    let m2 = document.getElementById("m2")
    m2.href = $scope.menuName2Link;

    $scope.menuName3 = "-Course Content-";


    $scope.menuName4 = "-Contact Us-";
    $scope.menuName4Link = "../ContactPage/contact.html";
    let m4 = document.getElementById("m4")
    m4.href = $scope.menuName4Link;

    $scope.menuName5 = "-HTML Course Overview-";
    $scope.menuName5Link = "../HTMLContentPage/HTMLContentPage.html";
    let m5 = document.getElementById("m5")
    m5.href = $scope.menuName5Link;

    $scope.menuName6 = "-Python Course Overview-";
    $scope.menuName6Link = "../PythonContentPage/PythonContentPage.html";
    let m6 = document.getElementById("m6")
    m6.href = $scope.menuName6Link;


    $scope.registerNowLink= "../RegistrationForm/registration.html";
    $("#RegisterNow").attr("href",$scope.registerNowLink); //Added a registernow link so you could just put the link here

    $scope.dropdownName = "Profile";

    $scope.sand1 = "HTML Sandbox"
    $scope.sandboxHTMLLink = "../SandboxPageHtml/Sandbox.html"
    let s1 = document.getElementById("s1")
    s1.href = $scope.sandboxHTMLLink

    $scope.sand2 = "Python Sandbox"
    $scope.sandboxPythonLink = "../SandboxPagePython/Sandbox.html"
    let s2 = document.getElementById("s2")
    s2.href = $scope.sandboxPythonLink;

    $scope.dropdown1 = "View Profile"
    $scope.dropdown1Link = "../ProfilePage/profile.html";
    let d1 = document.getElementById("d1")
    d1.href = $scope.dropdown1Link;

    // $scope.dropdown2 = "Assignments"
    // $scope.dropdown2Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    // let d2 = document.getElementById("d2")
    // d2.href = $scope.dropdown2Link;

    // $scope.dropdown3 = "Sign-up"
    // $scope.dropdown3Link = "../SignUpPage/SignUp.html";
    // let d3 = document.getElementById("d3")
    // d3.href = $scope.dropdown3Link;

    $scope.dropdown4 = "Logout"
    $scope.dropdown4Link = "../HomePage/index.html"; //not done
    let d4 = document.getElementById("d4")
    d4.href = $scope.dropdown4Link;

    $scope.dropdown5 = "SignUp/Login"
    $scope.dropdown5Link = "../LoginPage/Login.html";
    let d5 = document.getElementById("d5")
    d5.href = $scope.dropdown5Link

    $scope.signedIn; //Code for sign in sign out
    $scope.currentid;

    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            $scope.currentid= user.uid;
            $scope.signedIn= true;
            $scope.ChangeNavBar();
        } else {
            // User not logged in or has just logged out.
            $scope.signedIn= false;
            $scope.ChangeNavBar();
        }
    });


//Functionality to add
// Create a function that returns a boolean if the user is logged in
    function isUserLoggedIn(){
        return $scope.signedIn
    }

    $scope.ChangeNavBar=()=> {
        console.log(isUserLoggedIn());
        if(isUserLoggedIn()){
            $("#d5").hide();
            $("#d5").attr("href", "#"); // Hides the LogIn

        }
        else{//Hides if the user is not logged in
            $('#divider1').hide(); //Hides Dividers on the Screen
            $('#divider2').hide();
            $("#d4").hide();
            $("#d4").attr("href", "#"); //Hides the Logout
            $("#s1").hide();
            $("#s1").attr("href", "#"); // Hides the Sandbox
            $("#s2").hide();
            $("#s2").attr("href", "#"); // Hides the Sandbox
            $("#d1").hide();
            $("#d1").attr("href", "#");
            $("#RegisterNow").hide();
            $("#RegisterNow").attr("href","#");

        }
    };


    //Functions to implement
    //If user logged in show : sandbox,view profile,Logout, and the dividers
    //If user not logged in show: sign up and login
    $(document).ready(function () {
    });
});

app.controller("MyCont2", function ($scope) {
    $scope.footerMenuName1 = "Home";
    $scope.footerMenuName1Link = "../HomePage/index.html";
    let f1 = document.getElementById("f1")
    f1.href = $scope.footerMenuName1Link;

    $scope.footerMenuName2 = "About Us";
    $scope.footerMenuName2Link = "../AboutPage/AboutPage.html";
    let f2 = document.getElementById("f2")
    f2.href = $scope.footerMenuName2Link;

    $scope.footerMenuName3 = "Register Now";
    $scope.footerMenuName3Link = "../RegistrationForm/registration.html";
    let f3 = document.getElementById("f3")
    f3.href = $scope.footerMenuName3Link;

    $scope.footerMenuName4 = "Contact Us";
    $scope.footerMenuName4Link = "../ContactPage/contact.html";
    let f4 = document.getElementById("f4")
    f4.href = $scope.footerMenuName4Link;

    $scope.footerMenuName5 = "HTML Course Overview";
    $scope.footerMenuName5Link = "../HTMLContentPage/HTMLContentPage.html";
    let f5 = document.getElementById("f5")
    f5.href = $scope.footerMenuName5Link;

    $scope.footerMenuName6 = "Python Course Overview";
    $scope.footerMenuName6Link = "../PythonContentPage/PythonContentPage.html";
    let f6 = document.getElementById("f6")
    f6.href = $scope.footerMenuName6Link;

    $scope.footerMenuName7 = "Volunteer";
    $scope.footerMenuName7Link = "../ContactPage/contact.html";
    let f7 = document.getElementById("f7")
    f7.href = $scope.footerMenuName7Link;

});





