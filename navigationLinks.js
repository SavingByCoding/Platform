
let mainMod = angular.module("myApp", []);
mainMod.controller("myCont1", function ($scope) {

    $scope.logo = "../SBC-logos_transparent.png";


    $scope.websiteTitle = "Codeology";

    $scope.menuName1 = "Home";
    $scope.menuName1Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let m1 = document.getElementById("m1")
    m1.href = $scope.menuName1Link;

    $scope.menuName2 = "-About Us-";
    $scope.menuName2Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let m2 = document.getElementById("m2")
    m2.href = $scope.menuName2Link;

    $scope.menuName3 = "-Course Content-";
    $scope.menuName3Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let m3 = document.getElementById("m3")
    m3.href = $scope.menuName3Link;

    $scope.menuName4 = "-Contact Us-";
    $scope.menuName4Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let m4 = document.getElementById("m4")
    m4.href = $scope.menuName4Link;

    $scope.menuName5 = "-HTML Course Overview-";
    $scope.menuName5Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let m5 = document.getElementById("m5")
    m5.href = $scope.menuName5Link;

    $scope.menuName6 = "-Python Course Overview-";
    $scope.menuName6Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let m6 = document.getElementById("m6")
    m6.href = $scope.menuName6Link;

    $scope.menuName7 = "-Volunteer-"
    $scope.menuName7Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let m7 = document.getElementById("m7")
    m7.href = $scope.menuName7Link;

    $scope.dropdownName = "Profile";

    $scope.sand1 = "HTML Sandbox"
    $scope.sandboxHTMLLink = "https://www.youtube.com/watch?v=SWYPm24qVd8"
    let s1 = document.getElementById("s1")
    s1.href = $scope.sandboxHTMLLink

    $scope.sand2 = "Python Sandbox"
    $scope.sandboxPythonLink = "https://www.youtube.com/watch?v=SWYPm24qVd8"
    let s2 = document.getElementById("s2")
    s2.href = "https://www.youtube.com/watch?v=SWYPm24qVd8"

    $scope.dropdown1 = "View Profile"
    $scope.dropdown1Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let d1 = document.getElementById("d1")
    d1.href = $scope.dropdown1Link;

    $scope.dropdown2 = "Assignments"
    $scope.dropdown2Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let d2 = document.getElementById("d2")
    d2.href = $scope.dropdown2Link;

    $scope.dropdown3 = "Sign-up"
    $scope.dropdown3Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let d3 = document.getElementById("d2")
    d3.href = $scope.dropdown3Link;

    $scope.dropdown4 = "Logout"
    $scope.dropdown4Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let d4 = document.getElementById("d4")
    d4.href = $scope.dropdown4Link;

    $scope.dropdown5 = "Login"
    $scope.dropdown5Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let d5 = document.getElementById("d5")
    d5.href = $scope.dropdown5Link
});