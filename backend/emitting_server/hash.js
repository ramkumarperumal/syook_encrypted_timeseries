const { createHash } = require('crypto');



//return sha-256 hash for original data
function hashData(data){

    const hash = Buffer.from(createHash('sha256').update(JSON.stringify(data)).digest('hex')).toString('base64');

    return hash;

}

module.exports = hashData;

