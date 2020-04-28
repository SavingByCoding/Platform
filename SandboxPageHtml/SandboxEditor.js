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


