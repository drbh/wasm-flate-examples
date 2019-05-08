const http = require('http');
const flate = require('wasm-flate')
// const fs = require('fs');

http.createServer(function(req, res) {

    // var data = [];
    // req.on('data', chunk => {
    //     data.push(chunk);

    // }).on('end', () => {
    //     var buffer = Buffer.concat(data);
    //     var bytesArray = new Uint8Array(buffer);

    //     console.log("Recieved Array of Length:", bytesArray.length)

    //     // var comp = flate.deflate_encode_raw(bytesArray)
    //     var decomp = flate.deflate_decode_raw(bytesArray)

    //     console.log("Decompressed Array of Length:", decomp.length)
        
    // });
    var bytesArray = new Uint8Array( Buffer.from('David Richard Blyn Holtz') );
    var comp = flate.deflate_encode_raw(bytesArray)

    res.write(comp); //write a response to the client
    res.end(); //end the response

}).listen(8000); //the server object listens on port 8080