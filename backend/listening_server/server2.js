
const io = require('socket.io-client');
const decryptData = require('./decryption.js');
const hashData = require('./hash.js');
const addDataToServer = require('./mongodb.js');

const app = require('express')();
const path = require('path');
const server = require('http').createServer(app);
const ioServer = require('socket.io')(server, {
    cors: {origin: '*'}});






server.listen(5000, () => {
    console.log('server running at http://localhost:5000');
  });



ioServer.on('connection', (socketCli)=>{

    socketClient = socketCli;
    console.log(`${socketClient.id} is connected`);
     
    socketClient.on('disconnect', () => {
        console.log(`${socketClient.id} is disconnected`);
    })

  });




//http://localhost:3000

const socket = io.connect("https://syook-emitter.onrender.com", {
    reconnection: true
});


let validatedDataList = []

socket.on('connect', () => {
    console.log('connected to https://syook-emitter.onrender.com');

    socket.on('message', (data) =>{
        validatedDataList = []
        const {encryptedMessage} = data;
        const encryptDataList = encryptedMessage.split('|');
        const totalDataCount = encryptDataList.length;
        let validDataCount = 0;
        let distortedDataCount = 0;
        encryptDataList.forEach(each => {

        const decryptedData = decryptData(each);
        const parseData = JSON.parse(decryptedData);
        const {secretKey, ...originalData} = parseData;
        if (secretKey===hashData(originalData)){
            const dateString = new Date().toString();
            const validatedData = {...originalData, timestamp: dateString}
            
            
            validatedDataList.push(validatedData);
            validDataCount += 1; 
        }
        else{
            distortedDataCount+=1;
        }
        });

        addDataToServer(validatedDataList);

        validatedDataList = [...validatedDataList, {totalData: totalDataCount, validData: validDataCount, distortedData: distortedDataCount}]
        
        ioServer.emit('realtime data', validatedDataList);
        

        console.log(`Total data received: ${totalDataCount}`);
        console.log(`Total valid data received: ${validDataCount}`);
        console.log(`Total distorted data received: ${distortedDataCount}`);

    });
    

});









