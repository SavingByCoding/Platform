function t1(){
    //adds overlay
    var overlay = document.getElementById("OVRLY");
    overlay.style.display = "flex";

    //highlights upcoming events
    var upEv = document.getElementById("UpcomingEvents")
    upEv.style.zIndex = 1000;

    //hides button that started tutorial
    var btn = document.getElementById("TutorialBtn");
    btn.style.display = 'none';

    //adds button to go to next tutorial
    var btn2 = document.getElementById("t2");
    btn2.style.display = "flex"

    //adds text for Tutorial
    var textBox = document.getElementById("addtext");
    textBox.innerText = "This is where users registered for a course can see important events to remember that are coming up. If you are not in a course, click the 'Register Now' button to check out our courses!";
    textBox.style.display = "flex"
}

function t2(){
    //sets upcoming events tab back to dim
    var upEv = document.getElementById("UpcomingEvents")
    upEv.style.zIndex = 0;

    //hides button that was just clicked on
    var btn = document.getElementById("t2");
    btn.style.display = 'none';

    //sets course directory button highlighted
    var CD = document.getElementById("CD");
    CD.style.zIndex = 1000;

    //adds button that points next
    var t3 = document.getElementById("t3");
    t3.style.display = "flex";
    document.getElementById("t3Box").style.display = "flex";

    //temporarily disables link for course directory button
    var a = document.getElementById("CDahref")
    a.classList.add("display")

    //adds text for course directory
    var textBox = document.getElementById("addtext");
    textBox.innerText = "This is where you can access the courses they are. Through this link, you can check out the lessons and assignments under each course.";
    textBox.style.display = "flex"
}

function t3(){
        //dims course directory button
        var CD = document.getElementById("CD");
        CD.style.zIndex = 0;

        //Hides previous button
        var t3 = document.getElementById("t3");
        t3.style.display = "none";
        var t3Box = document.getElementById("t3Box");
        t3Box.style.display = "none"

        //adds link back to previous link
        var a = document.getElementById("CDahref")
        a.classList.remove("display")

        //removes link for HTML Sandbox button
        var a = document.getElementById("HTMLSand")
        a.classList.add("display")

        //Adds new button
        var btn = document.getElementById("t4Box")
        btn.style.display = 'flex'
        var btn1 = document.getElementById("t4")
        btn1.style.display = "flex"

        //Highlights HTML sandbox
        var HTMLSand = document.getElementById("HTMLSand");
        HTMLSand.style.display = "flex"
        HTMLSand.style.zIndex = 1000;

        //sets text
        var textBox = document.getElementById("addtext");
    textBox.innerText = "This button takes users registered in a course to a HTML personalized code editor. Make, save, run, and access up to 10 projects at the same time from any platform. Get project ideas with our project helper att the bottom of the page!";
    textBox.style.display = "flex"
}

function t4(){
    //dims HTML Sandbox button
    var HTMLSand = document.getElementById("HTMLSand")
    HTMLSand.style.zIndex = 0;

    //Hides previous button
    var btn = document.getElementById("t4");
    var btn1 = document.getElementById("t4Box")
    btn.style.display = "none"
    btn1.style.display = "none"

    //adds link back to previous button
    var a = document.getElementById("HTMLSand")
    a.classList.remove("display")

    //removes link for HTML Sandbox button
    var a = document.getElementById("PythonSand")
    a.classList.add("display")

    //Adds new button
    var btn = document.getElementById("t5Box")
    btn.style.display = 'flex'
    var btn1 = document.getElementById("t5")
    btn1.style.display = "flex"

    //Highlights Python sandbox
    var PythonSand = document.getElementById("PythonSand");
    PythonSand.style.display = "flex"
    PythonSand.style.zIndex = 1000;

    //sets text
    var textBox = document.getElementById("addtext");
    textBox.innerText = "This button takes users registered in a course to a Python personalized code editor. Make, save, run, and access up to 10 projects at the same time from any platform. Get project ideas with our project helper att the bottom of the page!";
    textBox.style.display = "flex"
}

