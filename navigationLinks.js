
var mainMod = angular.module("myApp", []);
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

mainMod.controller("MyCont2", function ($scope) {
    $scope.footerMenuName1 = "Home";
    $scope.footerMenuName1Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let f1 = document.getElementById("f1")
    f1.href = $scope.footerMenuName1Link;

    $scope.footerMenuName2 = "About Us";
    $scope.footerMenuName2Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let f2 = document.getElementById("f2")
    f2.href = $scope.footerMenuName2Link;

    $scope.footerMenuName3 = "Donate";
    $scope.footerMenuName3Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let f3 = document.getElementById("f3")
    f3.href = $scope.footerMenuName3Link;

    $scope.footerMenuName4 = "Contact Us";
    $scope.footerMenuName4Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let f4 = document.getElementById("f4")
    f4.href = $scope.footerMenuName4Link;

    $scope.footerMenuName5 = "HTML Course Overview";
    $scope.footerMenuName5Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let f5 = document.getElementById("f5")
    f5.href = $scope.footerMenuName5Link;

    $scope.footerMenuName6 = "Python Course Overview";
    $scope.footerMenuName6Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let f6 = document.getElementById("f6")
    f6.href = $scope.footerMenuName6Link;

    $scope.footerMenuName7 = "Volunteer";
    $scope.footerMenuName7Link = "https://www.youtube.com/watch?v=SWYPm24qVd8";
    let f7 = document.getElementById("f7")
    f7.href = $scope.footerMenuName7Link;
});
