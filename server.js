//Lets require/import the HTTP module
var http = require('http'),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
	busboy = require('connect-busboy'),
	express = require('express'),
	app = express();
 
//Lets define a port we want to listen to
const PORT=8080;
app.use(busboy());
app.use(express.static('img'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/fileList', function (request, response) {
    console.log('request starting...');
	var files = fs.readdirSync('./img');
	// thumb(options, callback); 
	response.writeHead(200, { 'Content-Type': 'text/html' });
	response.end(String(files));
	return;
});

app.get('/delete',function(request, response){
	console.log('delete request' + request.params + "||" +request.query);
	var filename = "img/" + request.query.filename;
	fs.unlink(filename,function(status){
		response.writeHead(200, { 'Content-Type': 'text/html' });
		if(status == null) {
			response.end("file deleted!!");
		} else {
			response.end(String(status));
		}
	});
	return;
}); 

app.route('/upload')
    .post(function (req, res, next) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);
            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/img/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);              
                res.redirect('back');           //where to go next
            });
        });
    });

app.listen(PORT, function () {
  console.log('Example app listening on port!'+PORT);
});

var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

console.log(addresses);
