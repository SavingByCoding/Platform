// let HomeWorkAnswer= "hello"; //We manually Put in
// let OutputConsoleText=""; //Kids Code
//
// function CheckAnswer(){
//     if(HomeWorkAnswer == OutputConsoleText.ignoreCase){
//         jQuery.noConflict();
//         $("#CorrectAnswer").modal('show');
//     }
//     else {
//         jQuery.noConflict();
//         $("#IncorrectAnswer").modal('show');
//     }
// }
//
// function insertText(text) {
//     document.getElementById("outputScreen").value= text;
//     OutputConsoleText=text;
// }
// function getTextFromEditor(){
//     return editor.getValue();
// }
//
//download code locally
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

$(document).ready(function () {
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/dracula");
        editor.getSession().setMode("ace/mode/html");
        editor.setValue(`<!DOCTYPE html>
<html>
<head>
</head>

<body>
</body>

</html>`,1); //1 = moves cursor to end

        editor.getSession().on('change', function() {
            update();
        });

        editor.focus();

    function update()
    {
        let idoc = document.getElementById('outputScreen').contentWindow.document;

        idoc.open();
        idoc.write(editor.getValue());
        console.log("hello");
        idoc.close();
    }

    update();

    $("#DownloadCodeButton").click(function () {
        var text = editor.getValue();
        var filename = $("#ProjectName").val();
        var filename= filename+".html";
        console.log(filename);

        download(filename, text);

    });
});


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

var projectsuuid= [];
var moduleA = angular.module("myApp",[]);
moduleA.controller("myCont1",function($scope){
    $scope.name1 = "Project 1";
    $scope.name2 = "Project 2";
    $scope.name3 = "Project 3";
    $scope.name4 = "Project 4";
    $scope.name5 = "Project 5";
    $scope.name6 = "Project 6";
    $scope.name7 = "Project 7";
    $scope.name8 = "Project 8";
    $scope.name9 = "Project 9";
    $scope.name10 ="Project 10";
    $scope.UserID = userID; //Value from the Firebase Code on Auth UserChange

    $scope.LoadProjects = function(){ //Loads all project names //Works
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
                    projectsuuid.push(project1UUID,project2UUID,project3UUID,project4UUID,project5UUID,project6UUID,project7UUID,project8UUID,project9UUID,project10UUID);
                    ShowProjectName();
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });

    };

    ShowProjectName= function(){
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
                                $scope.name1 = UserProjects.name;
                                break;
                            case 2:
                                $scope.name2 = UserProjects.name;
                                break;
                            case 3:
                                $scope.name3 = UserProjects.name;
                                break;
                            case 4:
                                $scope.name4 = UserProjects.name;
                                break;
                            case 5:
                                $scope.name5 = UserProjects.name;
                                break;
                            case 6:
                                $scope.name6 = UserProjects.name;
                                break;
                            case 7:
                                $scope.name7 = UserProjects.name;
                                break;
                            case 8:
                                $scope.name8 = UserProjects.name;
                                break;
                            case 9:
                                $scope.name9 = UserProjects.name;
                                break;
                            case 10:
                                $scope.name10 = UserProjects.name;
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
    $scope.SaveProject = function(){
        $("#ProjectName").val($scope.CurrentProjectName);
    };
    $scope.SaveChanges = function(){
        //Click save
        //Opens modal
        //Loads the current name of the project
        //You could chnage the name or just hit done
        $scope.CurrentProjectName= $("#ProjectName").val();
        let data= {
            code: editor.getValue(),   //change this for implementing autosave
            language: $scope.CurrentProjectLanguage,
            name: $scope.CurrentProjectName
        };
        db.collection('projects').doc($scope.CurrentProjectUUID).set(data);
        $scope.updateProjectName();
        $scope.LoadProjects();
    }
    $scope.updateProjectName = function (){
        switch ($scope.projectnumber) {
            case "Project1":
                $scope.name1= $scope.CurrentProjectName;
                break;
            case "Project2":
                $scope.name1= $scope.CurrentProjectName;
                break;
            case "Project3":
                $scope.name1= $scope.CurrentProjectName;
                break;
            case "Project4":
                $scope.name1= $scope.CurrentProjectName;
                break;
            case "Project5":
                $scope.name1= $scope.CurrentProjectName;
                break;
            case "Project6":
                $scope.name1= $scope.CurrentProjectName;
                break;
            case "Project7":
                $scope.name1= $scope.CurrentProjectName;
                break;
            case "Project8":
                $scope.name1= $scope.CurrentProjectName;
                break;
            case "Project9":
                $scope.name1= $scope.CurrentProjectName;
                break;
            case "Project10":
                $scope.name1= $scope.CurrentProjectName;
                break;
        }
    }

    $scope.DisplayProjects = function (){ //Done
//Click the on the tab -> Gets button id i.e Project1
        //Queries to get Project 1 uuid
        //Uses UUID to get code and all other attributes for specific project and loads it in
        console.log("part 1")
        $scope.CurrentProjectUUID;
        $scope.projectnumber = event.target.id; //gets which project it is
        switch ($scope.projectnumber) {
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
                console.log("part 2")
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
        console.log("part 3")
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
                    console.log("part 4")
                    editor.setValue($scope.CurrentProjectCode); //Changes code when you click a new project
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
        console.log("part 5")
    };

    $scope.DeleteProjects = function () {

    };

    $(document).ready(function () {
        $scope.LoadProjects();
    });


    //need to reset name evertime you load a new project
});
//TODO add a function to save before you switch projects- Dope features
//TODO notice how you could load a html code file into python sandbox