function t5() {
    //dims Python Sandbox button
    var PythonSand = document.getElementById("PythonSand")
    PythonSand.style.zIndex = 0;

    //Hides previous button
    var btn = document.getElementById("t5");
    var btn1 = document.getElementById("t5Box")
    btn.style.display = "none"
    btn1.style.display = "none"

    //adds link back to previous button
    var a = document.getElementById("PythonSand")
    a.classList.remove("display")


    //Adds new button
    var btn = document.getElementById("t6Box")
    btn.style.display = 'flex'
    var btn1 = document.getElementById("t6")
    btn1.style.display = "flex"

    //Highlights Python sandbox
    var PythonSand = document.getElementById("Announcements");
    PythonSand.style.display = "flex"
    PythonSand.style.zIndex = 1000;

    //sets text
    var textBox = document.getElementById("addtext");
    textBox.innerText = "This is where you can see important announcements regarding their course. Instructors will post urgent announcements/news/quick problems based on the course you are in.";
    textBox.style.display = "flex"
}

function t6() {
    //dims Python Sandbox button
    var PythonSand = document.getElementById("Announcements")
    PythonSand.style.zIndex = 0;

    //Hides previous button
    var btn = document.getElementById("t6");
    var btn1 = document.getElementById("t6Box")
    btn.style.display = "none"
    btn1.style.display = "none"

    //adds link back to previous button
    var a = document.getElementById("PythonSand")
    a.classList.remove("display")

    //Adds new button
    var btn = document.getElementById("t7Box")
    btn.style.display = 'flex'
    var btn1 = document.getElementById("t7")
    btn1.style.display = "flex"

    //Highlights Your Groups
    var PythonSand = document.getElementById("YourGroups");
    PythonSand.style.display = "flex"
    PythonSand.style.zIndex = 1000;

    //sets text
    var textBox = document.getElementById("addtext");
    textBox.innerText = "This is where you can see the classes you are in. There will be something to see here as long as you are registered in a course.";
    textBox.style.display = "flex"
}

function t7() {
    //dims Python Sandbox button
    var PythonSand = document.getElementById("YourGroups")
    PythonSand.style.zIndex = 0;

    //Hides previous button
    var btn = document.getElementById("t7");
    var btn1 = document.getElementById("t7Box")
    btn.style.display = "none"
    btn1.style.display = "none"

    //adds link back to previous button
    var a = document.getElementById("PythonSand")
    a.classList.remove("display")

    //Adds new button
    var btn = document.getElementById("t8Box")
    btn.style.display = 'flex'
    var btn1 = document.getElementById("t8")
    btn1.style.display = "flex"

    //Highlights Your Groups
    var PythonSand = document.getElementById("GR");
    PythonSand.style.display = "flex"
    PythonSand.style.zIndex = 1000;

    //sets text
    var textBox = document.getElementById("addtext");
    textBox.innerText = "This is where students can access services and tools that the course offers. For example,there can be informative videos, presentations, or notes in this space.";
    textBox.style.display = "flex"
}

function t8() {
    //dims Python Sandbox button
    var PythonSand = document.getElementById("GR")
    PythonSand.style.zIndex = 0;

    //Hides previous button
    var btn = document.getElementById("t8");
    var btn1 = document.getElementById("t8Box")
    btn.style.display = "none"
    btn1.style.display = "none"

    //adds link back to previous button
    var a = document.getElementById("PythonSand")
    a.classList.remove("display")

    //Adds new button
    var btn = document.getElementById("t9Box")
    btn.style.display = 'flex'
    var btn1 = document.getElementById("t9")
    btn1.style.display = "flex"

    //Highlights Your Groups
    var PythonSand = document.getElementById("Contact");
    PythonSand.style.display = "flex"
    PythonSand.style.zIndex = 1000;

    //sets text
    var textBox = document.getElementById("addtext");
    textBox.innerText = "This is the quickest way you can contact your teachers or administration! Through this form, we will reach back to you and help you with whatever problem there is!";
    textBox.style.display = "flex"
}

function t9() {

    document.getElementById("OVRLY").style.display = "none"

    var btn = document.getElementById("t9")
    var btn1 = document.getElementById("t9Box")
    btn.style.display = "none"
    btn1.style.display = "none"

    document.getElementById("Contact").style.zIndex = 0;

    var textBox = document.getElementById("addtext");
    textBox.style.display = "none"

    var btn2 = document.getElementById("TutorialBtn")
    btn2.style.display = "inline";
}