let HomeWorkAnswer= "hello"; //We manually Put in
let OutputConsoleText=""; //Kids Code
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
            CheckAnswer();
            insertText(Output);
        }

        function insertText(text) {
            document.getElementById("outputScreen").value= text;
            OutputConsoleText=text;
        }


    });

});

function CheckAnswer(){
    if(HomeWorkAnswer == OutputConsoleText.ignoreCase){
        jQuery.noConflict();
        $("#CorrectAnswer").modal('show');
    }
    else {
        jQuery.noConflict();
        $("#IncorrectAnswer").modal('show');
    }
}