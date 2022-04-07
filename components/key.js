const {SHA256} = require("sha2");
const randomNumber = require("random-number-csprng");

class Key {
  constructor (min,max) {
    const value = this.__generateKey(min,max);
    this.__value = SHA256(value.toString(),'hex').toString('hex');
  }
  async __generateKey (min,max){
    return await randomNumber(min,max);
  }
  get value(){
    return this.__value;
  }
}

module.exports = Key;