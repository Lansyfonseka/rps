const { createHmac } = require('crypto');

class HMAC {
  #hmacencode
  constructor (key) {
    this.key = key;
    this.#hmacencode = createHmac('sha256',this.key);
  }
  getHash(value) {
    return this.#hmacencode.update(value).digest('hex')
  }
}

module.exports = HMAC;