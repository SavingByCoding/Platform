var admin = require("firebase-admin");

var serviceAccount = require("/Users/jeeva/WebstormProjects/Platform/saving-by-coding-firebase-adminsdk-dmcsw-a7022e0d3e.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://saving-by-coding.firebaseio.com"
});
const db = admin.firestore();

const csv = require('csv-parser');
const fs = require('fs');
const fastcsv = require('fast-csv');

const results = [];
fs.createReadStream('emails.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
    });

//create a function to check if there are any new emails from the DB, if they are add them to the Excel sheet

addNewEmails = async function () {
    const snapshot = await db.collection('email-list').get();
    snapshot.forEach((doc) => {
        results.push({ //goes through DB
            'First Name': doc.data().userFirstName,
            'Last Name':doc.data().userLastName,
            Email: doc.data().userEmail
        })
    });
    writeToCSV();
};

writeToCSV= function(){

    const ws = fs.createWriteStream("emails.csv");
    fastcsv
        .write(results, { headers: true })
        .pipe(ws);
}


addNewEmails(function () {
    writeToCSV();
});


