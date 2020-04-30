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
var app = angular.module('SBCAdmin', []);

function generateUUID() { // V4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

app.controller('AppController', function($scope) {
    $scope.tabs = ["Course Creation", "Group Management", "User Management", "Event Management", "Grading"];
    $scope.currentTab = 1;
    $scope.new = {event: {}, user: {}, lesson: {}, unit: {}, lesson: {}};
    $scope.crudStates = {
        event: "Create",
        user: "Create",
        course: "Create",
        unit: "Create",
        lesson: "Create"
    };

    // User Variables
    $scope.users = [];
    $scope.showStudents = true;

    // User Functions
    $scope.toggleShowStudents = function() {
        $scope.showStudents = !$scope.showStudents;
    };

    $scope.clearCrudUserModal = function() {
        $scope.new.user = {
            name: "",
            dateOfBirth: "",
            userType: ""
        };
    };

    $scope.launchEditUserModal = function(i) {
        $scope.crudStates.user = 'Edit';
        $scope.new.user = $scope.users[i];
        $scope.new.user.dateOfBirth = new Date($scope.new.user.dateOfBirth);
        $scope.new.user.dateJoined = new Date($scope.new.user.dateJoined);
    };

    $scope.launchCreateUserModal = function() {
        $scope.crudStates.user = 'Create';
        $scope.new.user = {};
    };

    $scope.crudUser = function() {
        if ($scope.crudStates.user == "Create") $scope.createUser();
        else if ($scope.crudStates.user == "Edit") $scope.editUser();
    };

    $scope.editUser = function() {
        db.collection("users").doc($scope.new.user.id).update({
            name: $scope.new.user.name,
            dateOfBirth: $scope.new.user.dateOfBirth,
            userType: $scope.new.user.userType
        }).then(function() {
            for (let i = 0; i < $scope.users.length; i++) {
                if ($scope.users.id == $scope.new.user.id) {
                    $scope.users[i].name = $scope.new.user.name;
                    $scope.users[i].dateOfBirth = $scope.new.user.dateOfBirth;
                    $scope.users[i].userType = $scope.new.user.userType;
                    return;
                }
            }
        });
    };

    $scope.toggleUserStudent = function(i) {
        let user = $scope.users[i];
        db.collection("users").doc(user.id).update({
            userType: (user.userType === '2') ? '1' : '2'
        }).then(function() {
            $scope.users[i].userType = (user.userType === '2') ? '1' : '2';
            $scope.$apply();
        });
    };

    $scope.deleteUser = function(i) {
        let user = $scope.users[i];
        db.collection("users").doc(user.id).delete().then(function() {
            $scope.users.splice(i, 1);
            $scope.$apply();
        });
    };

    $scope.getUsers = function() {
        $scope.users = [];
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

    // Event Variables
    $scope.events = [];
    $scope.showArchivedEvents = false;

    // Event Functions
    $scope.toggleShowArchivedEvents = function() {
        $scope.showArchivedEvents = !$scope.showArchivedEvents;
    };

    $scope.clearCrudEventModal = function() {
        $scope.new.event = {
            name: "",
            link: "",
            description: "",
            time: ""
        };
    };

    $scope.launchEditEventModal = function(i) {
        $scope.crudStates.event = 'Edit';
        $scope.new.event = $scope.events[i];
        $scope.new.event.time = new Date($scope.new.event.time);
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

    // Group Variables
    $scope.groups = [];

    // Group Functions
    $scope.clearCrudGroupModal = function() {
        $scope.new.group = {
            name: "",
            description: "",
            users: []
        };
    };

    $scope.launchEditGroupModal = function(i) {
        $scope.crudStates.group = 'Edit';
        $scope.new.group = $scope.groups[i];
    };

    $scope.launchCreateGroupModal = function() {
        $scope.crudStates.group = 'Create';
        $scope.new.group = {};
    };

    $scope.crudGroup = function() {
        if ($scope.crudStates.group == "Create") $scope.createGroup();
        else if ($scope.crudStates.group == "Edit") $scope.editGroup();
    };

    $scope.createGroup = function() {
        debugger;
        let groupId = generateUUID();
        let group = {
            name: $scope.new.group.name,
            description: $scope.new.group.description,
            users: []
        };
        db.collection("groups").doc(groupId).set(group).then(function() {
            $scope.new.group = {};
            group.id = groupId;
            $scope.groups.unshift(group);
            $scope.$apply();
        });
    };

    $scope.editGroup = function() {
        db.collection("groups").doc($scope.new.group.id).update({
            name: $scope.new.group.name,
            description: $scope.new.group.description,
            users: $scope.new.group.users
        }).then(function() {
            for (let i = 0; i < $scope.groups.length; i++) {
                if ($scope.groups.id == $scope.new.group.id) {
                    $scope.groups[i].name = $scope.new.group.name;
                    $scope.groups[i].description = $scope.new.group.description;
                    $scope.groups[i].users = $scope.new.group.users;
                    return;
                }
            }
        });
    };

    $scope.deleteGroup = function(i) {
        let group = $scope.groups[i];
        db.collection("groups").doc(group.id).delete().then(function() {
            $scope.groups.splice(i, 1);
            $scope.$apply();
        });
    };

    $scope.getGroups = function() {
        $scope.groups = [];
        db.collection("groups").get().then((querySnapshot) => {
            for (var i = 0; i < querySnapshot.docs.length; i++) {
                var doc = querySnapshot.docs[i];
                $scope.groups.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    users: doc.data().users
                });
            }
            $scope.$apply();
        });
    };

    // Group Membership Modal

    $scope.launchChangeGroupMembershipModal = function(i) {
        $scope.currentGroupMembership = i;
        $scope.groupMembership = [];
        for (let user of $scope.users) {
            $scope.groupMembership.push({
                id: user.id,
                userId: user.userId,
                name: user.name,
                inGroup: false,
                selected: false
            });
        }
        let usersInGroup = $scope.groups[i].users;
        for (let j = 0; j < $scope.groupMembership.length; j++) {
            for (let k = 0; k < usersInGroup.length; k++) {
                if ($scope.groupMembership[j].userId == usersInGroup[k]) {
                    $scope.groupMembership[j].inGroup = true;
                    $scope.groupMembership[j].selected = true;
                }
            }
        }
    };

    $scope.selectUserMembership = function(i) {
        $scope.groupMembership[i].selected = !$scope.groupMembership[i].selected;
    };

    $scope.changeGroupMembership = function() {
        let userIds = [];
        for (let user of $scope.groupMembership) {
            if (user.selected) {
                userIds.push(user.userId);
            }
        }
        db.collection("groups").doc($scope.groups[$scope.currentGroupMembership].id).update({
            users: userIds
        }).then(function() {
            $scope.groups[$scope.currentGroupMembership].users = userIds;
            $scope.$apply();
        });
    };

    // Courses Variables
    $scope.courses = [];
    $scope.selectedCourse = null;
    $scope.units = [];
    $scope.selectedUnit = null;
    $scope.lessons = [];
    $scope.selectedLesson = null;

    // Course/Unit/Lesson Deletes

    function deleteAllFromQuerySnapshot(querySnapshot) {
        var batch = db.batch();
        querySnapshot.forEach(function(doc) {
            batch.delete(doc.ref);
        });
        batch.commit();
    }

    function deleteCourse(id) {
        db.collection("courses").doc(id).delete().then(function() {
            for (let i = 0; i < $scope.courses.length; i++) {
                if ($scope.courses[i].id === id) {
                    $scope.courses.splice(i, 1);
                    break;
                }
            }
        });
        db.collection("units").where("course", "==", id).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                deleteUnit(doc.id);
            });
        });
    }

    function deleteUnit(id) {
        db.collection("units").doc(id).delete().then(function() {
            for (let i = 0; i < $scope.units.length; i++) {
                if ($scope.units[i].id === id) {
                    $scope.units.splice(i, 1);
                    break;
                }
            }
        });
        db.collection("lessons").where("unit", "==", id).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                deleteLesson(doc.id);
            });
        });
    }

    function deleteLesson(id) {
        // Delete lesson
        db.collection("lessons").doc(id).delete().then(function() {
            // Remove lesson from scope
            for (let i = 0; i < $scope.lessons.length; i++) {
                if ($scope.lessons[i].id === id) {
                    $scope.lessons.splice(i, 1);
                    break;
                }
            }
            // Set view lesson to null TODO *****************************
        });
        // Delete groups-lessons
        db.collection("groups-lessons").where("lesson", "==", id).get().then(deleteAllFromQuerySnapshot);
        // Delete resources
        db.collection("resources").where("lesson", "==", id).get().then(deleteAllFromQuerySnapshot);
        // Delete assignments
        db.collection("assignments").where("lesson", "==", id).get().then(function(querySnapshot) {
            var assignmentBatch = db.batch();
            var assignmentIds = [];
            querySnapshot.forEach(function(doc) {
                assignmentIds.push(doc.id);
                assignmentBatch.delete(doc.ref);
            });
            // Delete all users-assignments
            db.collection("users-assignments").where("assignment", "in", assignmentIds).get().then(deleteAllFromQuerySnapshot);
        });
    }

    // Courses Functions
    $scope.getCourses = function() {
        $scope.courses = [];
        $scope.units = [];
        $scope.lessons = [];
        db.collection("courses").get().then((querySnapshot) => {
            for (var i = 0; i < querySnapshot.docs.length; i++) {
                var doc = querySnapshot.docs[i];
                $scope.courses.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    ordinalNumber: doc.data().ordinalNumber
                });
            }
            $scope.courses.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0));
            $scope.$apply();
        });
    };

    $scope.getUnits = function() {
        $scope.units = [];
        $scope.lessons = [];
        console.log($scope.courses[$scope.selectedCourse].id);
        db.collection("units").where("course", "==", $scope.courses[$scope.selectedCourse].id)
            .get().then((querySnapshot) => {
            for (var i = 0; i < querySnapshot.docs.length; i++) {
                var doc = querySnapshot.docs[i];
                $scope.units.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    course: doc.data().course,
                    ordinalNumber: doc.data().ordinalNumber
                });
            }
            $scope.units.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0));
            $scope.$apply();
        });
    };

    $scope.getLessons = function() {
        $scope.lessons = [];
        console.log($scope.units[$scope.selectedUnit].id);
        db.collection("lessons").where("unit", "==", $scope.units[$scope.selectedUnit].id)
            .get().then((querySnapshot) => {
            for (var i = 0; i < querySnapshot.docs.length; i++) {
                var doc = querySnapshot.docs[i];
                $scope.lessons.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    unit: doc.data().unit,
                    ordinalNumber: doc.data().ordinalNumber
                });
            }
            $scope.lessons.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0));
            $scope.$apply();
        });
    };

    $scope.changeSelectedCourse = function(i) {
        if ($scope.selectedCourse === i) {
            $scope.selectedCourse = null;
        }
        else {
            $scope.selectedCourse = i;
            $scope.getUnits();
        }
        $scope.selectedUnit = null;
        $scope.selectedLesson = null;
        $scope.units = [];
        $scope.lessons = [];
    };

    $scope.changeSelectedUnit = function(i) {
        if ($scope.selectedUnit === i) {
            $scope.selectedUnit = null;
        }
        else {
            $scope.selectedUnit = i;
            $scope.getLessons();
        }
        $scope.selectedLesson = null;
            $scope.lessons = [];
    };

    $scope.changeSelectedLesson = function(i) {
        if ($scope.selectedLesson === i) {
            $scope.selectedLesson = null;
        }
        else {
            $scope.selectedLesson = i;
        }
    };

    // Course CRUD Functions
    $scope.clearCrudCourseModal = function() {
        $scope.new.course = {
            name: "",
            description: ""
        };
    };

    $scope.launchEditCourseModal = function(i) {
        $scope.crudStates.course = 'Edit';
        $scope.new.course = $scope.courses[i];
    };

    $scope.launchCreateCourseModal = function() {
        $scope.crudStates.course = 'Create';
        $scope.new.course = {};
    };

    $scope.crudCourse = function() {
        if ($scope.crudStates.course == "Create") $scope.createCourse();
        else if ($scope.crudStates.course == "Edit") $scope.editCourse();
    };

    $scope.createCourse = function() {
        let courseId = generateUUID();
        let course = {
            name: $scope.new.course.name,
            description: $scope.new.course.description
        };
        db.collection("courses").doc(courseId).set(course).then(function() {
            $scope.new.course = {};
            course.id = courseId;
            $scope.courses.push(course);
            $scope.$apply();
        });
    };

    $scope.editCourse = function() {
        db.collection("courses").doc($scope.new.course.id).update({
            name: $scope.new.course.name,
            description: $scope.new.course.description
        }).then(function() {
            for (let i = 0; i < $scope.courses.length; i++) {
                if ($scope.courses.id == $scope.new.course.id) {
                    $scope.courses[i].name = $scope.new.course.name;
                    $scope.courses[i].description = $scope.new.course.description;
                    return;
                }
            }
        });
    };

    $scope.deleteCourse = function(i) {
        deleteCourse($scope.courses[i].id);
    };

    // Unit CRUD Functions
    $scope.clearCrudUnitModal = function() {
        $scope.new.unit = {
            name: "",
            description: ""
        };
    };

    $scope.launchEditUnitModal = function(i) {
        $scope.crudStates.unit = 'Edit';
        $scope.new.unit = $scope.units[i];
    };

    $scope.launchCreateUnitModal = function() {
        $scope.crudStates.unit = 'Create';
        $scope.new.unit = {};
    };

    $scope.crudUnit = function() {
        if ($scope.crudStates.unit == "Create") $scope.createUnit();
        else if ($scope.crudStates.unit == "Edit") $scope.editUnit();
    };

    $scope.createUnit = function() {
        let unitId = generateUUID();
        let unit = {
            name: $scope.new.unit.name,
            description: $scope.new.unit.description,
            course: $scope.courses[$scope.selectedCourse].id,
            ordinalNumber: ($scope.units.length === 0) ? 1 : $scope.units[$scope.units.length - 1].ordinalNumber + 1
        };
        db.collection("units").doc(unitId).set(unit).then(function() {
            $scope.new.unit = {};
            unit.id = unitId;
            $scope.units.push(unit);
            $scope.$apply();
        });
    };

    $scope.editUnit = function() {
        db.collection("units").doc($scope.new.unit.id).update({
            name: $scope.new.unit.name,
            description: $scope.new.unit.description
        }).then(function() {
            for (let i = 0; i < $scope.units.length; i++) {
                if ($scope.units.id == $scope.new.unit.id) {
                    $scope.units[i].name = $scope.new.unit.name;
                    $scope.units[i].description = $scope.new.unit.description;
                    return;
                }
            }
        });
    };

    $scope.deleteUnit = function(i) {
        deleteUnit($scope.units[i].id);
    };

    // Lesson CRUD Functions
    $scope.clearCrudLessonModal = function() {
        $scope.new.lesson = {
            name: "",
            description: ""
        };
    };

    $scope.launchEditLessonModal = function(i) {
        $scope.crudStates.lesson = 'Edit';
        $scope.new.lesson = $scope.lessons[i];
    };

    $scope.launchCreateLessonModal = function() {
        $scope.crudStates.lesson = 'Create';
        $scope.new.lesson = {};
    };

    $scope.crudLesson = function() {
        if ($scope.crudStates.lesson == "Create") $scope.createLesson();
        else if ($scope.crudStates.lesson == "Edit") $scope.editLesson();
    };

    $scope.createLesson = function() {
        let lessonId = generateUUID();
        let lesson = {
            name: $scope.new.lesson.name,
            description: $scope.new.lesson.description,
            unit: $scope.units[$scope.selectedUnit].id,
            ordinalNumber: ($scope.lessons.length === 0) ? 1 : $scope.lessons[$scope.lessons.length - 1].ordinalNumber + 1
        };
        db.collection("lessons").doc(lessonId).set(lesson).then(function() {
            $scope.new.lesson = {};
            lesson.id = lessonId;
            $scope.lessons.push(lesson);
            $scope.$apply();
        });
    };

    $scope.editLesson = function() {
        db.collection("lessons").doc($scope.new.lesson.id).update({
            name: $scope.new.lesson.name,
            description: $scope.new.lesson.description
        }).then(function() {
            for (let i = 0; i < $scope.lessons.length; i++) {
                if ($scope.lessons.id == $scope.new.lesson.id) {
                    $scope.lessons[i].name = $scope.new.lesson.name;
                    $scope.lessons[i].description = $scope.new.lesson.description;
                    return;
                }
            }
        });
    };

    $scope.deleteLesson = function(i) {
        deleteLesson($scope.lessons[i].id);
    };

    // Reorder Courses Modal Functions
    $scope.reorderedCourses = [];

    $scope.launchReorderCoursesModal = function() {
        $scope.reorderedCourses = [];
        for (let course of $scope.courses) {
            $scope.reorderedCourses.push({
                id: course.id,
                name: course.name,
                ordinalNumber: course.ordinalNumber
            });
        }
        $scope.$apply();
    };

    $scope.shiftCourseUp = function(i) {
        if (i === 0) return;
        [$scope.reorderedCourses[i-1], $scope.reorderedCourses[i]] = [$scope.reorderedCourses[i], $scope.reorderedCourses[i-1]];
    };

    $scope.shiftCourseDown = function(i) {
        if (i === $scope.reorderedCourses.length - 1) return;
        [$scope.reorderedCourses[i+1], $scope.reorderedCourses[i]] = [$scope.reorderedCourses[i], $scope.reorderedCourses[i+1]];
    };

    $scope.reorderCourses = function() {
        for (let i = 0; i < $scope.reorderedCourses.length; i++) {
            let course = $scope.reorderedCourses[i];
            if (course.ordinalNumber === i + 1) continue;
            db.collection("courses").doc(course.id).update({
                ordinalNumber: i + 1
            });
            const index = $scope.courses.findIndex(c => c.id === course.id);
            $scope.courses[index].ordinalNumber = i + 1;
        }
        $scope.courses.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0));
    };

    // Reorder Units Modal Functions
    $scope.reorderedUnits = [];

    $scope.launchReorderUnitsModal = function() {
        $scope.reorderedUnits = [];
        for (let unit of $scope.units) {
            $scope.reorderedUnits.push({
                id: unit.id,
                name: unit.name,
                ordinalNumber: unit.ordinalNumber
            });
        }
        $scope.$apply();
    };

    $scope.shiftUnitUp = function(i) {
        if (i === 0) return;
        [$scope.reorderedUnits[i-1], $scope.reorderedUnits[i]] = [$scope.reorderedUnits[i], $scope.reorderedUnits[i-1]];
    };

    $scope.shiftUnitDown = function(i) {
        if (i === $scope.reorderedUnits.length - 1) return;
        [$scope.reorderedUnits[i+1], $scope.reorderedUnits[i]] = [$scope.reorderedUnits[i], $scope.reorderedUnits[i+1]];
    };

    $scope.reorderUnits = function() {
        for (let i = 0; i < $scope.reorderedUnits.length; i++) {
            let unit = $scope.reorderedUnits[i];
            if (unit.ordinalNumber === i + 1) continue;
            db.collection("units").doc(unit.id).update({
                ordinalNumber: i + 1
            });
            const index = $scope.units.findIndex(c => c.id === unit.id);
            $scope.units[index].ordinalNumber = i + 1;
        }
        $scope.units.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0));
    };

    // Reorder Lessons Modal Functions
    $scope.reorderedLessons = [];

    $scope.launchReorderLessonsModal = function() {
        $scope.reorderedLessons = [];
        for (let lesson of $scope.lessons) {
            $scope.reorderedLessons.push({
                id: lesson.id,
                name: lesson.name,
                ordinalNumber: lesson.ordinalNumber
            });
        }
        $scope.$apply();
    };

    $scope.shiftLessonUp = function(i) {
        if (i === 0) return;
        [$scope.reorderedLessons[i-1], $scope.reorderedLessons[i]] = [$scope.reorderedLessons[i], $scope.reorderedLessons[i-1]];
    };

    $scope.shiftLessonDown = function(i) {
        if (i === $scope.reorderedLessons.length - 1) return;
        [$scope.reorderedLessons[i+1], $scope.reorderedLessons[i]] = [$scope.reorderedLessons[i], $scope.reorderedLessons[i+1]];
    };

    $scope.reorderLessons = function() {
        for (let i = 0; i < $scope.reorderedLessons.length; i++) {
            let lesson = $scope.reorderedLessons[i];
            if (lesson.ordinalNumber === i + 1) continue;
            db.collection("lessons").doc(lesson.id).update({
                ordinalNumber: i + 1
            });
            const index = $scope.lessons.findIndex(c => c.id === lesson.id);
            $scope.lessons[index].ordinalNumber = i + 1;
        }
        $scope.lessons.sort((a,b) => (a.ordinalNumber > b.ordinalNumber) ? 1 : ((b.ordinalNumber > a.ordinalNumber) ? -1 : 0));
    };

    // Initialization Functions & View Management
    $scope.loaded = [];
    for (let i = 0; i < $scope.tabs.length; i++) {
        $scope.loaded.push(false);
    }
    $scope.loaded[2] = true;

    $scope.loadData = function() {
        if ($scope.currentTab == 0 && !$scope.loaded[0]) {
            $scope.getCourses();
            $scope.loaded[0] = true;
        }
        else if ($scope.currentTab == 1 && !$scope.loaded[1]) {
            $scope.getGroups();
            $scope.loaded[1] = true;
        }
        else if ($scope.currentTab == 3 && !$scope.loaded[3]) {
            $scope.getEvents();
            $scope.loaded[3] = true;
        }
    };

    $scope.changeTab = function(t) {
        $scope.currentTab = t;
        $scope.loadData();
    };

    $scope.getUsers();

    $scope.loadData();
});