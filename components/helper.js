const {table} = require('table');

class Helper {
  moveTable(data) {
    return table(data);
  }
}

module.exports = Helper;