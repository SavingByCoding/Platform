$(document).ready(function () {

    $("#CompileButton").click(function () {
        let Code= editor.getValue();
        Code= encodeURI(Code);
        Code= Code.replace(/#/g,"~"); //To make sure Comments Work
        let Output="";
        let Url= "https://cors-anywhere.herokuapp.com/http://18.218.244.255:8080/"+ Code;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', Url, true);
        xhr.send();
        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            Output= xhr.responseText;
            insertText(Output);
        }

        function insertText(text) {
            document.getElementById("outputScreen").value= text;
        }


    });

});

var moduleA = angular.module("myApp",[]);
moduleA.controller("myCont1",function($scope){
    $scope.name1 = "Unnamed Project 1"
    $scope.name2 = "Unnamed Project 2"
    $scope.name3 = "Unnamed Project 3"
    $scope.name4 = "Unnamed Project 4"
    $scope.name5 = "Unnamed Project 5"
    $scope.name6 = "Unnamed Project 6"
    $scope.name7 = "Unnamed Project 7"
    $scope.name8 = "Unnamed Project 8"
    $scope.name9 = "Unnamed Project 9"
    $scope.name10 = "Unnamed Project 10"
});
function chooseActive(num1){
    if(num1 === 1){
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project01").classList.add("active");

        document.getElementById("t1").style.display = "flow";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "none";

    }
    else if (num1 === 2){
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project02").classList.add("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "flow";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "none";

    }
    else if (num1 === 3){
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project03").classList.add("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "flow";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 4){
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project04").classList.add("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "flow";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 5){
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project05").classList.add("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "flow";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 6){
        var a = document.getElementsByClassName("projectLoadButtons");
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project06").classList.add("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "flow";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 7){
        var a = document.getElementsByClassName("projectLoadButtons");
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project07").classList.add("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "flow";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 8){
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project08").classList.add("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "flow";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 9){
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project09").classList.add("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "flow";
        document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 10){
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.add("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "flow";
    }

}

var project1UUID;
var project2UUID;
var project3UUID;
var project4UUID;
var project5UUID;
var project6UUID;
var project7UUID;
var project8UUID;
var project9UUID;
var project10UUID;

var moduleA = angular.module("myApp",[]);
moduleA.controller("myCont1",function($scope){
    $scope.name1 = "Unnamed Project 1";
    $scope.name2 = "Unnamed Project 2";
    $scope.name3 = "Unnamed Project 3";
    $scope.name4 = "Unnamed Project 4";
    $scope.name5 = "Unnamed Project 5";
    $scope.name6 = "Unnamed Project 6";
    $scope.name7 = "Unnamed Project 7";
    $scope.name8 = "Unnamed Project 8";
    $scope.name9 = "Unnamed Project 9";
    $scope.name10 = "Unnamed Project 10";

    $scope.UserID = userID; //Value from the Firebase Code on Auth UserChange
    $scope.LoadProjects = function(){ //Loads all project names
        var UserProjectsDocument = db.collection('user-projects').doc(userID);
        let getUserProjects = UserProjectsDocument.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    console.log('Document data:', doc.data());
                    UserProjects =doc.data(); //Loads all UUID for all projects
                    project1UUID= UserProjects.Project1;
                    project2UUID= UserProjects.Project2;
                    project3UUID= UserProjects.Project3;
                    project4UUID= UserProjects.Project4;
                    project5UUID= UserProjects.Project5;
                    project6UUID= UserProjects.Project6;
                    project7UUID= UserProjects.Project7;
                    project8UUID= UserProjects.Project8;
                    project9UUID= UserProjects.Project9;
                    project10UUID= UserProjects.Project10;
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });

        var projectsuuid =  [project1UUID,project2UUID,project3UUID,project4UUID,project5UUID,project6UUID,project7UUID,project7UUID,project8UUID,project9UUID,project10UUID];
        projectsuuid.forEach(function (uuid,index) {
            var Projects = db.collection('projects').doc(uuid);
            let getDocument = Projects.get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        console.log('Document data:', doc.data());
                        UserProjects = doc.data();
                        switch (index+1){
                            case 1:
                                $Scope.name1 = UserProjects.name;
                                break;
                            case 2:
                                $Scope.name2 = UserProjects.name;
                                break;
                            case 3:
                                $Scope.name3 = UserProjects.name;
                                break;
                            case 4:
                                $Scope.name4 = UserProjects.name;
                                break;
                            case 5:
                                $Scope.name5 = UserProjects.name;
                                break;
                            case 6:
                                $Scope.name6 = UserProjects.name;
                                break;
                            case 7:
                                $Scope.name7 = UserProjects.name;
                                break;
                            case 8:
                                $Scope.name8 = UserProjects.name;
                                break;
                            case 9:
                                $Scope.name9 = UserProjects.name;
                                break;
                            case 10:
                                $Scope.name10 = UserProjects.name;
                                break;
                        }

                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });

        });
    };



    $scope.CreateProject= function(){
        //Create a document under user-projects
        //Generate a UUID For the project name
    };
    $scope.SaveProject = function(){ //Done

        let data= {
            code: editor.getValue(),   //change this for implementing autosave
            language: $scope.CurrentProjectLanguage,
            name: $scope.CurrentProjectName
        };
        db.collection('projects').doc(userID).set(data);
    };

    $scope.DisplayProjects = function (){ //Done
//Click the on the tab -> Gets button id i.e Project1
        //Queries to get Project 1 uuid
        //Uses UUID to get code and all other attributes for specific project and loads it in
        $scope.CurrentProjectUUID;
        projectnumber = event.target.id; //gets which project it is
        switch (projectnumber) {
            case "Project1":
                $scope.CurrentProjectUUID=project1UUID;
                break;
            case "Project2":
                $scope.CurrentProjectUUID=project2UUID;
                break;
            case "Project3":
                $scope.CurrentProjectUUID=project3UUID;
                break;
            case "Project4":
                $scope.CurrentProjectUUID=project4UUID;
                break;
            case "Project5":
                $scope.CurrentProjectUUID=project5UUID;
                break;
            case "Project6":
                $scope.CurrentProjectUUID=project6UUID;
                break;
            case "Project7":
                $scope.CurrentProjectUUID=project7UUID;
                break;
            case "Project8":
                $scope.CurrentProjectUUID=project8UUID;
                break;
            case "Project9":
                $scope.CurrentProjectUUID=project9UUID;
                break;
            case "Project10":
                $scope.CurrentProjectUUID=project10UUID;
                break;
        }

        var CurrentProjectDocument = db.collection('projects').doc($scope.CurrentProjectUUID);
        let getUserProjects = CurrentProjectDocument.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    console.log('Document data:', doc.data());
                    CurrentProject = doc.data(); //Loads all UUID for all projects
                    $scope.CurrentProjectCode = CurrentProject.code;  //Current Project Code
                    $scope.CurrentProjectLanguage=CurrentProject.language; //Current Project Language
                    $scope.CurrentProjectName=CurrentProject.name; //Current Project
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });

        editor.setValue($scope.CurrentProjectCode); //Changes code when you click a new project
    };

    $scope.DeleteProjects = function () {

    };

    $(document).ready(function () {
        $scope.LoadProjects();
    });

    //need to reset name evertime you load a new project
});
//TODO set the initial project selected to 1 and load the current code, current language, and current name variable
//Todo figure out how to make sure if you change your name of the file it will update
//TODO add a function to save before you switch projects- Dope features
//TODO notice how you could load a html code file into python sandbox
