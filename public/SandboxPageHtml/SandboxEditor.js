var SandboxLanguage = "HTML";


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

var editor = ace.edit("editor");
CreateEditor =  () => {
    ace.require("ace/ext/language_tools");
    editor.setTheme("ace/theme/dracula");
    editor.getSession().setMode("ace/mode/html");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });
    editor.setValue(`<!DOCTYPE html>
<html>
<head>
</head>
<body>
</body>
</html>`,1); //1 = moves cursor to end
}
$(document).ready(function () {
        CreateEditor();
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

mainMod.controller("HTMLSandbox",function($scope){
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

    $scope.downloadCode= function(i){
        project=$scope.projects[i];;
        text = project.code;
        filename = project.name +".html";
        download(filename, text);
    }

});



//TODO add a function to save before you switch projects- Dope features
//TODO notice how you could load a html code file into python sandbox
