var language= "HTML";
//Setting up the Firebase Homework Retrival
var assignmentID="HTMLHomework1";// The actual homework you want to retrieve ONLY CHANGE THIS PLS

var Assignment_Fields;
var Assignment_Name;
var Assignment_Problem;
var Expected_Output;
var Related_Lesson;

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
    editor.setValue("<!-- "+ Assignment_Problem + " -->"+
        `
<!DOCTYPE html>
<html>
<head>
</head>

<body>
</body>

</html>`,1);


}

SubmitHomework=()=>{
    let data= {
        assignment: assignmentID,
        code: editor.getValue(),
        completed: true,
        correct: false,
        user: userID,
        language: language
    };
    db.collection('users-assignments').doc(assignmentID+" from "+ userID).set(data);
};


