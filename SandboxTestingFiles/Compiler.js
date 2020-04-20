var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var message= "print(\"bam 77 bam\")"
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( "hello" );
    return xmlHttp.responseText;
}
console.log(httpGet("http://18.218.244.255:8080/"+message)); //http://18.218.244.255:8080/