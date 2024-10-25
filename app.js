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
  rl.question('Masukan Nama Folder : ', (folderName) => {
    const pathFolder = `${__dirname}/${folderName}`;

    // Kita cek apakah foldernya udah ada atau belum
    if (!fs.existsSync(pathFolder)) {
      // Foldernya belum ada, jadi kita buat baru
      fs.mkdirSync(pathFolder);
      console.log('success created new folder');
    } else {
      console.log('folder already exists');
    }

    rl.question('Masukan Nama File : ', (fileName) => {
      rl.question('Masukan Extension File : ', (extName) => {
        fs.writeFileSync(`${pathFolder}/${fileName}.${extName}`, '');
        console.log('success created new file');
        rl.close();
      });
    });
  });
};

module.exports = app;
