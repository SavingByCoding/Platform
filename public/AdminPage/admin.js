let teacherChosen;
firebase.initializeApp({
    apiKey: "AIzaSyBOn9KJJihPr0F0zXNcj_tlHn6tGgxIsMI",
    authDomain: "saving-by-coding.firebaseapp.com",
    databaseURL: "https://saving-by-coding.firebaseio.com",
    projectId: "saving-by-coding",
    storageBucket: "saving-by-coding.appspot.com",
    messagingSenderId: "1001321494305",
    appId: "1:1001321494305:web:7261fc3516fd79bc557060",
    measurementId: "G-GLKDW56H9N"
})
firebase.analytics()

var db = firebase.firestore()
//var app = angular.module('SBCAdmin', [])
var app = mainMod

const generateUUID = () => { // V4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}
function GoBack(){
    window.location.href = "index.html"
}

app.controller('AppController', ($scope) => {
    $scope.currentAdminUserID;
    $scope.isAdmin;
    $scope.toDate = (timeObj) => {
        let t = new Date(1970, 0, 1)
        t.setSeconds(timeObj.seconds)
        return t
    }
    $scope.checkIsTeacher= function(){
        firebase.auth().onAuthStateChanged((user) => {
            $scope.currentAdminUserID=user.uid;
            db.collection("users")
                .where("userId", "==", user.uid)
                .get()
                .then((qs) => {
                    let doc = qs.docs[0];
                    console.log("hello")
                    if ((doc.data().userType == '2')) {
                        $scope.isTeacher= true;
                        $scope.$apply();
                        $scope.getGroups()
                        $scope.fillArrayOfStudentsTeacherTeaches();
                    }
                    if (doc.data().userType == '3'){
                        $scope.isAdmin=true;
                        $scope.getGroups();
                        $scope.$apply();
                    }
                })
        })
    };
    $scope.checkIsTeacher();

    $scope.tabs = ["Course Creation", "Group Management", "User Management", "Event Management", "Grading", "Registrations"]
    $scope.currentTab = 0
    $scope.new = {event: {}, user: {}, lesson: {}, unit: {}, lesson: {}, assignment: {}, resource: {}}
    $scope.crudStates = {
        event: "Create",
        user: "Create",
        course: "Create",
        unit: "Create",
        lesson: "Create",
        assignment: "Create",
        resource: "Create",
    }

    // User Variables
    $scope.users = []
    $scope.showStudents = true

    // User Functions
    $scope.toggleShowStudents = () => {
        $scope.showStudents = !$scope.showStudents
    }

    $scope.clearCrudUserModal = () => {
        $scope.new.user = {
            name: "",
            dateOfBirth: "",
            userType: ""
        }
    }

    $scope.launchEditUserModal = (i) => {
        $scope.crudStates.user = 'Edit'
        $scope.new.user = $scope.users[i]
        $scope.new.user.dateOfBirth = new Date($scope.new.user.dateOfBirth)
        $scope.new.user.dateJoined = new Date($scope.new.user.dateJoined)
    }

    $scope.launchCreateUserModal = () => {
        $scope.crudStates.user = 'Create'
        $scope.new.user = {}
    }

    $scope.crudUser = () => {
        if ($scope.crudStates.user == "Create") $scope.createUser()
        else if ($scope.crudStates.user == "Edit") $scope.editUser()
    }

    $scope.createUser = () => {

    }

    $scope.editUser = () => {
        db.collection("users").doc($scope.new.user.id).update({
            name: $scope.new.user.name,
            dateOfBirth: $scope.new.user.dateOfBirth,
            userType: $scope.new.user.userType
        }).then(() => {
            for (let i = 0; i < $scope.users.length; i++) {
                if ($scope.users.id == $scope.new.user.id) {
                    $scope.users[i].name = $scope.new.user.name
                    $scope.users[i].dateOfBirth = $scope.new.user.dateOfBirth
                    $scope.users[i].userType = $scope.new.user.userType
                    return
                }
            }
        })
    }

    $scope.toggleUserStudent = (i) => {
        let user = $scope.users[i]
        db.collection("users").doc(user.id).update({
            userType: (user.userType === '2') ? '1' : '2'
        }).then(() => {
            $scope.users[i].userType = (user.userType === '2') ? '1' : '2'
            $scope.$apply()
        })
    }
    $scope.toggleUserAdmin = (i) => {
        //Get current user usertype
        //if there type is admin they can use the button
        //if they arent admin a modal pops up saying that they are restricted to that access

        if(!$scope.isTeacher){
            let user = $scope.users[i]
            db.collection("users").doc(user.id).update({
                userType: (user.userType === '2') ? '3' : '2'
            }).then(() => {
                $scope.users[i].userType = (user.userType === '2') ? '3' : '2'
                $scope.$apply()

            })
        }
        else{
            $("#AccessDenied").modal("show");
        }
    }

    $scope.deleteUser = (i) => {
        let user = $scope.users[i]
        db.collection("users").doc(user.id).delete().then(() => {
            $scope.users.splice(i, 1)
            $scope.$apply()
        })
    }

    $scope.getUsers = () => {
        $scope.users = []
        db.collection("users").get().then((querySnapshot) => {
            for (var i = 0; i < querySnapshot.docs.length; i++) {
                var doc = querySnapshot.docs[i]
                $scope.users.push({
                    id: doc.id,
                    userId: doc.data().userId,
                    name: doc.data().name,
                    userType: doc.data().userType,
                    dateJoined: $scope.toDate(doc.data().dateJoined)
                })
            }

            const compare = (a,b) => {
                if (a.dateJoined.getTime() < b.dateJoined.getTime()){
                    return 1
                }
                if (a.dateJoined.getTime() > b.dateJoined.getTime()){
                    return -1
                }
                return 0
            }
            $scope.events.sort(compare)
            $scope.$apply()
        })
    }

    // Event Variables
    $scope.events = []
    $scope.showArchivedEvents = false

    // Event Functions
    $scope.toggleShowArchivedEvents = () => {
        $scope.showArchivedEvents = !$scope.showArchivedEvents
    }

    $scope.clearCrudEventModal = () => {
        $scope.new.event = {
            name: "",
            link: "",
            description: "",
            time: "",
            teacherName:"",
            isDemo:false,
            teacherID:""
        }
    }

    $scope.submitTeacherEvents = (doc) =>{
        //gets teacher doc as parameter
        $scope.new.event.teacherName = doc.data().name;
        $scope.new.event.teacherID = doc.data().userId;
    }
//HEREEEEEEEEEEE



    $scope.launchEditEventModal = (i) => {
        $scope.crudStates.event = 'Edit'
        $scope.new.event = $scope.events[i]
        $scope.new.event.time = new Date($scope.new.event.time);
        //come back too
    }

    $scope.launchCreateEventModal = () => {
        $scope.crudStates.event = 'Create'
        $scope.new.event = {
        }
    }
    $scope.checkAllFieldsEvents = () =>{
        if($scope.new.event.name === "" || $scope.new.event.link === "" ||$scope.new.event.description === "" || !$scope.new.event.time || !$scope.new.event.teacherName === "" || !$scope.new.event.teacherID) {
            return true;
        }
        else return false;
    }
    $scope.crudEvent = () => {
        if ($scope.crudStates.event == "Create"){
            if($scope.checkAllFieldsEvents()){
                alert("Make sure all fields are filled out. Events can only be made when all fields are filled out.")
            }
            else
                $scope.createEvent();
        }

        else if ($scope.crudStates.event == "Edit")
                $scope.editEvent()

    }

    $scope.createEvent = () => {
        // $scope.new.event.isDemoClass = document.getElementById("demoClass").value;
        // if($scope.new.event.isDemoClass === "boolean:true"){
        //     $scope.new.event.isDemoClass = true;
        // }
        // else
        //     $scope.new.event.isDemoClass = false;

        let eventId = generateUUID()
        let event = {
            archived: false,
            name: $scope.new.event.name,
            link: $scope.new.event.link,
            description: $scope.new.event.description,
            time: $scope.new.event.time,
            teacherName:$scope.new.event.teacherName,
            teacherID:$scope.new.event.teacherID,
            isDemo: $scope.new.event.isDemo,
            groups: []
        }
        db.collection("events").doc(eventId).set(event).then(() => {
            $scope.new.event = {}
            event.id = eventId
            $scope.events.unshift(event)
            $scope.$apply()
        })
    }

    $scope.editEvent = () => {
        // if($scope.new.event.isDemoClass === "boolean:true"){
        //     $scope.new.event.isDemoClass = true;
        // }
        // else
        //     $scope.new.event.isDemoClass = false;

        db.collection("events").doc($scope.new.event.id).update({
            name: $scope.new.event.name,
            link: $scope.new.event.link,
            description: $scope.new.event.description,
            time: $scope.new.event.time,
            teacherName:$scope.new.event.teacherName,
            teacherID:$scope.new.event.teacherID,
            isDemo: $scope.new.event.isDemo,
            groups: $scope.new.event.groups
        }).then(() => {
            for (let i = 0; i < $scope.events.length; i++) {
                if ($scope.events.id == $scope.new.event.id) {
                    $scope.events[i].name = $scope.new.event.name
                    $scope.events[i].link = $scope.new.event.link
                    $scope.events[i].description = $scope.new.event.description
                    $scope.events[i].time = $scope.new.event.time
                    $scope.events[i].teacherName=$scope.new.event.teacherName;
                    $scope.events[i].isDemo = $scope.new.event.isDemo;
                    $scope.events[i].teacherID=$scope.new.event.teacherID;
                    $scope.events[i].groups = $scope.new.event.groups
                    return
                }
            }
        })
    }

    $scope.archivePastClasses = () =>{
        db.collection("events").where("archived", "==", false)
            .get()
            .then(function(querySnapshot){
                querySnapshot.forEach(function(doc){
                    if(doc.data().time.toDate() < new Date()){
                        db.collection("events").doc(doc.id).update({
                            archived: true
                        })
                        $scope.$apply();
                    }

                })
            })
        $scope.getEvents();
    }

    $scope.toggleEventArchived = (i) => {
        let event = $scope.events[i]
        db.collection("events").doc(event.id).update({
            archived: !event.archived
        }).then(() => {
            $scope.events[i].archived = !$scope.events[i].archived
            $scope.$apply()
        })
    }

    $scope.deleteEvent = (i) => {
        let event = $scope.events[i]
        db.collection("events").doc(event.id).delete().then(() => {
            $scope.events.splice(i, 1)
            $scope.$apply()
        })
    }

    $scope.getEvents = () => {
        $scope.events = []
        db.collection("events").get().then((querySnapshot) => {
            for (var i = 0; i < querySnapshot.docs.length; i++) {
                var doc = querySnapshot.docs[i]
                if(($scope.currentAdminUserID===doc.data().teacherID)|($scope.isAdmin)){
                    $scope.events.push({
                        id: doc.id,
                        name: doc.data().name,
                        link: doc.data().link,
                        description: doc.data().description,
                        time: doc.data().time.toDate(),
                        teacherName: doc.data().teacherName,
                        teacherID:doc.data().teacherID,
                        groups: doc.data().groups,
                        archived: doc.data().archived,
                        isDemo: doc.data().isDemo
                    })
                }
            }

            const compare = (a, b) => {
                if (a.time.getTime() < b.time.getTime()){
                    return 1
                }
                if (a.time.getTime() > b.time.getTime()){
                    return -1
                }
                return 0
            }
            $scope.events.sort(compare)
            $scope.$apply()
        })
    }

    // Group Variables
    $scope.groups = []

    // Group Functions
    $scope.clearCrudGroupModal = () => {
        db.collection("users").where("userType", "==", "2")
            .get()
            .then(function(querySnapshot) {
                $scope.teachers=[];
                querySnapshot.forEach(function(doc) {
                    $scope.teachers.push(doc);
                    console.log(doc.data().name + " " + doc.data().userType);
                });
            })

        $scope.new.group = {
            name: "",
            description: "",
            teacherName: "", //THis is the teachers name
            teacherID:"",
            startTime:"",
            endTime:"",
            startDate:"",
            course:"",
            isOpen:false,
            selectedDates:[],
            users: []
        }
    }

    $scope.launchEditGroupModal = (i) => {
        $scope.crudStates.group = 'Edit'
        $scope.new.group = $scope.groups[i]
        $scope.displayClassDays();
    }

    $scope.launchCreateGroupModal = () => {
        $scope.crudStates.group = 'Create'
        $scope.new.group = {
            name: "",
            description: "",
            teacherName:"",
            teacherID:"",
            startTime:"",
            endTime:"",
            startDate:"",
            course:"",
            isOpen:false,
            selectedDates:[],
            users: []
        }
        // $scope.displayClassDays();
    }

    $scope.crudGroup = () => {
        if ($scope.crudStates.group == "Create") {
            $scope.getSelectedDates();
            if($scope.checkAllFieldsGroup())
                alert("All fields must be filled out before a group can be made. You are missing one or more fields!")
                else{
                $scope.createGroup();
                }
        }

        else if ($scope.crudStates.group == "Edit"){
                $scope.editGroup();

        }
    }
    $scope.searchParameters = "";
    $scope.submitTeacherGroups = (doc) =>{
            //gets teacher doc as parameter
        $scope.new.group.teacherName = doc.data().name;
        $scope.new.group.teacherID = doc.data().userId;
        teacherChosen = true;
    }
$scope.checkAllFieldsGroup = () =>{
        if($scope.new.group.name === "" || $scope.new.group.description === "" || $scope.new.group.teacherName === "" || $scope.new.group.teacherID === "" || !$scope.new.group.startTime || !$scope.new.group.endTime|| !$scope.new.group.startDate|| $scope.new.group.course === ""||$scope.new.group.selectedDates.length <1)
            return true;
    else return false;
}


    $scope.createGroup = () => {
        $scope.getSelectedDates();
        let groupId = generateUUID()
        let group = {
            name: $scope.new.group.name,
            description: $scope.new.group.description,
            teacherName: $scope.new.group.teacherName, //teacher name
            teacherID:$scope.new.group.teacherID,
            startTime: $scope.new.group.startTime,
            endTime: $scope.new.group.endTime,
            startDate: $scope.new.group.startDate,
            course: $scope.new.group.course,
            isOpen: $scope.new.group.isOpen,
            selectedDates:$scope.new.group.selectedDates,
            users: [],
            isArchived: false
        }
        db.collection("groups").doc(groupId).set(group).then(() => {
            $scope.new.group = {}
            group.id = groupId
            $scope.groups.unshift(group)
            $scope.$apply()
        })
    }

    $scope.editGroup = () => {
        $scope.new.group.selectedDates= [];
        $scope.getSelectedDates();
        db.collection("groups").doc($scope.new.group.id).update({
            name: $scope.new.group.name,
            description: $scope.new.group.description,
            teacherName: $scope.new.group.teacherName,
            teacherID: $scope.new.group.teacherID,
            startTime: $scope.new.group.startTime,
            endTime: $scope.new.group.endTime,
            startDate: $scope.new.group.startDate,
            course: $scope.new.group.course,
            isOpen: $scope.new.group.isOpen,
            selectedDates:$scope.new.group.selectedDates,
            users: $scope.new.group.users
        }).then(() => {
            for (let i = 0; i < $scope.groups.length; i++) {
                if ($scope.groups.id == $scope.new.group.id) {
                    $scope.groups[i].name = $scope.new.group.name
                    $scope.groups[i].description = $scope.new.group.description
                    $scope.groups[i].teacherName= $scope.new.group.teacherName
                    $scope.groups[i].teacherID=$scope.new.group.teacherID
                    $scope.groups[i].startTime= $scope.new.group.startTime
                    $scope.groups[i].endTime= $scope.new.group.endTime
                    $scope.groups[i].startDate= $scope.new.group.startDate;
                    $scope.groups[i].course= $scope.new.group.course
                    $scope.groups[i].isOpen= $scope.new.group.isOpen
                    $scope.groups[i].selectedDates= $scope.new.group.selectedDates
                    $scope.groups[i].users = $scope.new.group.users
                    return
                }
            }
        })
    }
    $scope.getSelectedDates= function (){
        console.log($scope.new.group.selectedDates)
        if($("#Monday").is(':checked'))
            $scope.new.group.selectedDates.push("Monday");
        if($("#Tuesday").is(':checked'))
            $scope.new.group.selectedDates.push("Tuesday");
        if($("#Wednesday").is(':checked'))
            $scope.new.group.selectedDates.push("Wednesday");
        if($("#Thursday").is(':checked'))
            $scope.new.group.selectedDates.push("Thursday");
        if($("#Friday").is(':checked'))
            $scope.new.group.selectedDates.push("Friday");
        if($("#Saturday").is(':checked'))
            $scope.new.group.selectedDates.push("Saturday");
        if($("#Sunday").is(':checked'))
            $scope.new.group.selectedDates.push("Sunday");
    }


    $scope.deleteGroup = (i) => {
        let group = $scope.groups[i]

        db.collection('events').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                let newArr = [];
                // console.log(doc.data().name) <-- this code will spam the console with thousands of lines of code, use for troubleshooting only LOL

                //makes an array for each doc that contains the original array minus the group that just got deleted
                for (x in doc.data().groups){
                    if(!(doc.data().groups[x] === group.id)){
                           newArr.push(doc.data().groups[x]);
                    }
                }

                //prepares the new data to be set by passing the same value to all the fields except "groups" array
                //the groups array is set to the newly made array (above) that does not include the deleted group
                let data = {
                    archived : doc.data().archived,
                    description: doc.data().description,
                    groups: newArr,
                    link: doc.data().link,
                    name: doc.data().name,
                    time: doc.data().time
                }

                //doc is set to essentially itself with only the groups array differing if a group was deleted
                db.collection("events").doc(doc.id).set(data);
            })
        });


        db.collection("groups").doc(group.id).delete().then(() => {
            $scope.groups.splice(i, 1)
            $scope.$apply()
        })
    }
    $scope.archiveGroup= function(i){
        let group = $scope.groups[i];
        var archiveState = $scope.groups[i].isArchived;

        console.log(archiveState);
        let setArchiveState = !archiveState
        $scope.groups[i].isArchived === setArchiveState;
        if(!archiveState){
           $scope.showArchiveState = "Unarchive";
        }
        else $scope.showArchiveState = "Archive";


        db.collection("groups").doc(group.id).update({
            isArchived: setArchiveState
        }).then(function () {
            $scope.archiveRegistration(group,setArchiveState);
            archiveState = $scope.groups[i].isArchived;
            location.reload();
        })

    };
    $scope.groupsQuery= "";
    $scope.archiveRegistration= function(group, newState){ //takes in group
        let students = group.users;//their uuid
        console.log(students)
        console.log(newState)
        students.forEach(function (student) {
            console.log(student);
            db.collection("registrations").where("userId", "==", student).where("courseId","==",group.course)
                .get()
                .then(function(querySnapshot) {

                    if(querySnapshot.empty){
                        console.log("No registration found")
                    }
                    else
                        console.log("Registrations found")

                    querySnapshot.forEach(function(doc) {
                        console.log("Found")
                        db.collection("registrations").doc(doc.id).update({
                            isExpired: newState
                        });

                        //Puts the registration as Expired
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
        });
    }
    $scope.archiveQueryTitle = "Showing All Classes"
    $scope.changeGroupsQuery = (num) => {
            if(num === 1){
                $scope.archiveQuery = false;
                $scope.archiveQueryTitle = "Showing Archived Classes"
            }
            else if(num === 2){
                $scope.archiveQuery = true;
                $scope.archiveQueryTitle = "Showing Unarchived Classes"
            }
            else if(num === 3){
                $scope.archiveQuery = "";
                $scope.archiveQueryTitle = "Showing All Classes"
            }
    }

    $scope.getGroups = () => { //Add a function that only gets groups that the user is in
        $scope.groups = []
        db.collection("groups").get().then((querySnapshot) => {
            for (var i = 0; i < querySnapshot.docs.length; i++) {
                var doc = querySnapshot.docs[i]
                if(($scope.currentAdminUserID===doc.data().teacherID)| ($scope.isAdmin)) {

                    if(doc.data().isArchived){
                        $scope.showArchiveState = "Unarchive"
                    }
                    else $scope.showArchiveState = "Archive"

                    $scope.groups.push({
                        id: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                        teacherName: doc.data().teacherName,
                        teacherID:doc.data().teacherID,
                        startTime: doc.data().startTime.toDate(),
                        endTime: doc.data().endTime.toDate(),
                        startDate: doc.data().startDate.toDate(),
                        course: doc.data().course,
                        isOpen: doc.data().isOpen,
                        selectedDates: doc.data().selectedDates,
                        isArchived: doc.data().isArchived,
                        archiveStateName: $scope.showArchiveState,
                        users: doc.data().users
                    })
                }
            }
            $scope.$apply();
        })
    }
    $scope.displayClassDays= function (){
        for(let i=0;i<$scope.new.group.selectedDates.length;i++){
            switch ($scope.new.group.selectedDates[i]) {
                case "Monday":
                    $('#Monday').attr('checked', true);
                    break;
                case "Tuesday":
                    $('#Tuesday').attr('checked', true);
                    break;
                case "Wednesday":
                    $('#Wednesday').attr('checked', true);
                    break;
                case "Thursday":
                    $('#Thursday').attr('checked', true);
                    break;
                case "Friday":
                    $('#Friday').attr('checked', true);
                    break;
                case "Saturday":
                    $('#Saturday').attr('checked', true);
                    break;
                case "Sunday":
                    $('#Sunday').attr('checked', true);
                    break;

            }
        }

    }
    $scope.getCoursesForGroups= function(){
        $scope.courses=[];
        db.collection('courses').get().then((snapshot)=>{
            snapshot.docs.forEach(doc=>{
                $scope.courses.push(doc);
                $scope.$apply();
            })
        });
    };

    $scope.getTeachersForGroups = () =>{
        $scope.teachers = [];
        db.collection("users").get().then((snapshot) =>{
           snapshot.docs.forEach(doc=>{
              if(doc.data().userType === "2"){
                  $scope.teachers.push(doc);
                  $scope.$apply();
              }

           });
        });
    }

    $scope.getCoursesForGroups();
    $scope.getTeachersForGroups();

    $scope.assignmentsQuery = "";

    // Group Membership Modal

    $scope.launchChangeGroupMembershipModal = (i) => {
        $scope.currentGroupMembership = i
        $scope.groupMembership = []
        for (let user of $scope.users) {
            $scope.groupMembership.push({
                id: user.id,
                userId: user.userId,
                name: user.name,
                inGroup: false,
                selected: false
            })
        }
        let usersInGroup = $scope.groups[i].users
        for (let j = 0; j < $scope.groupMembership.length; j++) {
            for (let k = 0; k < usersInGroup.length; k++) {
                if ($scope.groupMembership[j].userId == usersInGroup[k]) {
                    $scope.groupMembership[j].inGroup = true
                    $scope.groupMembership[j].selected = true
                }
            }
        }
    }

    $scope.selectUserMembership = (i) => {
        $scope.groupMembership[i].selected = !$scope.groupMembership[i].selected
    }

    $scope.changeGroupMembership = () => {
        let userIds = []
        for (let user of $scope.groupMembership) {
            if (user.selected) {
                userIds.push(user.userId)
            }
        }
        db.collection("groups").doc($scope.groups[$scope.currentGroupMembership].id).update({
            users: userIds
        }).then(() => {
            $scope.groups[$scope.currentGroupMembership].users = userIds
            $scope.$apply()
        })
    }

    // Event Membership Modal

    $scope.launchChangeEventMembershipModal = (i) => {
        $scope.currentEventMembership = i
        $scope.eventMembership = []
        for (let group of $scope.groups) {
            $scope.eventMembership.push({
                groupId: group.id,
                name: group.name,
                inEvent: false,
                selected: false
            })
        }
        let groupsInEvent = $scope.events[i].groups
        for (let j = 0; j < $scope.eventMembership.length; j++) {
            for (let k = 0; k < groupsInEvent.length; k++) {
                if ($scope.eventMembership[j].groupId == groupsInEvent[k]) {
                    $scope.eventMembership[j].inEvent = true
                    $scope.eventMembership[j].selected = true
                }
            }
        }
    }

    $scope.selectGroupMembership = (i) => {
        $scope.eventMembership[i].selected = !$scope.eventMembership[i].selected
    }

    $scope.changeEventMembership = () => {
        let groupIds = []
        for (let group of $scope.eventMembership) {
            if (group.selected) {
                groupIds.push(group.groupId)
            }
        }
        db.collection("t").doc($scope.events[$scope.currentEventMembership].id).update({
            groups: groupIds
        }).then(() => {
            $scope.events[$scope.currentEventMembership].groups = groupIds
            $scope.$apply()
        })
    }

    // Courses Variables
    $scope.courses = []
    $scope.selectedCourse = null
    $scope.units = []
    $scope.selectedUnit = null
    $scope.lessons = []
    $scope.selectedLesson = null
    $scope.courseCreationAssignments = []
    $scope.resources = []

    // Course/Unit/Lesson Deletes

    const deleteAllFromQuerySnapshot = (querySnapshot) => {
        var batch = db.batch()
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref)
        })
        batch.commit()
    }

    const deleteCourse = (id) => {
        db.collection("courses").doc(id).delete().then(() => {
            for (let i = 0; i < $scope.courses.length; i++) {
                if ($scope.courses[i].id === id) {
                    $scope.courses.splice(i, 1)
                    break
                }
            }
            $scope.selectedCourse = null
            $scope.selectedUnit = null
            $scope.selectedLesson = null
            $scope.units = []
            $scope.lessons = []
            $scope.courseCreationAssignments = []
            $scope.resources = []
            $scope.$apply()
        })
        db.collection("units").where("course", "==", id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                deleteUnit(doc.id)
            })
        })
    }

    const deleteUnit = (id) => {
        db.collection("units").doc(id).delete().then(() => {
            for (let i = 0; i < $scope.units.length; i++) {
                if ($scope.units[i].id === id) {
                    $scope.units.splice(i, 1)
                    break
                }
            }
            $scope.selectedUnit = null
            $scope.selectedLesson = null
            $scope.lessons = []
            $scope.courseCreationAssignments = []
            $scope.resources = []
            $scope.$apply()
        })
        db.collection("lessons").where("unit", "==", id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                deleteLesson(doc.id)
            })
        })
    }

    const deleteLesson = (id) => {
        // Delete lesson
        db.collection("lessons").doc(id).delete().then(() => {
            // Remove lesson from scope
            for (let i = 0; i < $scope.lessons.length; i++) {
                if ($scope.lessons[i].id === id) {
                    $scope.lessons.splice(i, 1)
                    break
                }
            }
            $scope.selectedLesson = null
            $scope.courseCreationAssignments = []
            $scope.resources = []
            $scope.$apply()
        })
        // Delete groups-lessons
        db.collection("groups-lessons").where("lesson", "==", id).get().then(deleteAllFromQuerySnapshot)
        // Delete resources
        db.collection("resources").where("lesson", "==", id).get().then(deleteAllFromQuerySnapshot)
        // Delete assignments
        db.collection("assignments").where("lesson", "==", id).get().then((querySnapshot) => {
            var assignmentBatch = db.batch()
            var assignmentIds = []
            querySnapshot.forEach((doc) => {
                assignmentIds.push(doc.id)
                assignmentBatch.delete(doc.ref)
            })
            assignmentBatch.commit()
            // Delete all users-assignments
            db.collection("users-assignments").where("assignment", "in", assignmentIds).get().then(deleteAllFromQuerySnapshot)
        })
    }

    const deleteAssignment = (id) => {
        db.collection("assignments").doc(id).delete().then(() => {
            for (let i = 0; i < $scope.courseCreationAssignments.length; i++) {
                if ($scope.courseCreationAssignments[i].id === id) {
                    $scope.courseCreationAssignments.splice(i, 1)
                    $scope.$apply()
                    break
                }
            }
        })
    }

    const deleteResource = (id) => {
        db.collection("resources").doc(id).delete().then(() => {
            for (let i = 0; i < $scope.resources.length; i++) {
                if ($scope.resources[i].id === id) {
                    $scope.resources.splice(i, 1)
                    $scope.$apply()
                    break
                }
            }
        })
    }

    // Courses Functions
    $scope.getCourses = () => {
        $scope.courses = []
        $scope.units = []
        $scope.lessons = []
        db.collection("courses").get().then((querySnapshot) => {
            for (var i = 0; i < querySnapshot.docs.length; i++) {
                var doc = querySnapshot.docs[i]
                $scope.courses.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    ordinalNumber: doc.data().ordinalNumber,
                    demo: doc.data().demo ? "true" : "false"
                })
            }
            $scope.courses.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0))
            $scope.$apply()
        })
    }

    $scope.getUnits = () => {
        $scope.units = []
        $scope.lessons = []
        console.log($scope.courses[$scope.selectedCourse].id)
        db.collection("units").where("course", "==", $scope.courses[$scope.selectedCourse].id)
            .get().then((querySnapshot) => {
            for (var i = 0; i < querySnapshot.docs.length; i++) {
                var doc = querySnapshot.docs[i]
                $scope.units.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    course: doc.data().course,
                    ordinalNumber: doc.data().ordinalNumber
                })
            }
            $scope.units.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0))
            $scope.$apply()
        })
    }

    $scope.getLessons = () => {
        $scope.lessons = []
        console.log($scope.units[$scope.selectedUnit].id)
        db.collection("lessons").where("unit", "==", $scope.units[$scope.selectedUnit].id)
            .get().then((querySnapshot) => {
            for (var i = 0; i < querySnapshot.docs.length; i++) {
                var doc = querySnapshot.docs[i]
                $scope.lessons.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    unit: doc.data().unit,
                    ordinalNumber: doc.data().ordinalNumber
                })
            }
            $scope.lessons.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0))
            $scope.$apply()
        })
    }

    $scope.getCourseCreationAssignments = () => {
        $scope.courseCreationAssignments = []
        db.collection("assignments").where("lesson", "==", $scope.lessons[$scope.selectedLesson].id)
            .get().then((querySnapshot) => {
            for (let i = 0; i < querySnapshot.docs.length; i++) {
                let doc = querySnapshot.docs[i]
                let assignment = { id: doc.id }
                Object.assign(assignment, doc.data())
                $scope.courseCreationAssignments.push(assignment)
            }
            $scope.courseCreationAssignments.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0))
            $scope.$apply()
        })
    }

    $scope.getResources = () => {
        $scope.resources = []
        db.collection("resources").where("lesson", "==", $scope.lessons[$scope.selectedLesson].id)
            .get().then((querySnapshot) => {
            for (let i = 0; i < querySnapshot.docs.length; i++) {
                let doc = querySnapshot.docs[i]
                let resource = { id: doc.id }
                Object.assign(resource, doc.data())
                $scope.resources.push(resource)
            }
            $scope.resources.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0))
            $scope.$apply()
        })
    }

    $scope.changeSelectedCourse = (i) => {
        if ($scope.selectedCourse === i) {
            $scope.selectedCourse = null
        }
        else {
            $scope.selectedCourse = i
            $scope.getUnits()
        }
        $scope.selectedUnit = null
        $scope.selectedLesson = null
        $scope.units = []
        $scope.lessons = []
        $scope.courseCreationAssignments = []
        $scope.resources = []
    }

    $scope.changeSelectedUnit = (i) => {
        if ($scope.selectedUnit === i) {
            $scope.selectedUnit = null
        }
        else {
            $scope.selectedUnit = i
            $scope.getLessons()
        }
        $scope.selectedLesson = null
        $scope.lessons = []
        $scope.courseCreationAssignments = []
        $scope.resources = []
    }

    $scope.changeSelectedLesson = (i) => {
        if ($scope.selectedLesson === i) {
            $scope.selectedLesson = null
        }
        else {
            $scope.selectedLesson = i
            $scope.getCourseCreationAssignments()
            $scope.getResources()
        }
        $scope.courseCreationAssignments = []
        $scope.resources = []
    }

    // Course CRUD Functions
    $scope.clearCrudCourseModal = () => {
        $scope.new.course = {
            name: "",
            description: "",
            demo: "",
        }
    }

    $scope.launchEditCourseModal = (i) => {
        $scope.crudStates.course = 'Edit'
        $scope.new.course = $scope.courses[i]
    }

    $scope.launchCreateCourseModal = () => {
        $scope.crudStates.course = 'Create'
        $scope.new.course = {}
    }

    $scope.crudCourse = () => {
        if ($scope.crudStates.course == "Create") $scope.createCourse()
        else if ($scope.crudStates.course == "Edit") $scope.editCourse()
    }

    $scope.createCourse = () => {
        let courseId = generateUUID()
        let course = {
            name: $scope.new.course.name,
            description: $scope.new.course.description,
            demo: $scope.new.course.demo === "true"
        }
        db.collection("courses").doc(courseId).set(course).then(() => {
            $scope.new.course = {}
            course.id = courseId
            $scope.courses.push(course)
            $scope.$apply()
        })
    }

    $scope.editCourse = () => {
        db.collection("courses").doc($scope.new.course.id).update({
            name: $scope.new.course.name,
            description: $scope.new.course.description,
            demo: $scope.new.course.demo === "true"
        }).then(() => {
            for (let i = 0; i < $scope.courses.length; i++) {
                if ($scope.courses.id == $scope.new.course.id) {
                    $scope.courses[i].name = $scope.new.course.name
                    $scope.courses[i].description = $scope.new.course.description
                    $scope.courses[i].demo = $scope.new.course.demo === "true"
                    return
                }
            }
        })
    }

    $scope.deleteCourse = (i) => {
        deleteCourse($scope.courses[i].id)
    }

    // Unit CRUD Functions
    $scope.clearCrudUnitModal = () => {
        $scope.new.unit = {
            name: "",
            description: ""
        }
    }

    $scope.launchEditUnitModal = (i) => {
        $scope.crudStates.unit = 'Edit'
        $scope.new.unit = $scope.units[i]
    }

    $scope.launchCreateUnitModal = () => {
        $scope.crudStates.unit = 'Create'
        $scope.new.unit = {}
    }

    $scope.crudUnit = () => {
        if ($scope.crudStates.unit == "Create") $scope.createUnit()
        else if ($scope.crudStates.unit == "Edit") $scope.editUnit()
    }

    $scope.createUnit = () => {
        let unitId = generateUUID()
        let unit = {
            name: $scope.new.unit.name,
            description: $scope.new.unit.description,
            course: $scope.courses[$scope.selectedCourse].id,
            ordinalNumber: ($scope.units.length === 0) ? 1 : $scope.units[$scope.units.length - 1].ordinalNumber + 1
        }
        db.collection("units").doc(unitId).set(unit).then(() => {
            $scope.new.unit = {}
            unit.id = unitId
            $scope.units.push(unit)
            $scope.$apply()
        })
    }

    $scope.editUnit = () => {
        db.collection("units").doc($scope.new.unit.id).update({
            name: $scope.new.unit.name,
            description: $scope.new.unit.description
        }).then(() => {
            for (let i = 0; i < $scope.units.length; i++) {
                if ($scope.units.id == $scope.new.unit.id) {
                    $scope.units[i].name = $scope.new.unit.name
                    $scope.units[i].description = $scope.new.unit.description
                    return
                }
            }
        })
    }

    $scope.deleteUnit = (i) => {
        deleteUnit($scope.units[i].id)
    }

    // Lesson CRUD Functions
    $scope.clearCrudLessonModal = () => {
        $scope.new.lesson = {
            name: "",
            description: ""
        }
    }

    $scope.launchEditLessonModal = (i) => {
        $scope.crudStates.lesson = 'Edit'
        $scope.new.lesson = $scope.lessons[i]
    }

    $scope.launchCreateLessonModal = () => {
        $scope.crudStates.lesson = 'Create'
        $scope.new.lesson = {}
    }

    $scope.crudLesson = () => {
        if ($scope.crudStates.lesson == "Create") $scope.createLesson()
        else if ($scope.crudStates.lesson == "Edit") $scope.editLesson()
    }

    $scope.createLesson = () => {
        let lessonId = generateUUID()
        let lesson = {
            name: $scope.new.lesson.name,
            description: $scope.new.lesson.description,
            unit: $scope.units[$scope.selectedUnit].id,
            ordinalNumber: ($scope.lessons.length === 0) ? 1 : $scope.lessons[$scope.lessons.length - 1].ordinalNumber + 1
        }
        db.collection("lessons").doc(lessonId).set(lesson).then(() => {
            $scope.new.lesson = {}
            lesson.id = lessonId
            $scope.lessons.push(lesson)
            $scope.$apply()
        })
    }

    $scope.editLesson = () => {
        db.collection("lessons").doc($scope.new.lesson.id).update({
            name: $scope.new.lesson.name,
            description: $scope.new.lesson.description
        }).then(() => {
            for (let i = 0; i < $scope.lessons.length; i++) {
                if ($scope.lessons.id == $scope.new.lesson.id) {
                    $scope.lessons[i].name = $scope.new.lesson.name
                    $scope.lessons[i].description = $scope.new.lesson.description
                    return
                }
            }
        })
    }

    $scope.deleteLesson = (i) => {
        deleteLesson($scope.lessons[i].id)
    }

    // Assignment CRUD Functions
    $scope.clearCrudAssignmentModal = () => {
        $scope.new.assignment = {
            name: "",
            description: "",
            expectedOutput: "",
            language: "",
        }
    }

    $scope.launchEditAssignmentModal = (i) => {
        $scope.crudStates.assignment = 'Edit'
        $scope.new.assignment = $scope.courseCreationAssignments[i]
    }

    $scope.launchCreateAssignmentModal = () => {
        $scope.crudStates.assignment = 'Create'
        $scope.new.assignment = {}
    }
    $scope.checkAllFieldsAssignments = () => {
        if($scope.new.assignment.name === "" || $scope.new.assignment.description === "" || $scope.new.assignment.language === ""){
            return true;
        }
        else return false;

    }

    $scope.crudAssignment = () => {
        if ($scope.crudStates.assignment == "Create")$scope.createAssignment()

        else if ($scope.crudStates.assignment == "Edit") $scope.editAssignment()
    }

    $scope.createAssignment = () => {
        let assignmentId = generateUUID()
        let assignment = {
            name: $scope.new.assignment.name,
            description: $scope.new.assignment.description,
            expectedOutput: $scope.new.assignment.expectedOutput,
            language: $scope.new.assignment.language,
            lesson: $scope.lessons[$scope.selectedLesson].id,
            ordinalNumber: ($scope.courseCreationAssignments.length === 0) ? 1 : $scope.courseCreationAssignments[$scope.courseCreationAssignments.length - 1].ordinalNumber + 1
        }
        db.collection("assignments").doc(assignmentId).set(assignment).then(() => {
            $scope.new.assignment = {}
            assignment.id = assignmentId
            $scope.courseCreationAssignments.push(assignment)
            $scope.$apply()
        })
    }

    $scope.editAssignment = () => {
        db.collection("assignments").doc($scope.new.assignment.id).update({
            name: $scope.new.assignment.name,
            description: $scope.new.assignment.description,
            expectedOutput: $scope.new.assignment.expectedOutput,
            language: $scope.new.assignment.language,
        }).then(() => {
            for (let i = 0; i < $scope.assignments.length; i++) {
                if ($scope.assignments.id == $scope.new.assignment.id) {
                    $scope.assignments[i].name = $scope.new.assignment.name
                    $scope.assignments[i].description = $scope.new.assignment.description
                    $scope.assignments[i].expectedOutput = $scope.new.assignment.expectedOutput
                    return
                }
            }
        })
    }

    $scope.deleteAssignment = (i) => {
        deleteAssignment($scope.courseCreationAssignments[i].id)
    }

    // Resource CRUD Functions
    $scope.clearCrudResourceModal = () => {
        $scope.new.resource = {
            name: "",
            description: ""
        }
    }

    $scope.launchEditResourceModal = (i) => {
        $scope.crudStates.resource = 'Edit'
        $scope.new.resource = $scope.resources[i]
    }

    $scope.launchCreateResourceModal = () => {
        $scope.crudStates.resource = 'Create'
        $scope.new.resource = {}
    }

    $scope.crudResource = () => {
        if ($scope.crudStates.resource == "Create") $scope.createResource()
        else if ($scope.crudStates.resource == "Edit") $scope.editResource()
    }

    $scope.createResource = () => {
        let resourceId = generateUUID()
        let resource = {
            name: $scope.new.resource.name,
            description: $scope.new.resource.description,
            type: $scope.new.resource.type,
            lesson: $scope.lessons[$scope.selectedLesson].id,
            ordinalNumber: ($scope.resources.length === 0) ? 1 : $scope.resources[$scope.resources.length - 1].ordinalNumber + 1
        }
        if (resource.type === '2' || resource.type === '3' || resource.type === '4') {
            resource.link = $scope.new.resource.link
        }
        db.collection("resources").doc(resourceId).set(resource).then(() => {
            $scope.new.resource = {}
            resource.id = resourceId
            $scope.resources.push(resource)
            $scope.$apply()
        })
    }

    $scope.editResource = () => {
        let updatedResource = {
            name: $scope.new.resource.name,
            description: $scope.new.resource.description,
            type: $scope.new.resource.type
        }
        switch (updatedResource.type) {
            case '1':
                updatedResource.link = firebase.firestore.FieldValue.delete()
                break
            case '2':
            case '3':
            case '4':
                updatedResource.link = $scope.new.resource.link
                break
        }
        db.collection("resources").doc($scope.new.resource.id).update(updatedResource).then(() => {
            for (let i = 0; i < $scope.resources.length; i++) {
                if ($scope.resources.id == $scope.new.resource.id) {
                    $scope.resources[i].name = $scope.new.resource.name
                    $scope.resources[i].description = $scope.new.resource.description
                    $scope.resources[i].type = $scope.new.resource.type
                    $scope.resources[i].link = $scope.new.resource.link
                    return
                }
            }
        })
    }

    $scope.deleteResource = (i) => {
        deleteResource($scope.resources[i].id)
    }

    $scope.nameOfResourceType = (type) => {
        switch (type) {
            case '1': return 'Text'
            case '2': return 'Video'
            case '3': return 'Article'
            case '4': return 'Link'
            default: return type
        }
    }

    // Reorder Courses Modal Functions
    $scope.reorderedCourses = []

    $scope.launchReorderCoursesModal = () => {
        $scope.reorderedCourses = []
        for (let course of $scope.courses) {
            $scope.reorderedCourses.push({
                id: course.id,
                name: course.name,
                ordinalNumber: course.ordinalNumber
            })
        }
        $scope.$apply()
    }

    $scope.shiftCourseUp = (i) => {
        if (i === 0) return
        [$scope.reorderedCourses[i-1], $scope.reorderedCourses[i]] = [$scope.reorderedCourses[i], $scope.reorderedCourses[i-1]]
    }

    $scope.shiftCourseDown = (i) => {
        if (i === $scope.reorderedCourses.length - 1) return
        [$scope.reorderedCourses[i+1], $scope.reorderedCourses[i]] = [$scope.reorderedCourses[i], $scope.reorderedCourses[i+1]]
    }

    $scope.reorderCourses = () => {
        for (let i = 0; i < $scope.reorderedCourses.length; i++) {
            let course = $scope.reorderedCourses[i]
            if (course.ordinalNumber === i + 1) continue
            db.collection("courses").doc(course.id).update({
                ordinalNumber: i + 1
            })
            const index = $scope.courses.findIndex(c => c.id === course.id)
            $scope.courses[index].ordinalNumber = i + 1
        }
        $scope.courses.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0))
    }

    // Reorder Units Modal Functions
    $scope.reorderedUnits = []

    $scope.launchReorderUnitsModal = () => {
        $scope.reorderedUnits = []
        for (let unit of $scope.units) {
            $scope.reorderedUnits.push({
                id: unit.id,
                name: unit.name,
                ordinalNumber: unit.ordinalNumber
            })
        }
        $scope.$apply()
    }

    $scope.shiftUnitUp = (i) => {
        if (i === 0) return
        [$scope.reorderedUnits[i-1], $scope.reorderedUnits[i]] = [$scope.reorderedUnits[i], $scope.reorderedUnits[i-1]]
    }

    $scope.shiftUnitDown = (i) => {
        if (i === $scope.reorderedUnits.length - 1) return
        [$scope.reorderedUnits[i+1], $scope.reorderedUnits[i]] = [$scope.reorderedUnits[i], $scope.reorderedUnits[i+1]]
    }

    $scope.reorderUnits = () => {
        for (let i = 0; i < $scope.reorderedUnits.length; i++) {
            let unit = $scope.reorderedUnits[i]
            if (unit.ordinalNumber === i + 1) continue
            db.collection("units").doc(unit.id).update({
                ordinalNumber: i + 1
            })
            const index = $scope.units.findIndex(c => c.id === unit.id)
            $scope.units[index].ordinalNumber = i + 1
        }
        $scope.units.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0))
    }

    // Reorder Lessons Modal Functions
    $scope.reorderedLessons = []

    $scope.launchReorderLessonsModal = () => {
        $scope.reorderedLessons = []
        for (let lesson of $scope.lessons) {
            $scope.reorderedLessons.push({
                id: lesson.id,
                name: lesson.name,
                ordinalNumber: lesson.ordinalNumber
            })
        }
        $scope.$apply()
    }

    $scope.shiftLessonUp = (i) => {
        if (i === 0) return
        [$scope.reorderedLessons[i-1], $scope.reorderedLessons[i]] = [$scope.reorderedLessons[i], $scope.reorderedLessons[i-1]]
    }

    $scope.shiftLessonDown = (i) => {
        if (i === $scope.reorderedLessons.length - 1) return
        [$scope.reorderedLessons[i+1], $scope.reorderedLessons[i]] = [$scope.reorderedLessons[i], $scope.reorderedLessons[i+1]]
    }

    $scope.reorderLessons = () => {
        for (let i = 0; i < $scope.reorderedLessons.length; i++) {
            let lesson = $scope.reorderedLessons[i]
            if (lesson.ordinalNumber === i + 1) continue
            db.collection("lessons").doc(lesson.id).update({
                ordinalNumber: i + 1
            })
            const index = $scope.lessons.findIndex(c => c.id === lesson.id)
            $scope.lessons[index].ordinalNumber = i + 1
        }
        $scope.lessons.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0))
    }

    // Reorder Assignments Modal Functions
    $scope.reorderedAssignments = []

    $scope.launchReorderAssignmentsModal = () => {
        $scope.reorderedAssignments = []
        for (let assignment of $scope.courseCreationAssignments) {
            $scope.reorderedAssignments.push({
                id: assignment.id,
                name: assignment.name,
                ordinalNumber: assignment.ordinalNumber
            })
        }
        $scope.$apply()
    }

    $scope.shiftAssignmentUp = (i) => {
        if (i === 0) return
        [$scope.reorderedAssignments[i-1], $scope.reorderedAssignments[i]] = [$scope.reorderedAssignments[i], $scope.reorderedAssignments[i-1]]
    }

    $scope.shiftAssignmentDown = (i) => {
        if (i === $scope.reorderedAssignments.length - 1) return
        [$scope.reorderedAssignments[i+1], $scope.reorderedAssignments[i]] = [$scope.reorderedAssignments[i], $scope.reorderedAssignments[i+1]]
    }

    $scope.reorderAssignments = () => {
        for (let i = 0; i < $scope.reorderedAssignments.length; i++) {
            let assignment = $scope.reorderedAssignments[i]
            if (assignment.ordinalNumber === i + 1) continue
            db.collection("assignments").doc(assignment.id).update({
                ordinalNumber: i + 1
            })
            const index = $scope.courseCreationAssignments.findIndex(c => c.id === assignment.id)
            $scope.courseCreationAssignments[index].ordinalNumber = i + 1
        }
        $scope.courseCreationAssignments.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0))
    }

    // Reorder Resources Modal Functions
    $scope.reorderedResources = []

    $scope.launchReorderResourcesModal = () => {
        $scope.reorderedResources = []
        for (let resource of $scope.resources) {
            $scope.reorderedResources.push({
                id: resource.id,
                name: resource.name,
                ordinalNumber: resource.ordinalNumber
            })
        }
        $scope.$apply()
    }

    $scope.shiftResourceUp = (i) => {
        if (i === 0) return
        [$scope.reorderedResources[i-1], $scope.reorderedResources[i]] = [$scope.reorderedResources[i], $scope.reorderedResources[i-1]]
    }

    $scope.shiftResourceDown = (i) => {
        if (i === $scope.reorderedResources.length - 1) return
        [$scope.reorderedResources[i+1], $scope.reorderedResources[i]] = [$scope.reorderedResources[i], $scope.reorderedResources[i+1]]
    }

    $scope.reorderResources = () => {
        for (let i = 0; i < $scope.reorderedResources.length; i++) {
            let resource = $scope.reorderedResources[i]
            if (resource.ordinalNumber === i + 1) continue
            db.collection("resources").doc(resource.id).update({
                ordinalNumber: i + 1
            })
            const index = $scope.resources.findIndex(c => c.id === resource.id)
            $scope.resources[index].ordinalNumber = i + 1
        }
        $scope.resources.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0))
    }

    // Grading tab
    // processHTML() to make html nice
    $scope.currentGradingView = 1
    $scope.currentAssignmentIndex = 0
    $scope.assignments = []
    $scope.assignmentsHTML = [];
    $scope.assignmentsPython = [];
    $scope.usersAssignments = []
    $scope.assignmentsQuery = "";

    $scope.getAssignments = () => {
        db.collection("assignments").get().then(function(qs) {
            qs.forEach(function(doc) {
                let assignment = { id: doc.id }
                Object.assign(assignment, doc.data())
                $scope.assignments.push(assignment)
                if(doc.data().language === "HTML"){
                    $scope.assignmentsHTML.push(doc.data());
                }
                if(doc.data().language === "Python"){
                    $scope.assignmentsPython.push(doc.data());
                }
            })
        }).then(function() {
            $scope.$apply()
        })
    }


    $scope.arrayOfGroupsTeacherTeaches= []; //The IDS
    $scope.fillArrayOfGroupsTeacherTeaches= function() {
        db.collection("groups").where('teacherID', '==', $scope.currentAdminUserID)
            .get().then(function (qs) {
            qs.forEach(function (doc) {
                $scope.arrayOfGroupsTeacherTeaches.push(doc.id);
            })
        }).then(function () {
            $scope.$apply()
        })
    }


    $scope.fillArrayOfStudentsTeacherTeaches = function(){
        $scope.arrayOfStudentsTeacherTeaches = []; //The IDs
        db.collection("groups").where('teacherID', '==', $scope.currentAdminUserID)
            .get().then(function (qs) {
            qs.forEach(function (doc) {
                let arrayOfStudents = doc.data().users;
                for(let i =0; i<arrayOfStudents.length;i++){
                    $scope.arrayOfStudentsTeacherTeaches.push(arrayOfStudents[i]);
                }
            })
            $scope.arrayOfStudentsTeacherTeaches=$scope.arrayOfStudentsTeacherTeaches.filter((value,index)=>$scope.arrayOfStudentsTeacherTeaches.indexOf(value) == index)
        }).then(function () {
            $scope.$apply()
        })
    }


    let getUserRequests = 0
    //get the groups that the teacher teaches as a serperate function
    //get the users that the teacher teachers as a seperate function
    //only show the assignments of students the teacher teachers
    //get the student uuid and only push those students assingments onto the screen
    $scope.loadSubmissions = (i) => {
        $scope.currentGradingView = 2
        $scope.currentAssignmentIndex = i
        $scope.usersAssignments = []
        if($scope.isTeacher){ //Loads all teacher specific assignments
            for(let z=0; z<$scope.arrayOfStudentsTeacherTeaches.length;z++){
                db.collection("users-assignments")
                    .where('assignment', '==', $scope.assignments[i].id)
                    .where('completed', '==', true)
                    .where('user','==',$scope.arrayOfStudentsTeacherTeaches[z]) //Only loads the assignments that are from the classes the teacher teaches
                    .get().then(function(qs){
                    qs.forEach(function(doc) {
                        let userAssignment = { id: doc.id }
                        Object.assign(userAssignment, doc.data())
                        $scope.usersAssignments.push(userAssignment)
                        $scope.getUser($scope.usersAssignments.length - 1, doc.data().user)
                        getUserRequests++
                        $scope.$apply()
                    })
                }).then(function() {
                    $scope.$apply()
                })
            }
        }
        else if($scope.isAdmin){ //Loads all assignments
                db.collection("users-assignments")
                    .where('assignment', '==', $scope.assignments[i].id)
                    .where('completed', '==', true)
                    .get().then(function(qs) {
                    qs.forEach(function(doc) {
                        let userAssignment = { id: doc.id }
                        Object.assign(userAssignment, doc.data())
                        $scope.usersAssignments.push(userAssignment)
                        $scope.getUser($scope.usersAssignments.length - 1, doc.data().user)
                        getUserRequests++
                    })
                }).then(function() {
                    $scope.$apply()
                })

        }
    }

    $scope.changeSubmissionStatus = (i, status) => {
        db.collection("users-assignments")
            .doc($scope.usersAssignments[i].id)
            .update({ status })
            .then(() => {
                $scope.usersAssignments[i].status = status
                $scope.$apply()
                $scope.emailUserGradedAssignment($scope.usersAssignments[i].user,$scope.assignments[$scope.currentAssignmentIndex].name,$scope.usersAssignments[i].language)//Second Param allows for you to figure out the assignment name
            })
    }
    $scope.emailUserGradedAssignment= function (userID,assignmentName,language){ //Finish getting the assingment name and sending that informaotion ovwer
        var docRef = db.collection("users").doc(userID);
        docRef.get().then(function(doc) {
            //Email user
            let email= doc.data().email;
            let name = doc.data().FirstName;

            // let url = "https://cors-anywhere.herokuapp.com/http://18.222.29.210:8080/api/gradedAssignments";
            let url = "https://cors-anywhere.herokuapp.com/http://18.222.29.210:8080/api/gradedAssignments";

            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);

            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            xhr.onreadystatechange = function() { // Call a function when the state changes.
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    // Request finished. Do processing here.
                }
            }
            xhr.send(`name=${name}&email=${email}&assignmentName=${assignmentName}&language=${language}`);
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        //get userEmail
        //Email User



    }



    $scope.getUser = (i, id) => {
        console.log(i + " " + id)
        db.collection("users").where('userId', '==', id).get().then(function(qs) {
            let doc = qs.docs[0]
            $scope.usersAssignments[i].userName = doc.data().name
            getUserRequests--
            if (getUserRequests == 0) $scope.$apply()
        })
    }

    // User Registrations
    $scope.currentRegistrationCourse = null
    $scope.registrationCourses = []
    $scope.registrations = []

    $scope.getRegistrationCourses = () => {
        db.collection("courses").get().then((qs) => {
            qs.forEach((doc) => {
                let course = {id: doc.id}
                Object.assign(course, doc.data())
                $scope.registrationCourses.push(course)
            })
            $scope.courses.sort((a,b) => a.ordinalNumber - b.ordinalNumber)
            $scope.$apply()
        })
    }

    let getUserRequestsForRegistrations = 0

    $scope.loadRegistrations = (i) => {
        $scope.currentRegistrationCourse = i
        $scope.registrations = []
        db.collection("registrations")
            .where("courseId", "==", $scope.registrationCourses[i].id)
            .get()
            .then((qs) => {
                qs.forEach((doc) => {
                    const docData = doc.data()
                    let registration = {id: doc.id, fields: []}
                    for (const prop in docData) {
                        registration.fields.push({key: prop, value: docData[prop]})
                    }
                    registration.userId = docData.userId
                    registration.paid = docData.paid
                    registration.courseId = docData.courseId
                    registration.date = docData.date
                    registration.compact = true
                    $scope.registrations.push(registration)
                    $scope.getRegistrationUser($scope.registrations.length - 1, doc.data().userId)
                    getUserRequestsForRegistrations++
                })
                $scope.$apply()
            })
    }

    $scope.getRegistrationUser = (i, id) => {
        db.collection("users")
            .where("userId", "==", id)
            .get()
            .then((qs) => {
                let doc = qs.docs[0]
                let user = {id: doc.id}
                Object.assign(user, doc.data())
                $scope.registrations[i].userObj = user
                getUserRequestsForRegistrations--
                if (getUserRequestsForRegistrations == 0) {
                    $scope.$apply()
                    console.log($scope.registrations)
                }
            })
    }

    $scope.toggleRegistrationCompact = (i) => {
        $scope.registrations[i].compact = !$scope.registrations[i].compact
    }


    // Initialization Functions & View Management
    $scope.loaded = []
    for (let i = 0; i < $scope.tabs.length; i++) {
        $scope.loaded.push(false)
    }

    // if(!$scope.isTeacher){ //If you are a teacher you can't access current courses
    //     $scope.loaded[0] = true;
    // }
    $scope.loaded[1] = true
    $scope.loaded[2] = true

    $scope.loadData = () => {
        if ($scope.currentTab == 0 && !$scope.loaded[0]) {
                $scope.getCourses()
                $scope.loaded[0] = true

        }
        else if ($scope.currentTab == 3 && !$scope.loaded[3]) {
            $scope.getEvents()
            $scope.loaded[3] = true
        }
        else if ($scope.currentTab == 4 && !$scope.loaded[4]) {
            $scope.getAssignments()
            $scope.loaded[4] = true
        }
        else if ($scope.currentTab == 5 && !$scope.loaded[5]) {
                $scope.getRegistrationCourses()
                $scope.loaded[5] = true

        }

    }

    $scope.changeTab = (t) => {
        $scope.currentTab = t
        $scope.loadData()
    }

    $scope.getUsers()
    // $scope.getGroups()//This will be loaded after is teacher and is admin is defined

    //$scope.loadData()

    // Reusable functions
    const formatHTML = (node, level) => {
        var indentBefore = new Array(level++ + 1).join('  '),
            indentAfter  = new Array(level - 1).join('  '),
            textNode;
        for (var i = 0; i < node.children.length; i++) {
            textNode = document.createTextNode('\n' + indentBefore);
            node.insertBefore(textNode, node.children[i]);
            formatHTML(node.children[i], level);
            if (node.lastElementChild == node.children[i]) {
                textNode = document.createTextNode('\n' + indentAfter);
                node.appendChild(textNode);
            }
        }
        return node;
    }

    $scope.processHTML = (str) => {
        var div = document.createElement('div');
        div.innerHTML = str.trim();
        return formatHTML(div, 0).innerHTML;
    }

})

app.filter('trustHtml', function($sce) {
    return function(html) {
        return $sce.trustAsHtml(html)
    }
})
function toggleDropDownInEvents() {
    document.getElementById("TeacherDropdownInEvents").classList.toggle("show");
}
function toggleDropDownInGroups() {
    document.getElementById("TeacherDropdownInGroups").classList.toggle("show");
}

function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    let dropdwn = document.getElementById("TeacherDropdownInGroups");
    a = dropdwn.getElementsByTagName("BUTTON");

    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function filterFunction2() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("TeacherInput");
    filter = input.value.toUpperCase();
    let dropdwn = document.getElementById("TeacherDropdownInEvents");
    a = dropdwn.getElementsByTagName("BUTTON");

    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function showHTMLAssignments(){
    document.getElementsByClassName("assignmentCard").style.display = "none";
}
