# 🗜️⚡ `wasm-flate` examples

This repo contains examples for interacting with `wasm-flate` and with and Node servers (Python & Golang coming soon).  

[wasm-flate](https://github.com/drbh/wasm-flate)  
[npm package](https://npmjs.com/package/wasm-flate)  
[![Python 3.7](https://img.shields.io/badge/python-3.7-blue.svg)](https://www.python.org/downloads/release/python-370/)

The follow examples show how to consume compressed data from the browser and decrypt on the server side, or how to compress data server side an decompress in the browser.

**Browser → Server usecases**  
- Users uploading files  
- Moving large data from the user to the server  
Covered in Node and Python, working on Go and Rust examples.  

**Server → Browser usecases**  
- Sending large files for UX (3D files, large config files, downloads)  
- Sending data to people with unstable internet - much smaller packets on network  
Working on Node, Python, Go and Rust examples.  


## Clone the Examples
```bash
git clone https://github.com/drbh/wasm-flate-examples.git
cd wasm-flate-examples
```

All of the following examples use the DEFLATE algo, but `wasm-flate` supports gzip and zlib too, just change the compression functions accordingly.  

## Start UI

All of the UI files are staic and only need to be hosted on a simple webserver. We'll fetch and install the `http-server` so we can easily start a server in the UI directory.
```bash
npm install http-server -g
cd dist
http-server
```
Now we can access the UI files at `localhost:8080/send.html`  

## Browser → Server (Client-Side)

![File Upload and Compress UI](https://raw.githubusercontent.com/drbh/wasm-flate-examples/master/images/fileinput.png)

This example page allows us to upload a file from our file system. Compress it with `wasm-flate` and send it to a local server (in python or node)

```
http://localhost:8080/send.html
```

## Browser → Server (Server-Side)

![compress and send to server](https://raw.githubusercontent.com/drbh/wasm-flate-examples/master/images/screenshot.png)

### Node
```bash
cd nodejs
npm install
node index.js 
```

After you send a file you can see the file compressed and decompressed sizes, as well as the server decompression run time.
```
Recieved data: 1.3 MB
Decompressed data: 5.1 MB
Execution time (hr): 0s 64.069506ms
```

### Python
```bash
cd python
pip install flask
python uncompress-requests.py
```

After you send a file you can see the file compressed and decompressed sizes, as well as the server decompression run time.
```
Recieved data: 1MB
Decompressed data: 4MB
Execution time (hr): 0:00:00.018002
127.0.0.1 - - [08/May/2019 23:53:24] "POST / HTTP/1.1" 200 -
```

## Browser → Browser (Only Client-Side)

![compress and decompress in browser](https://raw.githubusercontent.com/drbh/wasm-flate-examples/master/images/browser-only.png)

This example allows us to compress and download files, or decompress and download files. 
