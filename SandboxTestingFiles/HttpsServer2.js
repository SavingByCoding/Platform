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
        let tempstringversionofoutput= new String(data.output);
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
