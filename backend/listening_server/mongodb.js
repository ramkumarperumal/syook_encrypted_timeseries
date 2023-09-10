const {MongoClient} = require('mongodb');


const uri = `mongodb+srv://demo:test%40123@cluster0.yubv0wz.mongodb.net/?retryWrites=true&w=majority`;            
const dbName = 'syook'; 


async function addDataToServer(data){


//initialisation of mongodb 
const client = new MongoClient(uri);

    try{

        const res = await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('encrypted_timeseries');

        //creating minute time stamp
        const minStamp = new Date(data[0].timestamp);
        minStamp.setSeconds(0);

        //checking for existance of minute timestamp 
        const checkData = await collection.findOne({_id: minStamp});

        //if exists update the existing document
        if(checkData){
            await collection.updateOne({_id: minStamp}, {$push: {data: { $each: data }}});
        }

        //creating the new document in collection
        else{
            await collection.insertOne({_id: minStamp, data: data});
        }
    }
    catch(e){
        console.error(e);
    }
    finally{
        client.close();
    }
}



module.exports = addDataToServer;





