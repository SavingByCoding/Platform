//Create variables of all the data that you want to submit
//everytime the user clicks next that info gets stored in the variables
//when the user clicks the final submit the


var FirstName;
var LastName;
var ParentsEmail;
var ChildAge;
var ChildGrade;
var SpecifiedTrack;
var CourseId;
var paid= 49.99;
var RegistrationDate= getCurrentDate();
var ConfirmationNumber= generateUUID();

var fname=document.getElementById("fname");
var x= document.getElementById("formcontainer1");
var y= document.getElementById("formcontainer2");
var z= document.getElementById("formcontainer3");
var a=document.getElementById("formcontainer4");
var b=document.getElementById("formcontainer5");
var c=document.getElementById("formcontainer6");

a.style.display="none";
y.style.display="none";
z.style.display="none";
b.style.display="none";
c.style.display="none";


function next1() {
    var form = document.getElementById('Page1');
        for (var i = 0; i < form.elements.length; i++) {
            if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
                alert('There are some required fields!');
                break;
            } else {
                y.style.display="block";
                x.style.display="none";
                ParentsEmail= $("#Email").val();
            }

        }
}

function previous1()
{
    x.style.display="block";
    y.style.display="none";
}
function next2()
{
    var form = document.getElementById('Page2');
    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
            alert('There are some required fields!');
            break;
        } else {
            y.style.display="none";
            z.style.display="block";
            FirstName= $("#FirstName").val();
            LastName= $("#LastName").val();
            ChildAge= $("#age").val();
            ChildGrade= $("#grade").val();

        }

    }
}
function previous2()
{
    z.style.display="none";
    y.style.display="block";
}
function next3()
{
    z.style.display="none";
    a.style.display="block";
}
function previous3()
{
    a.style.display="none";
    z.style.display="block";
}
function next4()
{
    a.style.display="none";
    b.style.display="block";
}
function previous4()
{
    b.style.display="none";
    a.style.display="block";
}
function next5()
{
    var form = document.getElementById('Page2');
    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value === '' && form.elements[i].hasAttribute('required')) {
            alert('There are some required fields!');
            break;
        } else {
            b.style.display="none";
            c.style.display="block";
            setSelectedCourseId();
            SpecifiedTrack= $("#preferences").val();
        }

    }
}
function previous5()
{
    c.style.display="none";
    b.style.display="block";
}

var userID;
mainMod.controller("RegistrationForm", function ($scope) {
    $scope.courseNames =[];
    $scope.courses = [];
    //Get all the Courses from DB and put into an array //done
    //Create a function to check if the user is already registered for the course //done
    //Remove from the array if the user already registered for the course //done
    //use ng-repeat to iterate through that array and dynamically display the courses
    //Create a function to get the id of the course that the user selected from DB

    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            userID=user.uid;
        } else {

        }
    });
    //Get all the Courses from DB and put into an array
    $scope.getCourseName= function () {
        db.collection('courses').get().then((snapshot)=>{
            snapshot.docs.forEach(doc=>{
                // console.log(doc.data().name)
                $scope.courses.push(doc.data());
                $scope.courseNames.push(doc.data().name);
                setTimeout(function(){$scope.checkPreviousRegistration()}, 100)
                $scope.apply();
            })
        });
    };

    //Create a function to check if the user is already registered for the course
     $scope.checkPreviousRegistration = function () {

         $scope.courseNames.forEach(function (courseName,index) {
             var previousRegistrations = db.collection('registrations').where("userId", "==", userID); //Gets all documents in registration for a specific user when they register
             previousRegistrations.get().then(function (querySnapshot) {
                 querySnapshot.forEach(function (doc) {  //Itterates through all documents
                     CurrentCourseId =doc.data().courseId; //Gets course id from current id document
                     Course= db.collection('courses').doc(CurrentCourseId); //searches the currentcourse
                    // console.log(CurrentCourseId)
                     let getDocument = Course.get()
                         .then(doc => {
                             if(courseName == doc.data().name || $scope.getCourseFromCourseName(courseName).demo){ //sees if the course name in the array is something the user already signed up for OR if course is demo
                                 $scope.courseNames = $scope.courseNames.filter(e => e !== courseName);
                                 $scope.$apply();
                             }
                         })
                         .catch(err => {
                         });
                 });
             });

         });
     };


    $scope.getCourseName();


    $scope.courseValue=""; //the data-model that tells you what the user selected
     setSelectedCourseId = function (){
        //When the user clicks next it will take current course
        //Gets the id of the current course
        //sets the current id of the course to the variable
         coursename =  $scope.courseValue;
        var courseiddocuments = db.collection('courses').where("name", "==", coursename );
        courseiddocuments.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    CourseId=doc.id;
                });
            });
     }


     $scope.getCourseFromCourseName = (name) => {
         for (let course of $scope.courses) {
             if (course.name === name) return course
         }
     }


    // submitRegistration = function(){
    //     let data={
    //         courseId:CourseId,
    //         date: RegistrationDate,
    //         paid: paid,
    //         userId: userID,
    //         FirstName: FirstName,
    //         LastName: LastName,
    //         ParentsEmail: ParentsEmail,
    //         ChildAge: ChildAge,
    //         ChildGrade: ChildGrade,
    //         SpecifiedTrack: SpecifiedTrack,
    //         ConfirmationNumber:ConfirmationNumber
    //     };
    //
    //     db.collection("registrations").doc(generateUUID()).set(data);
    // };
    $scope.SetLocalStorage = function () {
         console.log(CourseId)
        localStorage.setItem("courseId", CourseId);
        localStorage.setItem("paid", paid);
        localStorage.setItem("userId", userID);
        localStorage.setItem("FirstName", FirstName);
        localStorage.setItem("LastName", LastName);
        localStorage.setItem("ParentsEmail", ParentsEmail);
        localStorage.setItem("ChildAge", ChildAge);
        localStorage.setItem("ChildGrade", ChildGrade);
        localStorage.setItem("SpecifiedTrack", SpecifiedTrack);
        localStorage.setItem("ConfirmationNumber", ConfirmationNumber);
        localStorage.setItem(("CourseName"),$scope.courseValue);
        console.log($scope.courseValue);
    };
    $("#PayNow").click(function () {
       $scope.SetLocalStorage();
       window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5AH9YDUT9WUSS");

    });

     
});

