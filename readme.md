# syook_encrypted_timeseries

#Folder structure


backend(node.js)

      |_ emitting_server(encrytion.js, hash.js, server1.js)
      |_ listening_server(decryption.js, hash.js, server2.js, mongodb.js)

frontend(react)

       |_src
	   |_App.js

## Emitting Server

Required NPM packages: crypto, express, nodemon, socket.io

hosted link: https://syook-emitter.onrender.com (or) http://localhost:3000

## Listening Server

Required NPM packages: crypto, express, nodemon, socket.io, socket.io-client, mongodb

hosting: http://localhost:5000

## Frontend

Required NPM packages: socket.io-client

hosting: http://localhost:3006


## Command to run code

### Running emitting_server(optional because I hosted it globally )

 navigate to a specific folder
 ```bash
   cd backend/emitting_server 
```

Install all required packages
```bash
  npm install
```
host the server
```bash
  npm start
```

### Running Listening_server

 navigate to a specific folder
 ```bash
   cd backend/listening_server 
```

Install all required packages
```bash
  npm install
```
host the server
```bash
  npm start
```

### Running frontend 

 navigate to a specific folder
 ```bash
   cd frontend 
```

Install all required packages
```bash
  npm install
```
host the server
```bash
  npm start
```

If hosted emitting_server is not connected, change io.connect link to //http://localhost:3000 in backend/listening_server/server2.js and run backend/emitting_server/server1.js locally

