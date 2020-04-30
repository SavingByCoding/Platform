// var userID= "VV9kJoIQ7ieDq52DKSGvBbKeAhA2";
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
$(document).ready(function () {
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
//Code to Submit HW
SubmitHomework=()=>{
    let data= {
        assignment: "HtmlHomework2",
        code: editor.getValue(),
        completed: true,
        correct: false,
        user: userID
    };
    db.collection('users-assignments').doc('SCIy7c4gOTy3dU7Bubyj').update(data);
};


