let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let nodemailer = require('nodemailer')
let handlebars = require('handlebars')
let fs = require('fs')

let USERNAME = 'savingbycoding@gmail.com'
let EMAIL = 'savingbycoding@gmail.com'
let PASSWORD = 'Outofbounds123'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//let port = process.env.PORT || 8080
let port = 8080

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: USERNAME,
        pass: PASSWORD
    }
})

let readHTMLFile = (path, callback) => {
    fs.readFile(path, {encoding: 'utf-8'}, (err, html) => {
        if (err) {
            throw err
            callback(err)
        }
        else {
            callback(null, html)
        }
    });
};

let router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

//Registration Confirmation
router.post('/registrationConfirmation', (req, res, next) => {
    readHTMLFile(__dirname + '/email.html', (err, html) => { //Replace with the registration confirmation
        let template = handlebars.compile(html)
        let replacements = {
            name: req.body.name,
            courseName: req.body.courseName,
            confirmationNumber: req.body.confirmationNumber
        }
        let htmlToSend = template(replacements)
        let mailOptions = {
            from: EMAIL,
            to: `${req.body.email}`,
            subject: `Registration Confirmation from Codeology, ${req.body.name}!`,
            html : htmlToSend
        }

        transporter.sendMail(Object.assign({}, mailOptions), (err, res2) => {
            if (err) {
                console.log('Error sending email: ' + err)
            }
            else {
                console.log('Response: ' + res2)
                res.send(`Email sent to ${req.body.name} <${req.body.email}>`)
            }
        })
    })
})

//gradedAssignments
router.post('/gradedAssignments', (req, res, next) => {
    readHTMLFile(__dirname + '/email.html', (err, html) => { //Replace with the Graded confirmation
        let template = handlebars.compile(html)
        let replacements = {
            name: req.body.name,
            assignmentName: req.body.assignmentName,
            language: req.body.language
        }
        let htmlToSend = template(replacements)
        let mailOptions = {
            from: EMAIL,
            to: `${req.body.email}`,
            subject: `Graded Homework, ${req.body.name}!`,
            html : htmlToSend
        }

        transporter.sendMail(Object.assign({}, mailOptions), (err, res2) => {
            if (err) {
                console.log('Error sending email: ' + err)
            }
            else {
                console.log('Response: ' + res2)
                res.send(`Email sent to ${req.body.name} <${req.body.email}>`)
            }
        })
    })
})


// send name and email
router.post('/email', (req, res, next) => {
    readHTMLFile(__dirname + '/email.html', (err, html) => {
        let template = handlebars.compile(html)
        let replacements = {
            name: req.body.name //Attatching the name attribute to the email to fill it in
        }
        let htmlToSend = template(replacements)
        let mailOptions = {
            from: EMAIL,
            to: `${req.body.email}`,
            subject: `Welcome to Codeology, ${req.body.name}!`,
            html : htmlToSend
        }

        transporter.sendMail(Object.assign({}, mailOptions), (err, res2) => {
            if (err) {
                console.log('Error sending email: ' + err)
            }
            else {
                console.log('Response: ' + res2)
                res.send(`Email sent to ${req.body.name} <${req.body.email}>`)
            }
        })
    })
})
app.use('/api', router)

app.listen(port)
console.log('Application hosted on port ' + port)
