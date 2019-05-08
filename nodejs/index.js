const http = require('http');
const flate = require('wasm-flate')

// found here:
// https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
// this is just a helper function
function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}

// we start a server with the http lib
http.createServer(function(req, res) {
    var data = [];
    // when we get data we want to store it in memory
    req.on('data', chunk => {
        data.push(chunk);
    // below we process the full data
    }).on('end', () => {
        var buffer = Buffer.concat(data); // read as buffer
        var bytesArray = new Uint8Array(buffer); // convert buffer to u8Array
        var start = process.hrtime() // start a timer
        // we print out the size of the data we recieved - it's compressed!
        console.log("Recieved data:", humanFileSize(bytesArray.length, true))
        if (bytesArray.length > 1) {
            // well run flate and decompress the data
            var decomp = flate.deflate_decode_raw(bytesArray)
            // we print out the size of the decompressed data
            console.log("Decompressed data:", humanFileSize(decomp.length, true))
            var runtime = process.hrtime(start) // we also check how much time has passed
            console.info('Execution time (hr): %ds %dms', runtime[0], runtime[1] / 1000000)
        }
    });
    res.write('ok'); //write a response to the client
    res.end(); //end the response
}).listen(8000); //the server object listens on port 8080