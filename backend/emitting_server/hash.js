const { createHash } = require('crypto');


function hashData(data){

    const hash = Buffer.from(createHash('sha256').update(JSON.stringify(data)).digest('hex')).toString('base64');

    return hash;

}

module.exports = hashData;

