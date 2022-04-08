const random = require('random');

class Game {
  #computerMove
  constructor (items) {
    if (items.length < 3 || items.length % 2 === 0 || items.length !== Array.from(new Set(items)).length)
      throw this.rulesOfInput;
    
    this.items = items;
  }
  get rulesOfInput(){
    const examples = ['rock paper scissors','rock paper scissors lizard spock','1 2 3 4 5 6 7 8 9'];
    return 'Amount of move should be odd number >= 3 and moves should be unique \n'+'Examples:\n'+examples.join('\n')
  }
  get computerMove() {
    if (!this.#computerMove)
      this.#computerMove = random.int(1,this.items.length);  

    console.log('Computer move: '+this.#computerMove);
    return this.#computerMove;
  }
  checkUserWin(userMove){
    const halfItemsLength = Math.trunc(this.items.length/2);
    const result = userMove > this.#computerMove ? userMove - this.#computerMove <= halfItemsLength : 
      this.#computerMove - userMove > halfItemsLength;
    return this.#computerMove == userMove ? 'Draw' : result ? 'You win' : 'You lose';
  }
  printMenu() {
    const lineBreak = '\n';
    const moveMenu = this.items.map( (e,i)=> `${i+1} - ${e}`).join(lineBreak);
    // console.log('Available moves:'+lineBreak+moveMenu+lineBreak+'0 - exit'+lineBreak+'? - help');
    console.log(`Available moves:${lineBreak+moveMenu+lineBreak}0 - exit${lineBreak}? - help`);
  }
  get answers(){
    return this.items.map( (e,i) => this.checkUserWin(i+1));
  }
}

module.exports = Game;