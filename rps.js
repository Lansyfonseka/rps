const prompt = require('prompt-sync')();
const HMAC = require('./components/hmac');
const Game = require('./components/game');
const Key = require('./components/key');
const Helper = require('./components/helper');

async function rps() {
  try {
    const game = new Game(process.argv.slice(2));
    const key = new Key(0,game.items.length*100);
    const hmac = new HMAC(key.value);
    const helper = new Helper();

    const computerMove = await game.computerMove;
    const computerMoveHash = hmac.getHash(game.items[computerMove-1]);
    console.log('HMAC: '+ computerMoveHash);
    game.printMenu();

    let userMove;
    let isValidUserMove = false;
    const validValues = new RegExp(`[0-${game.items.length},?]`);
    while (!isValidUserMove ) {
      userMove = prompt('Enter your move: ');
      validValues.test(userMove) ? isValidUserMove = !isValidUserMove : game.printMenu();
      if (userMove === '?') {
        const results = game.answers;
        const data = [
          ['Move'].concat(game.items),
          ['Result'].concat(results)
        ];
        const config = {
          columns: [{alignment: 'left'}].concat(game.items.fill({alignment:'center'}))
        }
        console.log(helper.drawTable(data,config));
        isValidUserMove = !isValidUserMove;
      }
    }

    if (userMove == 0) throw 'Game is over :(';

    console.log('Your move: '+game.items[userMove-1]);
    console.log('Computer move: '+game.items[computerMove-1]);
    console.log(game.checkUserWin(userMove));
    console.log('HMAC key: '+key.value);
  }
  catch(error){
    console.log(error)
  }
}

rps();