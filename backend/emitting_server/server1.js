
//creating emitter server instance
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


//other require package for encryption and hashing
const path = require('path');
const encryptData = require('./encryption.js');
const hashData = require('./hash.js');
const data = require('./data.json');





//sent encrypted stream of data every 10 sec once client is connected to socket.io
io.on('connection', (socket)=>{
    console.log(`${socket.id} is connected`);

    const uniqIntervalId = setInterval(() => {
        sendDataToClient(socket);
    }, 10000)

    socket.on('disconnect', () => {
        clearInterval(uniqIntervalId);
        console.log(`${socket.id} is disconnected`);
    })
})




//socket server listening to port 3000
io.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });




//socket.emit send encrypted stream of data to socket client 
function sendDataToClient(socket){
    socket.emit('message', generateData())
}




//function to generate and encode given data
function generateData() {

    const totalName = data.names.length;
    const totalCity = data.cities.length;
    const max = 499;
    const min = 49;
    const rndInt = Math.floor(Math.random() * (max - min + 1) + min);
    let encryptedData;
    
    for (let i=0; i<rndInt; i++){
    const randNameIndex = Math.floor(Math.random()*totalName);
    const randCity1Index = Math.floor(Math.random()*totalCity);
    const randCity2Index = Math.floor(Math.random()*totalCity);
    const sendData = {
        name: data.names[randNameIndex],
        origin: data.cities[randCity1Index],
        destination: data.cities[randCity2Index]
    }

    const hash = hashData(sendData);
    
    const updatedData = {...sendData, secretKey: hash}

    encryptedData = encryptedData?encryptedData+"|"+encryptData(JSON.stringify(updatedData)):encryptData(JSON.stringify(updatedData))
}

    return {encryptedMessage: encryptedData};
}