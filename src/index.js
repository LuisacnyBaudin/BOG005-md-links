const chalk = require('chalk');
const fs = require('fs')
const path = require('path');
const { marked } = require('marked');
const { resolve } = require('path')
const routeTest = 'test(md)';

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

function getMDfiles(allFileMD) { 
  const isFile = fs.statSync(allFileMD).isFile();
  const isDirectory = fs.statSync(allFileMD).isDirectory();
  const readextName = path.extname(allFileMD);
  let arrayMarkDown= [];
  let pathContainer = pathAbsolute(allFileMD);
  // console.log(chalk.cyan(pathContainer));
  if (isFile && readextName === '.md') {
      arrayMarkDown.push(pathContainer)
  console.log(chalk.magenta(arrayMarkDown));
  } else if (isFile && readextName !== '.md') {
      console.log(chalk.red('Archivo no tiene extensión .md son', readextName))
  } else if (isDirectory === true)   {
      fs.readdirSync(allFileMD).forEach(file => {
          let routePath = path.join(allFileMD,file);
          console.log(fs.readdirSync(allFileMD))
          console.log(chalk.magenta(routePath));
          if (isDirectory) {
            arrayMarkDown = arrayMarkDown.concat(getMDfiles(routePath))
          } else {
              if (path.extname(routePath) === '.md') {
                arrayMarkDown.push(routePath)
              }
          }
      })
  }
  return arrayMarkDown; // Retornando un array de archivos MD 
}
console.log(getMDfiles(routeTest));

// //Leer el archivo
// const readFiletwo = (processPath) => {
//   return new Promise((resolve, reject) => {
//     let prueba = [];
//     fs.readFile(processPath, 'utf8', (err, data) => {
//       console.log(fs.readFile(processPath));
//       if (err) resolve(err);
//       marked.marked(data, {
//         walkTokens: (token) => {
//           if (token.type === 'link' && token.href.includes('http')) {
//             infoLink.push({
//               href: token.href,
//               text: token.text,
//               file: processPath,
//             })
//           }
//         }
//       })
//       resolve(prueba);
//     })
//   })

// }
// readFiletwo('src/README.md').then((val) => { console.log("probando", val) }) //.then dice que hacer cuando la promesa exitosa



const markDownLinks = (processPath, options) => {
  return new Promise((resolve, reject) => {
    const verificAbsolut = pathAbsolute(processPath);
    resolve(verificAbsolut)
  })
}

markDownLinks(processPath).then(processPath => {
  console.log("si sirve", processPath);
});

