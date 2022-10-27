const chalk = require('chalk');
const fs = require('fs')
const path = require('path');
const { marked } = require('marked');
const { resolve } = require('path')

//Convertir la ruta de relativa a absolut
const processPath = process.argv[2];


const pathAbsolute = (route) => {
  const absoluteRoute = path.resolve(route).normalize();
  if (!path.isAbsolute(processPath)) {
    return absoluteRoute;
  } else {
    return processPath;
  }
};

//utilizando extname para validar si el archivo es .md
const readextName = (processPath) => {
  const fileMD = path.extname(pathAbsolute(processPath)) === '.md';
  return fileMD;
};

//Leer el archivo
const readFiletwo = (processPath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(processPath, 'utf8', (error, file) => {
      console.log(fs.readFile(processPath));
      if (error) {
        throw error;
      }
      else if (!readextName(processPath)) {
        reject("ERROR")
      }
      resolve({
        path: processPath,
        file: file
      }
      ); console.log(file);
    });
  });
}

// if(path.extname(path) == ".md" && fs.statSync(path).isFile()){
//   arreglo.push(path);
// }else{
//   let direc = fs.readdirSync(newPath);
//   direc.forEach((elemento) => {
//     elemento = path.join(newPath, elemento);
//     if (fs.statSync(elemento).isDirectory()) {
//       arreglo = readdirec(elemento).concat(arreglo);
//     } 

// const isFile = fileName => {
//   return fs.lstatSync(fileName).isFile();
// };

// fs.readdirSync(folderPath)
//   .map(fileName => {
//     return path.join(folderPath, fileName);
//   })
//   .filter(isFile);

const markDownLinks = (processPath, options) => {
  return new Promise((resolve, reject) => {
    const verifiAbsolute = pathAbsolute(processPath);
    resolve(verifiAbsolute)
  })
}

markDownLinks(processPath).then(processPath => {
  console.log("si sirve", processPath);
});

