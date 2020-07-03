var SandboxLanguage = "PYTHON";

$(document).ready(function () {

    $("#CompileButton").click(function () {
        let Code= editor.getValue();
        Code= encodeURI(Code);
        Code= Code.replace(/#/g,"~"); //To make sure Comments Work
        let Output="";
        let Url= "https://cors-anywhere.herokuapp.com/http://18.220.79.42:8080/"+ Code;

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




function chooseActive(num1){
    if(num1 === 1){
        document.getElementById("Project2").classList.remove("active");
        document.getElementById("Project3").classList.remove("active");
        document.getElementById("Project4").classList.remove("active");
        document.getElementById("Project5").classList.remove("active");
        document.getElementById("Project6").classList.remove("active");
        document.getElementById("Project7").classList.remove("active");
        document.getElementById("Project8").classList.remove("active");
        document.getElementById("Project9").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project1").classList.add("active");

        // document.getElementById("t1").style.display = "flow";
        // document.getElementById("t2").style.display = "none";
        // document.getElementById("t3").style.display = "none";
        // document.getElementById("t4").style.display = "none";
        // document.getElementById("t5").style.display = "none";
        // document.getElementById("t6").style.display = "none";
        // document.getElementById("t7").style.display = "none";
        // document.getElementById("t8").style.display = "none";
        // document.getElementById("t9").style.display = "none";
        // document.getElementById("t10").style.display = "none";

    }
    else if (num1 === 2){
        document.getElementById("Project1").classList.remove("active");
        document.getElementById("Project3").classList.remove("active");
        document.getElementById("Project4").classList.remove("active");
        document.getElementById("Project5").classList.remove("active");
        document.getElementById("Project6").classList.remove("active");
        document.getElementById("Project7").classList.remove("active");
        document.getElementById("Project8").classList.remove("active");
        document.getElementById("Project9").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project2").classList.add("active");

        // document.getElementById("t1").style.display = "none";
        // document.getElementById("t2").style.display = "flow";
        // document.getElementById("t3").style.display = "none";
        // document.getElementById("t4").style.display = "none";
        // document.getElementById("t5").style.display = "none";
        // document.getElementById("t6").style.display = "none";
        // document.getElementById("t7").style.display = "none";
        // document.getElementById("t8").style.display = "none";
        // document.getElementById("t9").style.display = "none";
        // document.getElementById("t10").style.display = "none";

    }
    else if (num1 === 3){
        document.getElementById("Project1").classList.remove("active");
        document.getElementById("Project2").classList.remove("active");
        document.getElementById("Project4").classList.remove("active");
        document.getElementById("Project5").classList.remove("active");
        document.getElementById("Project6").classList.remove("active");
        document.getElementById("Project7").classList.remove("active");
        document.getElementById("Project8").classList.remove("active");
        document.getElementById("Project9").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project3").classList.add("active");

        // document.getElementById("t1").style.display = "none";
        // document.getElementById("t2").style.display = "none";
        // document.getElementById("t3").style.display = "flow";
        // document.getElementById("t4").style.display = "none";
        // document.getElementById("t5").style.display = "none";
        // document.getElementById("t6").style.display = "none";
        // document.getElementById("t7").style.display = "none";
        // document.getElementById("t8").style.display = "none";
        // document.getElementById("t9").style.display = "none";
        // document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 4){
        document.getElementById("Project1").classList.remove("active");
        document.getElementById("Project2").classList.remove("active");
        document.getElementById("Project3").classList.remove("active");
        document.getElementById("Project5").classList.remove("active");
        document.getElementById("Project6").classList.remove("active");
        document.getElementById("Project7").classList.remove("active");
        document.getElementById("Project8").classList.remove("active");
        document.getElementById("Project9").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project4").classList.add("active");

        // document.getElementById("t1").style.display = "none";
        // document.getElementById("t2").style.display = "none";
        // document.getElementById("t3").style.display = "none";
        // document.getElementById("t4").style.display = "flow";
        // document.getElementById("t5").style.display = "none";
        // document.getElementById("t6").style.display = "none";
        // document.getElementById("t7").style.display = "none";
        // document.getElementById("t8").style.display = "none";
        // document.getElementById("t9").style.display = "none";
        // document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 5){
        document.getElementById("Project1").classList.remove("active");
        document.getElementById("Project2").classList.remove("active");
        document.getElementById("Project3").classList.remove("active");
        document.getElementById("Project4").classList.remove("active");
        document.getElementById("Project6").classList.remove("active");
        document.getElementById("Project7").classList.remove("active");
        document.getElementById("Project8").classList.remove("active");
        document.getElementById("Project9").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project5").classList.add("active");

        // document.getElementById("t1").style.display = "none";
        // document.getElementById("t2").style.display = "none";
        // document.getElementById("t3").style.display = "none";
        // document.getElementById("t4").style.display = "none";
        // document.getElementById("t5").style.display = "flow";
        // document.getElementById("t6").style.display = "none";
        // document.getElementById("t7").style.display = "none";
        // document.getElementById("t8").style.display = "none";
        // document.getElementById("t9").style.display = "none";
        // document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 6){
        var a = document.getElementsByClassName("projectLoadButtons");
        document.getElementById("Project1").classList.remove("active");
        document.getElementById("Project2").classList.remove("active");
        document.getElementById("Project3").classList.remove("active");
        document.getElementById("Project4").classList.remove("active");
        document.getElementById("Project5").classList.remove("active");
        document.getElementById("Project7").classList.remove("active");
        document.getElementById("Project8").classList.remove("active");
        document.getElementById("Project9").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project6").classList.add("active");

        // document.getElementById("t1").style.display = "none";
        // document.getElementById("t2").style.display = "none";
        // document.getElementById("t3").style.display = "none";
        // document.getElementById("t4").style.display = "none";
        // document.getElementById("t5").style.display = "none";
        // document.getElementById("t6").style.display = "flow";
        // document.getElementById("t7").style.display = "none";
        // document.getElementById("t8").style.display = "none";
        // document.getElementById("t9").style.display = "none";
        // document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 7){
        var a = document.getElementsByClassName("projectLoadButtons");
        document.getElementById("Project1").classList.remove("active");
        document.getElementById("Project2").classList.remove("active");
        document.getElementById("Project3").classList.remove("active");
        document.getElementById("Project4").classList.remove("active");
        document.getElementById("Project5").classList.remove("active");
        document.getElementById("Project6").classList.remove("active");
        document.getElementById("Project8").classList.remove("active");
        document.getElementById("Project9").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project7").classList.add("active");

    //     document.getElementById("t1").style.display = "none";
    //     document.getElementById("t2").style.display = "none";
    //     document.getElementById("t3").style.display = "none";
    //     document.getElementById("t4").style.display = "none";
    //     document.getElementById("t5").style.display = "none";
    //     document.getElementById("t6").style.display = "none";
    //     document.getElementById("t7").style.display = "flow";
    //     document.getElementById("t8").style.display = "none";
    //     document.getElementById("t9").style.display = "none";
    //     document.getElementById("t10").style.display = "none";
     }
    else if (num1 === 8){
        document.getElementById("Project1").classList.remove("active");
        document.getElementById("Project2").classList.remove("active");
        document.getElementById("Project3").classList.remove("active");
        document.getElementById("Project4").classList.remove("active");
        document.getElementById("Project5").classList.remove("active");
        document.getElementById("Project6").classList.remove("active");
        document.getElementById("Project7").classList.remove("active");
        document.getElementById("Project9").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project8").classList.add("active");

        // document.getElementById("t1").style.display = "none";
        // document.getElementById("t2").style.display = "none";
        // document.getElementById("t3").style.display = "none";
        // document.getElementById("t4").style.display = "none";
        // document.getElementById("t5").style.display = "none";
        // document.getElementById("t6").style.display = "none";
        // document.getElementById("t7").style.display = "none";
        // document.getElementById("t8").style.display = "flow";
        // document.getElementById("t9").style.display = "none";
        // document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 9){
        document.getElementById("Project1").classList.remove("active");
        document.getElementById("Project2").classList.remove("active");
        document.getElementById("Project3").classList.remove("active");
        document.getElementById("Project4").classList.remove("active");
        document.getElementById("Project5").classList.remove("active");
        document.getElementById("Project6").classList.remove("active");
        document.getElementById("Project7").classList.remove("active");
        document.getElementById("Project8").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project9").classList.add("active");

        // document.getElementById("t1").style.display = "none";
        // document.getElementById("t2").style.display = "none";
        // document.getElementById("t3").style.display = "none";
        // document.getElementById("t4").style.display = "none";
        // document.getElementById("t5").style.display = "none";
        // document.getElementById("t6").style.display = "none";
        // document.getElementById("t7").style.display = "none";
        // document.getElementById("t8").style.display = "none";
        // document.getElementById("t9").style.display = "flow";
        // document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 10){
        document.getElementById("Project1").classList.remove("active");
        document.getElementById("Project2").classList.remove("active");
        document.getElementById("Project3").classList.remove("active");
        document.getElementById("Project4").classList.remove("active");
        document.getElementById("Project5").classList.remove("active");
        document.getElementById("Project6").classList.remove("active");
        document.getElementById("Project7").classList.remove("active");
        document.getElementById("Project8").classList.remove("active");
        document.getElementById("Project9").classList.remove("active");
        document.getElementById("Project10").classList.add("active");

        // document.getElementById("t1").style.display = "none";
        // document.getElementById("t2").style.display = "none";
        // document.getElementById("t3").style.display = "none";
        // document.getElementById("t4").style.display = "none";
        // document.getElementById("t5").style.display = "none";
        // document.getElementById("t6").style.display = "none";
        // document.getElementById("t7").style.display = "none";
        // document.getElementById("t8").style.display = "none";
        // document.getElementById("t9").style.display = "none";
        // document.getElementById("t10").style.display = "flow";
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

var projectsuuid= [];
mainMod.controller("PYTHONSandbox",function($scope){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $scope.UserID = user.uid;
            console.log($scope.UserID)
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
            $scope.LoadProjects();
        }
    });

    $scope.LoadProjects = function(){ //Loads all project names //Works
        var UserProjectsDocument = db.collection('user-projects').doc($scope.UserID);
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
                            $scope.lang1 = UserProjects.language;
                            break;
                        case 2:
                            $scope.name2 = UserProjects.name;
                            $scope.lang2 = UserProjects.language;
                            break;
                        case 3:
                            $scope.name3 = UserProjects.name;
                            $scope.lang3 = UserProjects.language;
                            break;
                        case 4:
                            $scope.name4 = UserProjects.name;
                            $scope.lang4 = UserProjects.language;
                            break;
                        case 5:
                            $scope.name5 = UserProjects.name;
                            $scope.lang5 = UserProjects.language;
                            break;
                        case 6:
                            $scope.name6 = UserProjects.name;
                            $scope.lang6 = UserProjects.language;
                            break;
                        case 7:
                            $scope.name7 = UserProjects.name;
                            $scope.lang7 = UserProjects.language;
                            break;
                        case 8:
                            $scope.name8 = UserProjects.name;
                            $scope.lang8 = UserProjects.language;
                            break;
                        case 9:
                            $scope.name9 = UserProjects.name;
                            $scope.lang9 = UserProjects.language;
                            break;
                        case 10:
                            $scope.name10 = UserProjects.name;
                            $scope.lang10 = UserProjects.language;
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
    SaveProject = function(){
$("#ProjectName").val($scope.CurrentProjectName);
    };
    SaveChanges = function(){
    //Click save
    //Opens modal
    //Loads the current name of the project
    //You could chnage the name or just hit done
    $scope.CurrentProjectName= $("#ProjectName").val();
    let data= {
        code: editor.getValue(),   //change this for implementing autosave
        language: SandboxLanguage,
        name: $scope.CurrentProjectName
    };
    db.collection('projects').doc($scope.CurrentProjectUUID).set(data);
    $scope.updateProjectName();
    $scope.$apply();
}
$scope.updateProjectName = function (){
    switch ($scope.projectnumber) {
        case "Project1":
            $scope.name1= $scope.CurrentProjectName;
            break;
        case "Project2":
            $scope.name2= $scope.CurrentProjectName;
            break;
        case "Project3":
            $scope.name3= $scope.CurrentProjectName;
            break;
        case "Project4":
            $scope.name4= $scope.CurrentProjectName;
            break;
        case "Project5":
            $scope.name5= $scope.CurrentProjectName;
            break;
        case "Project6":
            $scope.name6= $scope.CurrentProjectName;
            break;
        case "Project7":
            $scope.name7= $scope.CurrentProjectName;
            break;
        case "Project8":
            $scope.name8= $scope.CurrentProjectName;
            break;
        case "Project9":
            $scope.name9= $scope.CurrentProjectName;
            break;
        case "Project10":
            $scope.name10= $scope.CurrentProjectName;
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
                    //editor.setValue($scope.CurrentProjectCode);
                    CheckLangauge();
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
        console.log("part 5")
    };

    $scope.DeleteProjects = function () {

    };
console.log($scope.CurrentProjectLanguage)
    function CheckLangauge() {
        if (($scope.CurrentProjectLanguage==="PYTHON") || ($scope.CurrentProjectLanguage==="EMPTY") ) { //checks if project is empty or HTML
            editor.setValue($scope.CurrentProjectCode); //Changes code when you click a new project

        } else {
            $("#WrongCode").modal();
        }
    }


    //need to reset name evertime you load a new project
});
window.onbeforeunload = function(){ //Reminds a user to save before leaving
    return 'Make sure to save your code';
};
//TODO add a function to save before you switch projects- Dope features
//TODO notice how you could load a html code file into python sandbox
