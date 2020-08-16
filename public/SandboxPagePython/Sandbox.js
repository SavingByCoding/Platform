var SandboxLanguage = "PYTHON";
var userID;

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

    $("#CompileButton").click(function () {
        let Code= editor.getValue();
          Code= encodeURI(Code);
          Code= Code.replace(/#/g,"~"); //To make sure Comments Work
        let Output="";
        let url = "https://cors-anywhere.herokuapp.com/http://18.222.29.210:8000/api/PythonCompiler/"+Code;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
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

mainMod.controller("PYTHONSandbox",function($scope){
$scope.projects=[];


if(localStorage.getItem("project") === null){
    localStorage.setItem("project" , "0");
    $scope.currentProjectIndex = localStorage.getItem("project")
}
else{
    $scope.currentProjectIndex = localStorage.getItem("project").toString();
}

let uID;

$scope.loadProjects= function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            userID=user.uid;
            uID = userID
            db.collection("Projects").where("language","==",SandboxLanguage).where("userID","==",userID)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let project= {
                            code: doc.data().code,
                            language: doc.data().language,
                            name: doc.data().name,
                            userID: doc.data().userID,
                            date: doc.data().date,
                            id: doc.id
                        }

                        $scope.projects.push(project) //add the id
                        $scope.$apply();
                    });
                    $scope.displayProject($scope.currentProjectIndex);//Displays the current Project
                })
                .catch(function(error) {
                });
            console.log($scope.projects)
        }
    });
}
$scope.createProject = function(){

    //Get data required for new project
    let newdata={
        code:"",
        language: SandboxLanguage,
        name: $scope.new.project.name,
        userID: uID,
        date: new Date()
    }
    $scope.projects.push(newdata);

    db.collection("Projects").doc(generateUUID()).set(newdata).then(function () {
        location.reload();
    })

    //length of projects array - 1
}

$scope.saveProject= function(i){
    $scope.currentProjectCode= editor.getValue();
    let project = $scope.projects[i];
    project.date = $scope.projects[i].date;
    project.name= $scope.projects[i].name;
    project.code= $scope.currentProjectCode;
    let data={
        code: project.code,
        language: project.language,
        name: project.name,
        userID: project.userID,
        date: project.date
    }
    db.collection("Projects").doc(project.id).update(data).then(function () {
        $scope.$apply();
        location.reload();
    });

};

$scope.displayProject= function(i){
    //$scope.showProjectName(i);
    $scope.currentProjectIndex=i;
    localStorage.setItem("project",i.toString());
    $scope.currentProjectCode=$scope.projects[$scope.currentProjectIndex].code;
    $scope.currentProjectName=$scope.projects[$scope.currentProjectIndex].name;
    editor.setValue($scope.currentProjectCode);
    $scope.showSelectedBtn(i)

    //$scope.$apply();
    //You click on the project
    //Puts code in the code editor

};

$scope.deleteProject = (i) => {
    let project = $scope.projects[i];

    db.collection("Projects").doc(project.id).delete().then(function() {
        console.log("Document successfully deleted!");
        $scope.projects.splice(i,1);
        location.reload()
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });



}
    $scope.downloadCode= function(i){
        project=$scope.projects[i];;
        text = project.code;
        filename = project.name +".py";
        download(filename, text);
    }

$scope.onLoad= function (){
    $scope.loadProjects();
}
$scope.onLoad();

$scope.deleteConfirm = (i) =>{
    $("#deleteModal").modal();
    $("#delete").click(function(){
        $scope.deleteProject(i);
    });
}
$scope.showSelectedBtn = (i) => {
    for (var x = 0; x < $scope.projects.length; x++) {
        var tempID = "project" + x;
        var tempIDBtn = "saveBtn" + x;
        var tempIDTrash = "trashBtn" + x;
        var tempIDDate = "date" + x;

        document.getElementById(tempIDBtn).style.display = "none";
        document.getElementById(tempIDTrash).style.display = "none";
        document.getElementById(tempID).style.background = "#23233b"
    }

    var show = "project" + i;
    document.getElementById(show).style.background = "#dbdbdb";
    var btnID = "saveBtn" + i;
    document.getElementById(btnID).style.display = "block";
    var trashID = "trashBtn" + i;
    document.getElementById(trashID).style.display = "block";

}

});

//TODO add a function to save before you switch projects- Dope features
//TODO notice how you could load a html code file into python sandbox




