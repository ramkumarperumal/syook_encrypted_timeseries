
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



//decryption of encrypted data
function decryptData(encryptedData) {
    const buff = Buffer.from(encryptedData, 'base64')
    const decipher = crypto.createDecipheriv(encryptionMethod, key, encryptionIV)
    return (decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
      decipher.final('utf8'));
  }

  module.exports = decryptData;