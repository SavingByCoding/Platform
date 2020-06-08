function registerNow(){
    window.open(" LoginPage/Login.html")
    window.close(this)
}
var mainMod = angular.module("myApp", []);
mainMod.controller("myCont1", function ($scope) {

    $scope.logo = " LogoWithWordsWhite.png";


    $scope.menuName1 = "Home";
    $scope.menuName1Link = " index.html";
    let m1 = document.getElementById("m1")
    m1.href = $scope.menuName1Link;

    $scope.menuName2 = "About Us";
    $scope.menuName2Link = " AboutPage/AboutPage.html";
    let m2 = document.getElementById("m2")
    m2.href = $scope.menuName2Link;

    $scope.menuName3 = "Course Content";


    $scope.menuName4 = "Contact Us";
    $scope.menuName4Link = " ContactPage/contact.html";
    let m4 = document.getElementById("m4")
    m4.href = $scope.menuName4Link;

    $scope.menuName5 = "HTML Course Overview";
    $scope.menuName5Link = " HTMLContentPage/HTMLContentPage.html";
    let m5 = document.getElementById("m5")
    m5.href = $scope.menuName5Link;

    $scope.menuName6 = "Python Course Overview";
    $scope.menuName6Link = " PythonContentPage/PythonContentPage.html";
    let m6 = document.getElementById("m6")
    m6.href = $scope.menuName6Link;


    // $scope.registerNowLink= " RegistrationForm/registration.html";
    // $("#RegisterNow").attr("href",$scope.registerNowLink); //Added a registernow link so you could just put the link here //UNCOMMENT LATER

    $scope.dropdownName = "Profile";

    $scope.sand1 = "HTML Sandbox"
    $scope.sandboxHTMLLink = " SandboxPageHtml/Sandbox.html"
    let s1 = document.getElementById("s1")
    s1.href = $scope.sandboxHTMLLink

    $scope.sand2 = "Python Sandbox"
    $scope.sandboxPythonLink = " SandboxPagePython/Sandbox.html"
    let s2 = document.getElementById("s2")
    s2.href = $scope.sandboxPythonLink;

    $scope.dropdown1 = "View Profile"
    $scope.dropdown1Link = " ProfilePage/profile.html";
    let d1 = document.getElementById("d1")
    d1.href = $scope.dropdown1Link;

    // $scope.dropdown2 = "Assignments"
    // $scope.dropdown2Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    // let d2 = document.getElementById("d2")
    // d2.href = $scope.dropdown2Link;

    // $scope.dropdown3 = "Sign-up"
    // $scope.dropdown3Link = " SignUpPage/SignUp.html";
    // let d3 = document.getElementById("d3")
    // d3.href = $scope.dropdown3Link;

    $scope.dropdown4 = "Logout"
    $scope.dropdown4Link = " index.html"; //not done
    let d4 = document.getElementById("d4")
    d4.href = $scope.dropdown4Link;

    $scope.dropdown5 = "SignUp/Login"
    $scope.dropdown5Link = " LoginPage/Login.html";
    let d5 = document.getElementById("d5")
    d5.href = $scope.dropdown5Link

    $scope.dropdown6 = "Admin Portal"
    $scope.dropdown6Link = " AdminPage/admin.html"
    let d6 = document.getElementById("d6")
    d6.href = $scope.dropdown6Link

    $scope.signedIn; //Code for sign in sign out
    $scope.currentid;

    firebase.auth().onAuthStateChanged(function(user){
        if (user) {
            $scope.currentid= user.uid;
            $scope.signedIn= true;
            $scope.ChangeNavBar();

            db.collection("users")
                .where("userId", "==", user.uid)
                .get()
                .then((qs) => {
                    let doc = qs.docs[0]
                    if (doc.data().userType !== '2') {
                        $("#d6").hide();
                        $("#d6").attr("href", "#"); // Hides the Admin Page if you arent an ADMIN
                    }
                })
        } else {
            // User not logged in or has just logged out.
            $scope.signedIn= false;
            $scope.ChangeNavBar();
            $("#d6").hide();
            $("#d6").attr("href", "#"); //Hides ADMIN page if the user is logged out
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

            $("#RegisterNow").hide();
            $("#RegisterNow").attr("href","#"); //Hides Register Everywhere Remove later

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

mainMod.controller("MyCont2", function ($scope) {
    $scope.footerMenuName1 = "Home";
    $scope.footerMenuName1Link = " index.html";
    let f1 = document.getElementById("f1")
    f1.href = $scope.footerMenuName1Link;

    $scope.footerMenuName2 = "About Us";
    $scope.footerMenuName2Link = " AboutPage/AboutPage.html";
    let f2 = document.getElementById("f2")
    f2.href = $scope.footerMenuName2Link;

    // $scope.footerMenuName3 = "Register Now";
    // $scope.footerMenuName3Link = "RegistrationForm/registration.html";
    // let f3 = document.getElementById("f3")
    // f3.href = $scope.footerMenuName3Link;

    $scope.footerMenuName4 = "Contact Us";
    $scope.footerMenuName4Link = " ContactPage/contact.html";
    let f4 = document.getElementById("f4")
    f4.href = $scope.footerMenuName4Link;

    $scope.footerMenuName5 = "HTML Course Overview";
    $scope.footerMenuName5Link = " HTMLContentPage/HTMLContentPage.html";
    let f5 = document.getElementById("f5")
    f5.href = $scope.footerMenuName5Link;

    $scope.footerMenuName6 = "Python Course Overview";
    $scope.footerMenuName6Link = " PythonContentPage/PythonContentPage.html";
    let f6 = document.getElementById("f6")
    f6.href = $scope.footerMenuName6Link;

    $scope.footerMenuName7 = "Volunteer";
    $scope.footerMenuName7Link = " ContactPage/contact.html";
    let f7 = document.getElementById("f7")
    f7.href = $scope.footerMenuName7Link;

});

function goBack(){
    window.open(" ProfilePage/profile.html")
    window.close(this)
}



