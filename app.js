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
        rl.question('Masukan Isi File : ', (fileData) => {
          fs.writeFileSync(`${pathFolder}/${fileName}.${extName}`, `${fileData}`);
          console.log('success created new file');
          rl.close();
        });
      });
    });
  });
};

app.extSorter = () => {
  const files = fs.readdirSync('unorganize_folder');

  const moveFile = (folderName, file) => {
    fs.mkdir(__dirname + `/${folderName}/`, () => {
      fs.rename(__dirname + '/unorganize_folder/' + file, __dirname + `/${folderName}/` + file, (err) => {});
    });
  };

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const extName = file.split('.')[file.split('.').length - 1];

    if (['txt', 'pdf', 'md', 'jpg', 'png'].includes(extName)) {
      moveFile(extName, file);
    }
  }
};

module.exports = app;
