var http = require('http');
var fs = require('fs');
console.log('Server will listen at :  127.0.0.1:3005 ');
const server = http.createServer(async (req, res) => {
    const buffers = [];
  
    for await (const chunk of req) {
      buffers.push(chunk);
    }
  
    const data = JSON.parse(Buffer.concat(buffers).toString());
    data.data.sort()
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data) );
  })
server.listen(3005)
  
