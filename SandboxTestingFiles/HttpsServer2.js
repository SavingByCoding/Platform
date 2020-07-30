const http = require('http');
var compiler = require('compilex');
var code;
var output="";
var envData = { OS : "linux" };
var options = {stats : true}; //prints stats on console
compiler.init(options);
http.createServer((request, response) => {

    const { headers, method, url } = request;
    code=url.substring(1); //To make sure Comments Work
    console.log(code);
    code= decodeURI(code);//taking in the request and only keeping the code
    code=code.replace(/~/g,"#");
    console.log(code);
    compiler.compilePython( envData , code, function(data){
        console.log("code"+ code);
        console.log("output"+data.output);
        let tempstringversionofoutput = new String(data.output);
        // console.log(data.error);
        if(tempstringversionofoutput == "undefined"){
            output= data.error;
            console.log(data.error);
        }
        else{
            output=data.output;
        }
        response.write(output);
        response.end();
    });
}).listen(8080);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res, next) {
    // Handle the get for this route
});

const express = require ('express')
const app = express();

app.use(express.json());

app.get('/',function (request,response) {
    response.send('Hello World')
})

app.get('/api/courses',function(request,response){
    response.send([1,2,3,4,5]);
})

const courses= [
    {id:1, name:"course1"},
    {id:2, name:"course2"},
    {id:3, name:"course3"}
]

app.get('/api/courses/:id',function (request,response) {
const course= courses.find(c=> c.id === parseInt(request.params.id));
if(!course){
    response.status(404).send("Not found Bro")
}else{
    response.send(course)
}

})
app.post("/api/courses",function (request,response) {
const course = {
    id: courses.length+1,
    name: request.body.name //Assuming in the req body the request has a body with an attribute called name
}
courses.push(course);
response.send(course)

})
//port
const openPort= process.env.PORT || 8080;
app.listen(openPort, function () {
console.log("Listening on Port"+ openPort)
})

