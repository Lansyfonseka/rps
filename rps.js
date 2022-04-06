const randomNumber = require("random-number-csprng");
const {SHA256} = require("sha2");
const prompt = require('prompt-sync')();
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

class Key {
  constructor (min,max) {
    const value = this.__getKey(min,max);
    this.value = SHA256(value.toString(),'hex').toString('hex');
  }
  async __getKey (min,max){
    return await randomNumber(min,max);
  }
}

class Game {
  constructor (numberItems) {
    this.numberItems = numberItems;
  }
  computerMove() {
    this.computer = Math.floor(Math.random() * this.numberItems.length);
    return this.computer;
  }
  set userMove(move) {
    this.user = move;
  }
  get checkWin(){
    return Math.abs( (this.computer - this.user)<= Math.trunc(this.numberItems/2))
  }
  menu() {
    console.log('Available moves:');
    this.numberItems.forEach( (e,i) => {
      console.log(`${i+1} - ${e}`)
    });
    console.log('0 - exit');
    console.log('? - help');
  }
}

const game = new Game(process.argv.slice(2));
const key = new Key(0,game.numberItems.length*100).toString();
const hmac = new HMAC(key);

const computerMove = game.computerMove();
const computerMoveHash = hmac.getHash(computerMove.toString());
console.log('HMAC: '+ computerMoveHash);
game.menu()


// if (inputItem.length % 2 === 0)
//   console.log('Invalid count of items. You should enter odd number >=3 not repeats strings');

// const halfArr = Math.trunc( inputItem.length / 2 );

// const key = getHash(getKey(1,100));
// // const step_1 = machineStep(inputItem.length);
// const step_1 = 0;
// const stpe_1_hash = getHash(step_1);


// // readline.question('Enter your move:', value => {
// //   if (value > inputItem.length)
// //     console.log('Invalit value. Try new game');
// //   else {
// //     console.log(`Your move: ${inputItem[--value]}`);
// //     readline.close();
// //   }
// // });

// let validMove = false;
// let value;
// while (!validMove){
//   value = prompt('Enter your move: ');
//   if (value < inputItem.length || value === '?')
//     validMove = !validMove;
//   else 
//     console.log('Invalid move. Try again')
// }
// console.log(`Your move: ${inputItem[value-1]}`);
// console.log(`Computer move: ${inputItem[step_1]}`);

// console.log(`You ${checkWin(step_1,value-1,halfArr)?'win':'lose'}`)



