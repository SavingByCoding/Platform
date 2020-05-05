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
var app = angular.module('SBCViewLesson', [])

const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

app.controller('AppController', ($scope) => {
    $scope.directory = ["Course Directory", "", "", ""]
    $scope.lessonId = getParameterByName('lessonid')

    $scope.getLesson = () => {
        db.collection('lessons').doc($scope.lessonId).get().then((doc) => {
            let {name, description, ordinalNumber, unit} = doc.data()
            $scope.name = name
            $scope.description = description
            $scope.ordinalNumber = ordinalNumber
            $scope.unitId = unit
            $scope.getUnit()
        })
    }

    $scope.getUnit = () => {
        db.collection('units').doc($scope.unitId).get().then((doc) => {
            let {name, description, course: courseId, ordinalNumber} = doc.data()
            $scope.unit = {name, description, courseId, ordinalNumber}
            $scope.getCourse()
        })
    }

    $scope.getCourse = () => {
        db.collection('courses').doc($scope.unit.courseId).get().then((doc) => {
            let {name, description, ordinalNumber} = doc.data()
            $scope.course = {name, description, ordinalNumber}
            $scope.$apply()
        })
    }

    $scope.getLesson()
})