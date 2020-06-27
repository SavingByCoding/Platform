var userID;
var isnewUser;
function LoadTutorialIfNewUser() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            userID = user.uid;
            var User = db.collection('users').doc(userID);
            let getDocument = User.get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                    } else {
                        console.log('Document data:', doc.data());
                        Userdata = doc.data();
                        isnewUser=Userdata.isAccountCreated;
                        if(!isnewUser){ //If user is false run tutorial
                            t1();

                            let name = doc.data().name;
                            let email = doc.data().email;

                            let url = "https://cors-anywhere.herokuapp.com/http://18.222.29.210:8080/api/email";

                            var xhr = new XMLHttpRequest();
                            xhr.open("POST", url, true);

                            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

                            xhr.onreadystatechange = function() { // Call a function when the state changes.
                                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                                    // Request finished. Do processing here.
                                }
                            }

                            xhr.send(`name=${name}&email=${email}`);
                        }


                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                });
        }
    });
}

function t(){
    //adds overlay
    var overlay = document.getElementById("OVRLY");
    overlay.style.display = "flex";

    //highlights upcoming events
    var upEv = document.getElementById("PFPSIDE")
    upEv.style.zIndex = 1000;

    //hides button that started tutorial
    var btn = document.getElementById("TutorialBtn");
    btn.style.display = 'none';

    //adds button to go to next tutorial
    var btn2 = document.getElementById("t");
    btn2.style.display = "flex"

    //adds text for Tutorial
    var textBox = document.getElementById("addtext");
    textBox.innerText = "Welcome to the tutorial. Check your spam folder for emails regarding further information! Before you do anything else on this website, be sure to edit ur profile and fill out information that can help us contact you and service you better!";
    textBox.style.display = "flex"


}

function t1(){


    //adds overlay
    var overlay = document.getElementById("OVRLY");
    overlay.style.display = "flex";

    //highlights upcoming events
    var upEv = document.getElementById("UpcomingEvents")
    upEv.style.zIndex = 1000;

    //hides button that started tutorial
    var btn = document.getElementById("t");
    btn.style.display = 'none';

    //adds button to go to next tutorial
    var btn2 = document.getElementById("t2");
    btn2.style.display = "flex"

    var upEv = document.getElementById("PFPSIDE")
    upEv.style.zIndex = 0;

    //adds text for Tutorial
    var textBox = document.getElementById("addtext");
    textBox.innerText = "Welcome to the tutorial. Check your spam folder for emails regarding further information!This is where users registered for a course can see important events to remember that are coming up. If you are not in a course, click the 'Register Now' button to check out our courses!";
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

    //displays other button
    var btn = document.getElementById("t10Box")
    btn.style.display = 'flex'
    var btn1 = document.getElementById("t10")
    btn1.style.display = "flex"

    //Highlights Your Groups
    var PythonSand = document.getElementById("Contact");
    PythonSand.style.display = "flex"
    PythonSand.style.zIndex = 1000;

    var contactButt = document.getElementById("contactbutt");
    contactButt.disabled = true;

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

    var contactButt = document.getElementById("contactbutt");
    contactButt.disabled = false;

    var btn = document.getElementById("t10")
    var btn1 = document.getElementById("t10Box")
    btn.style.display = "none"
    btn1.style.display = "none"

    document.getElementById("Contact").style.zIndex = 0;

    var textBox = document.getElementById("addtext");
    textBox.style.display = "none"

    var btn2 = document.getElementById("TutorialBtn")
    btn2.style.display = "inline";

    data={
        isAccountCreated: true
    };

    db.collection('users').doc(userID).update(data);
};
function contact(){
    window.open("../ContactPage/contact.html")
    window.close(this)
}

$("#document").ready(function () {
    LoadTutorialIfNewUser();
});
