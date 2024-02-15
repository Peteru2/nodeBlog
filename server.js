var http = require('http');
var fs = require('fs');

var host = '127.0.0.1';
var port = '5000';



var server = http.createServer(function(req, res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

let path = './Views/';

    switch(req.url){
        case'/':
        path += "/index.html"
        break
        case '/about':
        path += "/about.html"
        break
        default:
        path += "/404.html"
        break

    }
   

    fs.readFile(path, function(err, html){
        if(err){
            console.log(err); 
            return;
        }
        else{
            res.write(html)
            res.end()
        }
    })
})





server.listen(port, host, function(){
console.log('server running on port '+ port );
})

