
const crypto = require('crypto');
const secretKey = 'secretKey';
const secretIv = 'secretIV';
const encryptionMethod = 'aes-256-ctr';



const key = crypto
  .createHash('sha512')
  .update(secretKey)
  .digest('hex')
  .substring(0, 32)

  

const encryptionIV = crypto
  .createHash('sha512')
  .update(secretIv)
  .digest('hex')
  .substring(0, 16)


//return encrypted text for over data
  function encryptData(data) {
    const cipher = crypto.createCipheriv(encryptionMethod, key, encryptionIV)
    return Buffer.from(
      cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64') 
  }




module.exports = encryptData;