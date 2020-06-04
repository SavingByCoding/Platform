var language= "PYTHON";
//Setting up the Firebase Homework Retrival

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const assignmentid = urlParams.get('assignmentid');
var assignmentID= assignmentid; //gets assignment id from url

const userassignmentid = urlParams.get('userassignmentid'); //gets user assignment id from url
let UserAssignmentDocument= userassignmentid;


var Assignment_Fields;
var Assignment_Name;
var Assignment_Problem;
var Expected_Output;
var Related_Lesson;

var Kids_Output;

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
            Kids_Output=Output;
            insertText(Output);
        }

        function insertText(text) {
            document.getElementById("outputScreen").value= text;
            OutputConsoleText=text;
        }


    });

    var Assignmentdocument = db.collection('assignments').doc(assignmentID);
    let getDocument = Assignmentdocument.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', doc.data());
                Assignment_Fields=doc.data();
                Assignment_Name= Assignment_Fields.name;
                Assignment_Problem= Assignment_Fields.description;
                Expected_Output= Assignment_Fields.expectedOutput;
                Related_Lesson= Assignment_Fields.lesson;
                DisplayHomework();
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });

});

SubmitHomework=()=>{
    let data= {
        assignment: assignmentID,
        code: editor.getValue(),
        Output: Kids_Output,
        completed: true,
        correct: false,
        user: userID,
        language: language
    };
    db.collection('users-assignments').doc(UserAssignmentDocument).set(data);

};
function DisplayHomework(){
    $("#HomeworkName").html(Assignment_Name);
    $("#AssignmentInfo").html(Assignment_Problem);

}

GoToPFP= function () {
    $("#CorrectAnswer").modal('hide');
    window.open ('../ProfilePage/profile.html','_self',false);
}


