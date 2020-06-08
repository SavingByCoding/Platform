var language= "HTML";
var userID;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const assignmentid = urlParams.get('assignmentid');
var assignmentID= assignmentid; //gets assignment id from url

const userassignmentid = urlParams.get('userassignmentid'); //gets user assignment id from url
let UserAssignmentDocument= userassignmentid;

const lessonid = urlParams.get('lessonid');

var Assignment_Fields;
var Assignment_Name;
var Assignment_Problem;
var Expected_Output;
var Related_Lesson;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        userID = user.uid;
    }
});

//Setting Up the AceEditor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/dracula");
editor.getSession().setMode("ace/mode/html");
 //1 = moves cursor to end

$(document).ready(function () {

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

        editor.getSession().on('change', function() {
            update();
        });

        editor.focus();

    function update()
    {
        let idoc = document.getElementById('outputScreen').contentWindow.document;

        idoc.open();
        idoc.write(editor.getValue());
        idoc.close();
    }
    update();



});

function DisplayHomework(){
    $("#HomeworkName").html(Assignment_Name);
    $("#AssignmentInfo").html(Assignment_Problem);
    editor.setValue(`<!DOCTYPE html>
<html>
<head>
</head>

<body>
</body>

</html>`,1);
    LoadCode();

}


SubmitHomework=()=>{
    let data= {
        assignment: assignmentID,
        output: " ",
        code: editor.getValue().replace("<html>","").replace("</html>","").replace("<body>","").replace("</body>","").replace("<head>","").replace("</head>","").replace("<!DOCTYPE html>",""), //Manipulates the string that submits code
        completed: true,
        status: 'Not Graded Yet',
        user: userID,
        language: language
    };
    db.collection('users-assignments').doc(UserAssignmentDocument).set(data).then(() => {
        window.open('../ViewLessonPage/viewlesson.html?lessonid=' + lessonid, '_self', false);
    });
};

//Things to Implement
//Add the Save the project everytime the user compiles
function SaveCurrentCode(){
    let data= {
        assignment: assignmentID,
        output: "",
        code: editor.getValue().replace("<html>","").replace("</html>","").replace("<body>","").replace("</body>","").replace("<head>","").replace("</head>","").replace("<!DOCTYPE html>",""), //Manipulates the string that submits code
        completed: false,
        status: 'Not Graded Yet',
        user: userID,
        language: language
    };
    db.collection('users-assignments').doc(UserAssignmentDocument).set(data);
}

function LoadCode(){
    var CurrentCodeDocument = db.collection('users-assignments').doc(UserAssignmentDocument);
    let getUserProjects = CurrentCodeDocument.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', doc.data());
                CurrentAssignment = doc.data(); //Loads all UUID for all projects
                editor.setValue(CurrentAssignment.code);
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
}


//Get the Project from assignemntID when initially loaded in
