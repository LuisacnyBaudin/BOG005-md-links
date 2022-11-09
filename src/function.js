
const chalk = require('chalk');
const fs = require('fs')
const path = require('path');
const marked = require('marked');
const axios = require('axios');
// const { fail } = require('assert');
const routeTest = 'testmd';

//Convertir la ruta de relativa a absoluta
// const processPath = process.argv[2];

const pathAbsolute = (route) => {
  if (path.isAbsolute(route)) {
    return route;
  } else {
    return path.resolve(route).normalize();
  }
};
// console.log("verificando path", pathAbsolute(routeTest));

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

// console.log(containerArray)

const readMd = (file) => {
  // "[hola](test) l l ll ll l ll [hola2](test2)".match(/\[([^\[\]]*)\]\((.*?)\)/g)
  return new Promise((resolve, reject) => {
    let arrayObjects = [];
    fs.readFile(file, 'utf8', (err, datafile) => {
      if (err) { resolve(err) };
      const renderer = new marked.Renderer()
      renderer.link = function (href, title, text) {
        const objectContainer = {
          'href': href,
          'text': text,
          'file': file,
        }
        if (objectContainer.href.includes('http')) {
          arrayObjects.push(objectContainer);
        }
      }
      marked.marked(datafile,
        { renderer })

      resolve(arrayObjects);
    });
  })
}
const getAllobjects = (arraysMD) => {
  const returnPromise = arraysMD.map(file => readMd(file));
  return Promise.all(returnPromise).then(res => res.flat());
}
// readMd(processPath).then((val) => { console.log("probando", val) })

function processLink(link) {
  return new Promise((resolve, reject) => {
    axios.get(link.href)
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          link.status = response.status
          link.ok = '✅';
          resolve(link);
        }
      }).catch((error) => {
        link.status = (error.name , "Please,check the link");
        link.ok = '🚫';
        resolve(link);
      });
  })

}
const getvalidateLinks = (validateLinks) => {
  let returnValidateLinks = validateLinks.map(link => processLink(link));
  return Promise.all(returnValidateLinks).then(res => res);
}

function statsLinks(links) {
  // console.log({
  //     Total: links.length,
  //     Unique: new Set(links.map((link) => link.href)).size
  // })
  return {
    Total: links.length,
    Unique: new Set(links.map((link) => link.href)).size

  }
}

//   console.log(statsLinks(containerArray));


function statsValidatelinks(links) {

  const failes = links.filter(link => link.ok == '🚫').length

  // console.log( {
  //     Total: links.length,
  //     Unique: new Set(links.map((link) => link.href)).size,
  //     Broken: failes
  // })
  return {
    Total: links.length,
    Unique: new Set(links.map((link) => link.href)).size,
    Broken: failes
  }
}

//   console.log(statsValidatelinks(containerArray));


module.exports = { getAllobjects, getvalidateLinks, pathAbsolute, getMDfiles, readMd, processLink, statsLinks, statsValidatelinks }