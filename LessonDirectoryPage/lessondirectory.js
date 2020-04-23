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
var app = angular.module('SBCLessonDirectory', []);

app.controller('AppController', function($scope) {
    $scope.directory = ['Course Directory'];
    $scope.items = [];
    $scope.currItem = {};

    $scope.initItems = function() {
        db.collection("courses").get().then((querySnapshot) => {
            for (var i = 0; i < querySnapshot.docs.length; i++) {
                var doc = querySnapshot.docs[i];
                $scope.items.push({
                    id: doc.id,
                    name: doc.data().name,
                    description: doc.data().description,
                    type: "course"
                });
            }
            $scope.$apply();
        });
    };

    $scope.getChild = function(curr) {
        var map = {
            course: "unit",
            unit: "lesson"
        };
        return map[curr];
    };

    $scope.getChildCollection = function(curr) {
        var map = {
            course: "units",
            unit: "lessons"
        };
        return map[curr];
    };

    $scope.switchView = function(i) {
        var item = $scope.items[i];
        $scope.currItem = item;
        $scope.items = [];
        if (item.type == "lesson") {
            // TODO Redirect to new page
        }
        else {
            db.collection($scope.getChildCollection(item.type)).where(item.type, '==', item.id).get().then((querySnapshot) => {
                $scope.items = [];
                for (var i = 0; i < querySnapshot.docs.length; i++) {
                    var doc = querySnapshot.docs[i];
                    $scope.items.push({
                        id: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                        type: $scope.getChild(item.type)
                    });
                }
                $scope.$apply();
            });
        }
        $scope.directory.push(item.name);
    };

    $scope.initItems();
});