const http = require('http');
const fs = require('fs');
const _ = require('lodash') 


const host = '127.0.0.1';
const port = '4000';

const  server = http.createServer(function(req, res){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    console.log(_.random(1, 30))
let path = './Views/';

    switch(req.url){
        case'/':
        path += "/index.html"
        res.statusCode = 200
        break
        case '/about':
        path += "/about.html"
        res.statusCode = 200
        break
        case '/about-me':
        res.setHeader('Location','/about')
        res.statusCode = 301
        res.end()
        break
        default:
        path += "/404.html"
        res.statusCode = 404

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

