var SandboxLanguage = "PYTHON";
var userID;
$(document).ready(function () {

    $("#CompileButton").click(function () {
        let Code= editor.getValue();
          Code= encodeURI(Code);
          Code= Code.replace(/#/g,"~"); //To make sure Comments Work
        let Output="";
        let url = "https://cors-anywhere.herokuapp.com/http://18.220.79.42:8080/api/PythonCompiler/"+Code;
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

mainMod.controller("PYTHONSandbox",function($scope){
$scope.projects=[];
$scope.currentProjectIndex=0;


$scope.loadProjects= function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            userID=user.uid;
            db.collection("Projects").where("language","==",SandboxLanguage).where("userID","==",userID)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let project= {
                            code: doc.data().code,
                            language: doc.data().language,
                            name: doc.data().name,
                            userID: doc.data().userID,
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
    //Fill out here
}

$scope.saveProject= function(){
    $scope.currentProjectCode= editor.getValue();
    let project = $scope.projects[$scope.currentProjectIndex];
    project.name= $scope.currentProjectName;
    project.code= $scope.currentProjectCode;
    let data={
        code: project.code,
        language: project.language,
        name: project.name,
        userID: project.userID
    }
    db.collection("Projects").doc(project.id).update(data).then(function () {
        $scope.$apply();
    });

};

$scope.displayProject= function(i){
    $scope.currentProjectIndex=i;
    $scope.currentProjectCode=$scope.projects[$scope.currentProjectIndex].code;
    $scope.currentProjectName=$scope.projects[$scope.currentProjectIndex].name;
    editor.setValue($scope.currentProjectCode);
    //You click on the project
    //Puts code in the code editor

};


$scope.onLoad= function (){
    $scope.loadProjects();
}
$scope.onLoad();
});
window.onbeforeunload = function(){ //Reminds a user to save before leaving
    return 'Make sure to save your code';
};
//TODO add a function to save before you switch projects- Dope features
//TODO notice how you could load a html code file into python sandbox
