const randomNumber = require("random-number-csprng");
const {SHA256} = require("sha2");
const prompt = require('prompt-sync')();
const { createHmac } = require('crypto');
const {table} = require('table');

class HMAC {
  constructor (key) {
    this.key = key;
    this.__hmacDecode = createHmac('sha256',this.key);
  }
  getHash(value) {
    return this.__hmacDecode.update(value).digest('hex')
  }
}

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

class Game {
  constructor (items) {
    this.items = items;
  }
  computerMove() {
    this.computer = Math.floor(Math.random() * this.items.length)+1;
    console.log('comp move: '+this.computer)
    return this.computer;
  }
  checkUserWin(user){
    const itemsLength = this.items.length
    const halfItemsLength = Math.trunc(itemsLength/2);
    const result = user > this.computer ? (this.computer + halfItemsLength) >= user :
      (this.computer + halfItemsLength)%itemsLength >= user;
    return this.computer === user ? 'Draw' : result ? 'You win' : 'You lose';
  }
  printMenu() {
    console.log('Available moves:');
    this.items.forEach( (e,i) => {
      console.log(`${i+1} - ${e}`)
    });
    console.log('0 - exit');
    console.log('? - help');
  }
}

class Helper {
  moveTable(data) {
    return table(data);
  }
}

function rps() {

const game = new Game(process.argv.slice(2));
const key = new Key(0,game.items.length*100);
const hmac = new HMAC(key.value);
const helper = new Helper();

const computerMove = game.computerMove();
const computerMoveHash = hmac.getHash(game.items[computerMove-1]);
console.log('HMAC: '+ computerMoveHash);
game.printMenu();

let userMove;
let validUserMove = false;
while (!validUserMove ) {
  userMove = prompt('Enter your move: ');
  if (userMove <= game.items.length || userMove === '?') {
    game.userMove = userMove;
    validUserMove = !validUserMove;
  }
  else {
    console.log('Invalid move. Try again');
    game.printMenu();
  }
}
switch(userMove){
  case '0':
    return;
  case '?':
    const results = game.items.map( (e,i) => game.checkUserWin(i+1));
    const data = [
      ['Move'].concat(game.items),
      ['Result'].concat(results)
    ]
    console.log(helper.moveTable(data));
    break;
}

console.log('Your move: '+game.items[userMove-1]);
console.log('Computer move: '+game.items[game.computer-1]);
console.log(game.checkUserWin(userMove));
console.log('HMAC key: '+key.value);



}

rps();