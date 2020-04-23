firebase.initializeApp({
    apiKey: "AIzaSyBOn9KJJihPr0F0zXNcj_tlHn6tGgxIsMI",
    authDomain: "saving-by-coding.firebaseapp.com",
    databaseURL: "https://saving-by-coding.firebaseio.com",
    projectId: "saving-by-coding",
    storageBucket: "saving-by-coding.appspot.com",
    messagingSenderId: "1001321494305",
    appId: "1:1001321494305:web:7261fc3516fd79bc557060",
    measurementId: "G-GLKDW56H9N"
});
firebase.analytics();

var db = firebase.firestore();
var app = angular.module('SBCAdmin', ['ngAnimate']);

function generateUUID() { // V4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

app.controller('AppController', function($scope) {
    $scope.tabs = ["Courses", "Groups", "Users", "Events", "Projects"];
    $scope.currentTab = 3;
    $scope.users = [];
    $scope.events = [];
    $scope.new = {event: {}, user: {}};
    $scope.crudStates = {
        event: "Create",
        user: "Create"
    };
    $scope.showArchivedEvents = false;
    $scope.showAdmins = true;

    $scope.toggleShowArchivedEvents = function() {
        $scope.showArchivedEvents = !$scope.showArchivedEvents;
    };

    $scope.toggleShowAdmins = function() {
        $scope.showAdmins = !$scope.showAdmins;
    };

    $scope.changeTab = function(t) {
        $scope.currentTab = t;
    };

    $scope.getUsers = function() {
        db.collection("users").get().then((querySnapshot) => {
            for (var i = 0; i < querySnapshot.docs.length; i++) {
                var doc = querySnapshot.docs[i];
                $scope.users.push({
                    id: doc.id,
                    userId: doc.data().userId,
                    name: doc.data().name,
                    userType: doc.data().userType,
                    dateOfBirth: doc.data().dateOfBirth.toDate(),
                    dateJoined: doc.data().dateJoined.toDate()
                });
            }

            function compare(a, b) {
                if (a.dateJoined.getTime() < b.dateJoined.getTime()){
                    return 1;
                }
                if (a.dateJoined.getTime() > b.dateJoined.getTime()){
                    return -1;
                }
                return 0;
            }
            $scope.events.sort(compare);
            $scope.$apply();
        });
    };

    $scope.clearCrudEventModal = function() {
        $scope.new.event = {
            name: "",
            link: "",
            description: "",
            time: ""
        };
    };

    $scope.clearCrudUserModal = function() {
        $scope.new.user = {
            name: "",
            email: "",
            password: "",
            dateOfBirth: ""
        };
    };

    $scope.launchEditEventModal = function(i) {
        $scope.crudStates.event = 'Edit';
        $scope.new.event = $scope.events[i];
        $scope.new.event.time = new Date($scope.new.event.time);
    };

    $scope.launchEditUserModal = function(i) {
        $scope.crudStates.user = 'Edit';
        $scope.new.user = $scope.users[i];
        $scope.new.user.dateOfBirth = new Date($scope.new.user.dateOfBirth);
        $scope.new.user.dateJoined = new Date($scope.new.user.dateJoined);
    };

    $scope.launchCreateEventModal = function() {
        $scope.crudStates.event = 'Create';
        $scope.new.event = {};
    };

    $scope.crudEvent = function() {
        if ($scope.crudStates.event == "Create") $scope.createEvent();
        else if ($scope.crudStates.event == "Edit") $scope.editEvent();
    };

    $scope.createEvent = function() {
        let eventId = generateUUID();
        let event = {
            archived: false,
            name: $scope.new.event.name,
            link: $scope.new.event.link,
            description: $scope.new.event.description,
            time: $scope.new.event.time,
            groups: []
        };
        db.collection("events").doc(eventId).set(event).then(function() {
           $scope.new.event = {};
           event.id = eventId;
           $scope.events.unshift(event);
           $scope.$apply();
        });
    };

    $scope.editEvent = function() {
        db.collection("events").doc($scope.new.event.id).update({
            name: $scope.new.event.name,
            link: $scope.new.event.link,
            description: $scope.new.event.description,
            time: $scope.new.event.time,
            groups: $scope.new.event.groups
        }).then(function() {
            for (let i = 0; i < $scope.events.length; i++) {
                if ($scope.events.id == $scope.new.event.id) {
                    $scope.events[i].name = $scope.new.event.name;
                    $scope.events[i].link = $scope.new.event.link;
                    $scope.events[i].description = $scope.new.event.description;
                    $scope.events[i].time = $scope.new.event.time;
                    $scope.events[i].groups = $scope.new.event.groups;
                    return;
                }
            }
        });
    };

    $scope.toggleEventArchived = function(i) {
        let event = $scope.events[i];
        db.collection("events").doc(event.id).update({
            archived: !event.archived
        }).then(function() {
           $scope.events[i].archived = !$scope.events[i].archived;
           $scope.$apply();
        });
    };

    $scope.deleteEvent = function(i) {
        let event = $scope.events[i];
        db.collection("events").doc(event.id).delete().then(function() {
            $scope.events.splice(i, 1);
            $scope.$apply();
        });
    };

    $scope.getEvents = function() {
        $scope.events = [];
        db.collection("events").get().then((querySnapshot) => {
            for (var i = 0; i < querySnapshot.docs.length; i++) {
                var doc = querySnapshot.docs[i];
                $scope.events.push({
                    id: doc.id,
                    name: doc.data().name,
                    link: doc.data().link,
                    description: doc.data().description,
                    time: doc.data().time.toDate(),
                    groups: doc.data().groups,
                    archived: doc.data().archived
                });
            }

            function compare(a, b) {
                if (a.time.getTime() < b.time.getTime()){
                    return 1;
                }
                if (a.time.getTime() > b.time.getTime()){
                    return -1;
                }
                return 0;
            }
            $scope.events.sort(compare);
            $scope.$apply();
        });
    };

    $scope.loadData = function() {
        if ($scope.currentTab == 2) $scope.getUsers();
        else if ($scope.currentTab == 3) $scope.getEvents();
    };

    $scope.loadData();
});