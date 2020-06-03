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
var app = angular.module('SBCAdmin', [])

const generateUUID = () => { // V4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

app.controller('AppController', ($scope) => {
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
                    dateOfBirth: $scope.toDate(doc.data().dateOfBirth),
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
            time: ""
        }
    }

    $scope.launchEditEventModal = (i) => {
        $scope.crudStates.event = 'Edit'
        $scope.new.event = $scope.events[i]
        $scope.new.event.time = new Date($scope.new.event.time)
    }

    $scope.launchCreateEventModal = () => {
        $scope.crudStates.event = 'Create'
        $scope.new.event = {}
    }

    $scope.crudEvent = () => {
        if ($scope.crudStates.event == "Create") $scope.createEvent()
        else if ($scope.crudStates.event == "Edit") $scope.editEvent()
    }

    $scope.createEvent = () => {
        let eventId = generateUUID()
        let event = {
            archived: false,
            name: $scope.new.event.name,
            link: $scope.new.event.link,
            description: $scope.new.event.description,
            time: $scope.new.event.time,
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
        db.collection("events").doc($scope.new.event.id).update({
            name: $scope.new.event.name,
            link: $scope.new.event.link,
            description: $scope.new.event.description,
            time: $scope.new.event.time,
            groups: $scope.new.event.groups
        }).then(() => {
            for (let i = 0; i < $scope.events.length; i++) {
                if ($scope.events.id == $scope.new.event.id) {
                    $scope.events[i].name = $scope.new.event.name
                    $scope.events[i].link = $scope.new.event.link
                    $scope.events[i].description = $scope.new.event.description
                    $scope.events[i].time = $scope.new.event.time
                    $scope.events[i].groups = $scope.new.event.groups
                    return
                }
            }
        })
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
                $scope.events.push({
                    id: doc.id,
                    name: doc.data().name,
                    link: doc.data().link,
                    description: doc.data().description,
                    time: doc.data().time.toDate(),
                    groups: doc.data().groups,
                    archived: doc.data().archived
                })
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
        $scope.new.group = {
            name: "",
            description: "",
            users: []
        }
    }

    $scope.launchEditGroupModal = (i) => {
        $scope.crudStates.group = 'Edit'
        $scope.new.group = $scope.groups[i]
    }

    $scope.launchCreateGroupModal = () => {
        $scope.crudStates.group = 'Create'
        $scope.new.group = {}
    }

    $scope.crudGroup = () => {
        if ($scope.crudStates.group == "Create") $scope.createGroup()
        else if ($scope.crudStates.group == "Edit") $scope.editGroup()
    }

    $scope.createGroup = () => {
        let groupId = generateUUID()
        let group = {
            name: $scope.new.group.name,
            description: $scope.new.group.description,
            users: []
        }
        db.collection("groups").doc(groupId).set(group).then(() => {
            $scope.new.group = {}
            group.id = groupId
            $scope.groups.unshift(group)
            $scope.$apply()
        })
    }

    $scope.editGroup = () => {
        db.collection("groups").doc($scope.new.group.id).update({
            name: $scope.new.group.name,
            description: $scope.new.group.description,
            users: $scope.new.group.users
        }).then(() => {
            for (let i = 0; i < $scope.groups.length; i++) {
                if ($scope.groups.id == $scope.new.group.id) {
                    $scope.groups[i].name = $scope.new.group.name
                    $scope.groups[i].description = $scope.new.group.description
                    $scope.groups[i].users = $scope.new.group.users
                    return
                }
            }
        })
    }

    $scope.deleteGroup = (i) => {
        let group = $scope.groups[i]
        db.collection("groups").doc(group.id).delete().then(() => {
            $scope.groups.splice(i, 1)
            $scope.$apply()
        })
    }

    $scope.getGroups = () => {
        $scope.groups = []
        db.collection("groups").get().then((querySnapshot) => {
            for (var i = 0; i < querySnapshot.docs.length; i++) {
                var doc = querySnapshot.docs[i]
                $scope.groups.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    users: doc.data().users
                })
            }
            $scope.$apply()
        })
    }

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
        debugger
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
        db.collection("events").doc($scope.events[$scope.currentEventMembership].id).update({
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
                    ordinalNumber: doc.data().ordinalNumber
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
            description: ""
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
            description: $scope.new.course.description
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
            description: $scope.new.course.description
        }).then(() => {
            for (let i = 0; i < $scope.courses.length; i++) {
                if ($scope.courses.id == $scope.new.course.id) {
                    $scope.courses[i].name = $scope.new.course.name
                    $scope.courses[i].description = $scope.new.course.description
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

    $scope.crudAssignment = () => {
        if ($scope.crudStates.assignment == "Create") $scope.createAssignment()
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
    $scope.usersAssignments = []

    $scope.getAssignments = () => {
        db.collection("assignments").get().then(function(qs) {
            qs.forEach(function(doc) {
                let assignment = { id: doc.id }
                Object.assign(assignment, doc.data())
                $scope.assignments.push(assignment)
            })
        }).then(function() {
            $scope.$apply()
        })
    }

    let getUserRequests = 0

    $scope.loadSubmissions = (i) => {
        $scope.currentGradingView = 2
        $scope.currentAssignmentIndex = i
        $scope.usersAssignments = []
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

    $scope.changeSubmissionStatus = (i, status) => {
        db.collection("users-assignments")
            .doc($scope.usersAssignments[i].id)
            .update({ status })
            .then(() => {
            $scope.usersAssignments[i].status = status
            $scope.$apply()
        })
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

    $scope.toDate = (timeObj) => {
        let t = new Date(1970, 0, 1)
        t.setSeconds(timeObj.seconds)
        return t
    }

    // Initialization Functions & View Management
    $scope.loaded = []
    for (let i = 0; i < $scope.tabs.length; i++) {
        $scope.loaded.push(false)
    }
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
    $scope.getGroups()

    $scope.loadData()

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
