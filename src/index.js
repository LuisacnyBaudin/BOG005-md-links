const chalk = require('chalk');
const fs = require('fs')
const path = require('path');
const marked = require('marked');
// const { resolve } = require('path')
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
  let arrayMarkDown = [];
  let pathContainer = pathAbsolute(allFileMD);
  // console.log(chalk.cyan(pathContainer));
  if (isFile && readextName === '.md') {
    arrayMarkDown.push(pathContainer)
    // console.log(chalk.magenta(arrayMarkDown));
  } else if (isFile && readextName !== '.md') {
    // console.log(chalk.red('Archivo no tiene extensión .md son', readextName))
  } else if (isDirectory === true) {
    fs.readdirSync(allFileMD).forEach(file => {
      let routePath = path.join(allFileMD, file);
      // console.log(fs.readdirSync(allFileMD))
      // console.log(chalk.magenta(routePath));
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

const containerArray = getMDfiles(routeTest);

const readMd = (file) => {
  // "[hola](test) l l ll ll l ll [hola2](test2)".match(/\[([^\[\]]*)\]\((.*?)\)/g)
  return new Promise((resolve, reject) => {
    let pruebatwo = [];
    fs.readFile(file, 'utf8', (err, datafile) => {
      if (err) { resolve(err) };
      const renderer = new marked.Renderer()
      renderer.link = function (href, title, text) {
        const creandoObjeto = {
          'href': href,
          'text': text,
          'file': file,
        }
        if (creandoObjeto.href.includes('http')) {
          pruebatwo.push(creandoObjeto);
        }
      }
      marked.marked(datafile,
        { renderer })
      
      resolve(pruebatwo);
    });
  })  
}  

// readMd(processPath).then((val) => { console.log("probando", val) })


const markDownLinks = (Path, option) => {
  return new Promise((resolve, reject) => {
    const verifyAbsolut = pathAbsolute(Path);
    const containerArray = getMDfiles(verifyAbsolut);
    const readMarkdown = readMd(containerArray);
    resolve(readMarkdown)
  })
}

markDownLinks(routeTest).then((data) => {
  console.log("si sirve", data);
});
//prueba subir readme. 
