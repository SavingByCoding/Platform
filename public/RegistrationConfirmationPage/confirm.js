var RegistrationDate= new Date();
var toAdd = document.createDocumentFragment();
mainMod.controller("SubmitAngular", function ($scope) {
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
             console.log($scope.CourseId)
             $scope.paid = localStorage.getItem("paid");
             $scope.userID = localStorage.getItem("userId");
             $scope.FirstName =  localStorage.getItem("FirstName");
             $scope.LastName = localStorage.getItem("LastName");
             $scope.ParentsEmail = localStorage.getItem("ParentsEmail");
             $scope.ChildAge = localStorage.getItem("ChildAge");
             $scope.ChildGrade = localStorage.getItem("ChildGrade");
             $scope.SpecifiedTrack = localStorage.getItem("SpecifiedTrack");
             $scope.ConfirmationNumber = localStorage.getItem("ConfirmationNumber");
             $scope.CourseName= localStorage.getItem("CourseName");
             $scope.paid= $scope.paid * 1.07; //Includes tax LOL
             $scope.paid= $scope.paid.toFixed(2)
             $scope.groupOfClasses = [];


    };



    $scope.submitRegistration = function () {
        let data = {
            courseId: $scope.CourseId,
            date: RegistrationDate,
            paid: $scope.paid,
            userId: $scope.userID,
            FirstName: $scope.FirstName,
            LastName: $scope.LastName,
            ParentsEmail:$scope. ParentsEmail,
            ChildAge: $scope.ChildAge,
            ChildGrade: $scope.ChildGrade,
            SpecifiedTrack: $scope.SpecifiedTrack,
            ConfirmationNumber: $scope.ConfirmationNumber,
            CourseName: $scope.CourseName
        };
        console.log(data)
        db.collection("registrations").doc(generateUUID()).set(data);

    };
    //  $scope.DisplayData= function () {
    //     var docRef = db.collection("courses").doc($scope.CourseId);
    //     docRef.get().then(function (doc) {
    //         if (doc.exists) {
    //             Course = doc.data();
    //             $scope.CourseName = Course.name;
    //         }
    //     }).catch(function (error) {
    //         console.log("Error getting document:", error);
    //     });
    //
    //
    // };

    $scope.classes = []
    $scope.main = []
    $scope.showSchedule = function() {
        db.collection("groups").where("courseID", "==", $scope.CourseId)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.data().name);
                    $scope.classes.push(doc.data().name)
                    console.log($scope.classes);
                    console.log($scope.classes.length);
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

    }



    $scope.loadDataFromStorage();
    $scope.submitRegistration();
    $scope.showSchedule();
    console.log($scope.classes);


    //Check why it doesnt remove demo courses //done
    //Check if it removes courses already registered //Works
    //Check if the user already registered for the course if they did dont submit data
    //Clear Data //Dont need to do


});

$("#BUTTON").click(function(){
    window.open("../ProfilePage/profile.html");
});

