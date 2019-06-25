const {listAllTables, query} = require("./database");

const http = require("http");
const fs = require("fs");
const path = require("path");

http.createServer(function(req,res){
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');

    //console.log(req.method +":"+ req.url);
 
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
    }
    else if (req.method === 'POST') {

        var content = "";

        req.on('data', function (chunk) {
            content += chunk;
        });
      
        req.on('end', function () {
            content = JSON.parse(content);
            switch (content.opt) {
                case "table":
                    listAllTables(res);
                    break;
                case "query":
                    query(res, content.queryStr);
                    break;
                default:
                    res.end("Invalid Option");
            }
        });
    }
    else if (req.method === 'GET') {
        let url = req.url;
        if (url === '/index' || url === '/') {
            res.writeHead(200,{'Content-type':"text/html;charset=utf-8"});
            let data = fs.readFileSync(path.join(__dirname, '../www/index.html'), "utf-8");
            res.end(data);
        }
        else if (url !== '/'){
            let surl = '.'+url;
            let type = surl.substr(surl.lastIndexOf(".")+1,surl.length);
            res.writeHead(200,{'Content-type':"text/"+type+";charset=utf-8"});
            let data = fs.readFileSync(path.join(__dirname, "../www/"+surl), "utf-8");
            res.end(data);
        }
    }
}).listen(3000);

console.log('Server is running at http://127.0.0.1:3000/');
