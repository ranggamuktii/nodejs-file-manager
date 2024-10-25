const app = require('./app');

const args = process.argv.slice(2);

const command = args[0];

switch (command) {
  case 'make-folder':
    app.makeFolder();
    break;
  case 'make-file':
    app.makeFile();
    break;
  case 'ext-sorter':
    app.extSorter();
    break;
  default:
    throw Error('Invalid command');
    break;
}
