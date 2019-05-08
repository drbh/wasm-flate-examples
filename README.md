# 🗜️⚡ `wasm-flate` examples

This repo contains examples for interacting with `wasm-flate` and with and Node servers (Python & Golang coming soon).  

[wasm-flate](https://github.com/drbh/wasm-flate)  
[npm package](https://npmjs.com/package/wasm-flate)  

The follow examples show how to consume compressed data from the browser and decrypt on the server side, or how to compress data server side an decompress in the browser.

**Browser → Server usecases**  
- Users uploading files  
- Moving large data from the user to the server  

**Server → Browser usecases**  
- Sending large files for UX (3D files, large config files, downloads)  
- Sending data to people with unstable internet - much smaller packets on network  


## Clone the Examples
```
git clone https://github.com/drbh/wasm-flate-examples.git
cd wasm-flate-examples
```

## Start UI

All of the UI files are staic and only need to be hosted on a simple webserver. We'll fetch and install the `http-server` so we can easily start a server in the UI directory.
```
npm install http-server -g
cd dist
http-server
```
Now we can access the UI files at `localhost:8080/`  


**Browser → Server**  
```
http://localhost:8080/send.html
```


## Browser → Server

![compress and send to server](https://raw.githubusercontent.com/drbh/wasm-flate-examples/master/images/screenshot.png)

#### Node
```
cd nodejs
npm install
node index.js 
```
After you send a file
```
Recieved data: 1.3 MB
Decompressed data: 5.1 MB
Execution time (hr): 0s 64.069506ms
```
