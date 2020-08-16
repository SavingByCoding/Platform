const express = require("express");
const compiler = require('compilex');
const envData = { OS : "linux" };
const options = {stats : true}; //prints stats on console
let output="";

compiler.init(options);
const app= express();

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
app.listen(8000);

//Make Server Open on port 8000
