const fs = require('node:fs');
const readline = require('node:readline');
const path = require('path');

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

app.readFolder = () => {
  rl.question('Masukan Nama Folder : ', (folderName) => {
    const pathFolder = `${__dirname}/${folderName}`;

    const result = [];

    if (fs.existsSync(pathFolder)) {
      console.log('folder exists');
    } else {
      console.log('folder not found!');
      rl.close();
    }

    const listFile = fs.readdirSync(pathFolder);

    for (let index = 0; index < listFile.length; index++) {
      const file = listFile[index];

      const detail = fs.statSync(pathFolder + '/' + file);
      const extName = file.split('.')[file.split('.').length - 1];
      const ukuranFileBytes = detail.size >= 1024 * 1024 ? (detail.size / (1024 * 1024)).toFixed(2) + 'mb' : (detail.size / 1024).toFixed(2) + 'kb';

      let typeFile = '';

      if (['jpg', 'png'].includes(extName)) {
        typeFile = 'gambar';
      } else if (['txt', 'md'].includes(extName)) {
        typeFile = 'text';
      } else if (['pdf'].includes(extName)) {
        typeFile = 'document';
      } else {
        typeFile = 'Tidak terdeteksi';
      }

      result.push({
        namaFile: file,
        extensi: extName,
        jenisFile: typeFile,
        tanggalDibuat: detail.birthtime.toISOString().split('T')[0],
        ukuranFile: ukuranFileBytes,
      });
    }
    console.log(result);
    rl.close();
  });
};

module.exports = app;
