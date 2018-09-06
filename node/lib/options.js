const argv = require('minimist')(process.argv.slice(2));

class Options {
  constructor() {
    this.arguments = argv;
  }

  __getArgument(argument) {
    return this.arguments[argument];
  }

  isCommandLine() {
    return this.__getArgument('c') === true || this.__getArgument('commandline') === true;
  }
}

module.exports = new Options();
