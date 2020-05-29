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
            insertText(Output);
        }

        function insertText(text) {
            document.getElementById("outputScreen").value= text;
        }


    });

});

var moduleA = angular.module("myApp",[]);
moduleA.controller("myCont1",function($scope){
   $scope.name1 = "Unnamed Project 1"
    $scope.name2 = "Unnamed Project 2"
    $scope.name3 = "Unnamed Project 3"
    $scope.name4 = "Unnamed Project 4"
    $scope.name5 = "Unnamed Project 5"
    $scope.name6 = "Unnamed Project 6"
    $scope.name7 = "Unnamed Project 7"
    $scope.name8 = "Unnamed Project 8"
    $scope.name9 = "Unnamed Project 9"
    $scope.name10 = "Unnamed Project 10"
});
function chooseActive(num1){
    if(num1 === 1){
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project01").classList.add("active");

        document.getElementById("t1").style.display = "flex";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "none";

    }
    else if (num1 === 2){
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project02").classList.add("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "flex";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "none";

    }
    else if (num1 === 3){
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project03").classList.add("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "flex";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 4){
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project04").classList.add("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "flex";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 5){
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project05").classList.add("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "flex";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 6){
        var a = document.getElementsByClassName("projectLoadButtons");
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "flex";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 7){
        var a = document.getElementsByClassName("projectLoadButtons");
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "flex";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 8){
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project08").classList.add("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "flex";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 9){
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project10").classList.remove("active");
        document.getElementById("Project09").classList.add("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "flex";
        document.getElementById("t10").style.display = "none";
    }
    else if (num1 === 10){
        document.getElementById("Project01").classList.remove("active");
        document.getElementById("Project02").classList.remove("active");
        document.getElementById("Project03").classList.remove("active");
        document.getElementById("Project04").classList.remove("active");
        document.getElementById("Project05").classList.remove("active");
        document.getElementById("Project06").classList.remove("active");
        document.getElementById("Project07").classList.remove("active");
        document.getElementById("Project08").classList.remove("active");
        document.getElementById("Project09").classList.remove("active");
        document.getElementById("Project10").classList.add("active");

        document.getElementById("t1").style.display = "none";
        document.getElementById("t2").style.display = "none";
        document.getElementById("t3").style.display = "none";
        document.getElementById("t4").style.display = "none";
        document.getElementById("t5").style.display = "none";
        document.getElementById("t6").style.display = "none";
        document.getElementById("t7").style.display = "none";
        document.getElementById("t8").style.display = "none";
        document.getElementById("t9").style.display = "none";
        document.getElementById("t10").style.display = "flex";
    }

}
