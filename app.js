const fs = require('node:fs');
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {};

app.makeFolder = () => {
  rl.question('Masukan Nama Folder : ', (folderName) => {
    fs.mkdir(__dirname + `/${folderName}`, () => {
      console.log('success created new folder');
    });
    rl.close();
  });
};

app.makeFile = () => {
  rl.question('Masukan Nama File : ', (fileName) => {
    rl.question('Masukan Extension File : ', (extName) => {
      fs.writeFile(__dirname + `/${fileName}.${extName}`, '', () => {
        console.log('success created new file');
      });
    });
  });
};

module.exports = app;
