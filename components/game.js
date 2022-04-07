const random = require('random');

class Game {
  constructor (items) {
    this.items = items;
  }
  get computerMove() {
    this.computer = random.int(1,this.items.length+1);
    console.log('comp move: '+this.computer);
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
    const lineBreak = '\n';
    const moveMenu = this.items.map( (e,i)=> `${i+1} - ${e}`).join(lineBreak);
    console.log(`Available moves:${lineBreak+moveMenu}0 - exit${lineBreak}? - help`);
  }
}

module.exports = Game;