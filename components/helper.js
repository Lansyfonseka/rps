const {table} = require('table');

class Helper {
  drawTable(data,config) {
    return table(data,config);
  }
}

module.exports = Helper;