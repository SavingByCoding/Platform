//Create variables of all the data that you want to submit
//everytime the user clicks next that info gets stored in the variables
//when the user clicks the final submit the

var FirstName;
var LastName;
var ParentsEmail;
var CourseId;
var paid;
var RegistrationDate;


//Add a function to drop down all the courses available
//Add a function to remove already registered courses



getCurrentDate=()=>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
}

var fname=document.getElementById("fname");
var x= document.getElementById("formcontainer1");
var y= document.getElementById("formcontainer2");
var z= document.getElementById("formcontainer3");
var a=document.getElementById("formcontainer4");
var b=document.getElementById("formcontainer5");
var c=document.getElementById("formcontainer6");

a.style.display="none";
y.style.display="none";
z.style.display="none";
b.style.display="none";
c.style.display="none";


function next1()
{
    y.style.display="block";
    x.style.display="none";
    ParentsEmail= $("#Email").val();
}
function previous1()
{
    x.style.display="block";
    y.style.display="none";
}
function next2()
{
    y.style.display="none";
    z.style.display="block";
    FirstName= $("#FirstName").val();
    LastName= $("#LastName").val();

}
function previous2()
{
    z.style.display="none";
    y.style.display="block";
}
function next3()
{
    z.style.display="none";
    a.style.display="block";
}
function previous3()
{
    a.style.display="none";
    z.style.display="block";
}
function next4()
{
    a.style.display="none";
    b.style.display="block";
}
function previous4()
{
    b.style.display="none";
    a.style.display="block";
}
function next5()
{
    b.style.display="none";
    c.style.display="block";
}
function previous5()
{
    c.style.display="none";
    b.style.display="block";
}

