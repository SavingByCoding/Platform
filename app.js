var app= app.module('Sandbox',[]);
app.controller('MainController',['$Scope', function($Scope){

}])

$Scope.name= "hello";
$Scope.UserID = userID; //Value from the Firebase Code on Auth UserChange
$Scope.SaveProject = function(){
    //Create a document under user-projects
    //Generate a UUID For the project name

    let data= {
        code: editor.getValue(),
        user: $Scope.UserID,
        language: language,
        name: $("#ProjectName").val()
    };
    db.collection('users-assignments').doc(assignmentID+" from "+ userID).set(data);
};
$Scope.LoadProject = function(){ //Take code in
    var Assignmentdocument = db.collection('assignments').doc(assignmentID);
    let getDocument = Assignmentdocument.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                console.log('Document data:', doc.data());
                Assignment_Fields=doc.data();
                Assignment_Name= Assignment_Fields.name;
                Assignment_Problem= Assignment_Fields.description;
                Expected_Output= Assignment_Fields.expectedOutput;
                Related_Lesson= Assignment_Fields.lesson;
                DisplayHomework();
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
};

$Scope.DisplayProjects = function (){

};
