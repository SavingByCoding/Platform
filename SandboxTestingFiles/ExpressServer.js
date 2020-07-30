const express = require("express");
const compiler = require('compilex');
const envData = { OS : "linux" };
const options = {stats : true}; //prints stats on console
let output="";

compiler.init(options);
const app= express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", " http://localhost:63342"); // update to match the domain you will make the request from //Change this when running any python testing code
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/api/PythonCompiler/:Code",function (request,response) {

let Code= request.params.Code;
    Code= decodeURI(Code);//taking in the request and only keeping the code
    Code=Code.replace(/~/g,"#");
compiler.compilePython( envData , Code, function(data){
        console.log("code "+ Code);
        console.log("output "+data.output);
        let tempstringversionofoutput = new String(data.output);
        if(tempstringversionofoutput == "undefined"){
            output= data.error;
            console.log(data.error);
        }
        else{
            output=data.output;
        }
        response.send(output);
    });
})
app.listen(8080);
