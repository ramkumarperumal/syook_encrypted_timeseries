const {MongoClient} = require('mongodb');

const uri = `mongodb+srv://demo:test%40123@cluster0.yubv0wz.mongodb.net/?retryWrites=true&w=majority`;            'mongodb+srv://demo:<password>@cluster0.yubv0wz.mongodb.net/?retryWrites=true&w=majority'
const dbName = 'syook'; 


async function addDataToServer(data){



    const client = new MongoClient(uri);

    try{

        const res = await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('encrypted_timeseries');

        const minStamp = new Date(data[0].timestamp);
        minStamp.setSeconds(0);

        const checkData = await collection.findOne({_id: minStamp});


        if(checkData){

            await collection.updateOne({_id: minStamp}, {$push: {data: { $each: data }}});

        }
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





