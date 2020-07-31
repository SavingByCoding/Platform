var RegistrationDate= new Date();
var toAdd = document.createDocumentFragment();
var userID;

mainMod.controller("SubmitAngular", function ($scope) {
    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            userID=user.uid;
        } else {

        }
    });


    // $scope.isPreviousRegistration = function () {
    //     console.log($scope.userID)
    //         var previousRegistrations = db.collection('registrations').where("userId", "==", $scope.userID); //Gets all documents in registration for a specific user when they register
    //         previousRegistrations.get().then(function (querySnapshot) {
    //             querySnapshot.forEach(function (doc) {
    //                 CurrentCourseId = doc.data().courseId; //Gets course id from current id document
    //                 console.log(CurrentCourseId);
    //                 console.log($scope.CourseId);
    //                 if($scope.CourseId===CurrentCourseId){
    //                     return true; //Uer is already registered
    //                 }
    //             });
    //             return false;
    //         });
    // };
    window.onbeforeunload = function() {
        return "Do not reload the page, the form might submit twice!";
    }

    $scope.getCurrentDate= function(){
        const date = new Date();
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
        const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date)
        return `${day}-${month}-${year }`;
    };

    $scope.RegistrationDate= $scope.getCurrentDate();
    $scope.loadDataFromStorage= function() {
        // var allcookies =  unescape(document.cookie);
        // console.log(allcookies)
        // cookiearray = allcookies.split(';');
        // for (var i = 0; i < cookiearray.length; i++) {
        //     $scope.CourseId = cookiearray[i].split('=')[0];
        //     $scope.paid = cookiearray[i].split('=')[1];
        //     $scope.userID = cookiearray[i].split('=')[2];
        //     $scope.FirstName = cookiearray[i].split('=')[3];
        //     $scope.LastName = cookiearray[i].split('=')[4];
        //     $scope.ParentsEmail = cookiearray[i].split('=')[5];
        //     $scope.ChildAge = cookiearray[i].split('=')[6];
        //     $scope.ChildGrade = cookiearray[i].split('=')[7];
        //     $scope.SpecifiedTrack = cookiearray[i].split('=')[8];
        //     $scope.ConfirmationNumber = cookiearray[i].split('=')[9];
        //     $scope.paid= $scope.paid * 1.07; //Includes tax LOL
        // }
        // ;
        $scope.CourseId = localStorage.getItem("courseId");
        $scope.paid = localStorage.getItem("paid");
        $scope.userID = localStorage.getItem("userId");
        $scope.FirstName =  localStorage.getItem("FirstName");
        $scope.LastName = localStorage.getItem("LastName");
        $scope.ParentsEmail = localStorage.getItem("ParentsEmail");
        $scope.ChildAge = localStorage.getItem("ChildAge");
        $scope.ChildGrade = localStorage.getItem("ChildGrade");
        $scope.ConfirmationNumber = localStorage.getItem("ConfirmationNumber");
        $scope.CourseName= localStorage.getItem("CourseName");
        $scope.paid= $scope.paid * 1.07; //Includes tax LOL
        $scope.paid= $scope.paid.toFixed(2)
        $scope.phoneNum = localStorage.getItem("PhoneNum");
        $scope.registeredGroupID= localStorage.getItem("registeredGroupID");
        $scope.studentEmail = localStorage.getItem("StudentEmail");
        console.log($scope.registeredGroupID)

    };



    $scope.submitRegistration = function () {
        let data = {
            courseId: $scope.CourseId,
            date: RegistrationDate,
            paid: $scope.paid,
            userId: $scope.userID,
            FirstName: $scope.FirstName,
            LastName: $scope.LastName,
            ParentsEmail:$scope.ParentsEmail,
            ChildAge: $scope.ChildAge,
            ChildGrade: $scope.ChildGrade,
            ConfirmationNumber: $scope.ConfirmationNumber,
            CourseName: $scope.CourseName,
            PhoneNum: $scope.phoneNum
        };
        if(!($scope.CourseId==="")){
            db.collection("registrations").doc(generateUUID()).set(data);
        }
    };

    $scope.arrayofusers= [];
    $scope.getGroupOfUsers= function(doc1){
        var docRef = db.collection("groups").doc(doc1);
        docRef.get().then(function(doc) {
            if (doc.exists) {
                $scope.arrayofusers = doc.data().users;
                console.log("array from DB: "+ doc.data().users)
                $scope.updateUser(doc1);

            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            // window.alert("Oops! The website has run into an unforeseen problem. No worries! Click the link on this page to Contact Us and we can fix this issue.")
        });

    }

    $scope.checkIfUserAlreadyExists= function(){
        for(let i=0; i<$scope.arrayofusers.length;i++){
            if(userID === $scope.arrayofusers[i]){
                return true; //User Already Exists
            }
        }
    }

    $scope.updateUser = function (doc1){
        if(!$scope.checkIfUserAlreadyExists()){
            $scope.arrayofusers.push(userID);
            console.log($scope.arrayofusers);
            var ref1 = db.collection("groups").doc(doc1).update({
                users:$scope.arrayofusers
            });
        }
    };
    $scope.clearRegistrationDetailsInLocalStorage= function (){
        localStorage.setItem("courseId", "");
        localStorage.setItem("paid", "");
        localStorage.setItem("userId", "");
        localStorage.setItem("FirstName", "");
        localStorage.setItem("LastName", "");
        localStorage.setItem("ParentsEmail", "");
        localStorage.setItem("ChildAge", "");
        localStorage.setItem("ChildGrade", "");
        localStorage.setItem("ConfirmationNumber", "");
        localStorage.setItem(("CourseName"),"");
        localStorage.setItem(("PhoneNum"),"");
        localStorage.setItem("registeredGroupID","");
    };

$scope.sendConfirmationEmail= function(){
    let name = $scope.FirstName;
    let email = $scope.ParentsEmail;
    let courseName= $scope.CourseName;
    let confirmationNumber =  $scope.ConfirmationNumber;

    // let url = "https://cors-anywhere.herokuapp.com/http://18.222.29.210:8080/api/registrationConfirmation";
    let url = "https://18.222.29.210:8080/api/registrationConfirmation";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
        }
    }

    xhr.send(`name=${name}&email=${email}&courseName=${courseName}&confirmationNumber=${confirmationNumber}`);
}


    $scope.loadDataFromStorage();
    $scope.submitRegistration();
    $scope.getGroupOfUsers($scope.registeredGroupID);
    $scope.clearRegistrationDetailsInLocalStorage();
    $scope.sendConfirmationEmail();

});

function f(){
    window.open("../ProfilePage/profile.html");
    window.close(this);
};
