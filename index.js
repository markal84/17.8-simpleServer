var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('request', function (request, response) {
    response.setHeader("Content-Type", "text/html; charset=utf-8"); // set headers to text/html and decode in utf-8 to properly display a index.html
    if (request.method === 'GET' && request.url === '/') { //if user write server address in web browser ->
        //response.write('<h1>Hello World!</h1>');
        fs.readFile('index.html', function(err, data) { //  -> read index.html ->
        response.write(data); // -> server response is a index.html file requested by user
        response.end();
        });       
    } else {
        response.statusCode = 404; // if user put any other address ie. localhost/something ->
        response.setHeader("Content-Type", 'image/jpg'); // -> set header type to image/jpg because we want to display picture not buffer ->
        //response.write('<h1>404: Zła ścieżka!</h1>');
        fs.readFile('./404_error.png', function(err, data){ // -> read 404 image ->
        if (err) throw err;
        response.write(data); // -> display image to user 
        //console.log('sending 404 image');
        response.end();
        });          
    }
});

server.listen(8080);