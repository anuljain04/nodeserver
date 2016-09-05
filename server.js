//Lets require/import the HTTP module
var http = require('http'),
    url = require("url"),
    path = require("path"),
    fs = require("fs");

//Lets define a port we want to listen to
const PORT=4080; 

//We need a function which handles requests and send response
function handleRequest(request, response){
        console.log('request starting...');

    var filePath = '.' + request.url;
    if (filePath == './') {
        var files = fs.readdirSync('./files');
		response.writeHead(200, { 'Content-Type': 'text/html' });
		response.end(String(files));
		return;
	}

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
	
	request.on('error', function(err) {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
