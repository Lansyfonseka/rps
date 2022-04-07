const { createHmac } = require('crypto');

class HMAC {
  constructor (key) {
    this.key = key;
    this.__hmacDecode = createHmac('sha256',this.key);
  }
  getHash(value) {
    return this.__hmacDecode.update(value).digest('hex')
  }
}

module.exports = HMAC;