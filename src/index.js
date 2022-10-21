const chalk = require('chalk');
const fs= require('fs')
const path = require('path');
const {resolve}= require('path')

//Convertir la ruta de relativa a absoluta


const pathAbsolute= (route) =>{
const processPath= process.argv[2];
const absoluteRoute= path.resolve(route).normalize();
if(!path.isAbsolute(processPath)){
console.log(chalk.magenta(absoluteRoute));
    return absoluteRoute;
}else{
    return processPath;
} 
};

//utilizando extname para validar si el archivo es .md
  const readextName = (processPath) => {
    const fileMD = path.extname(pathAbsolute(processPath)) === '.md';
    console.log(fileMD);
    return fileMD;
};

//Leer el archivo
const readFiletwo = (processPath) =>{
return new Promise((resolve, reject) =>{
fs.readFile(processPath.path, 'utf8', (error, file) => {
    if (error) {
      throw error; 
    }
     else if(!readextName(processPath)) {
      reject("ERROR")
     }
     resolve({
        path: processPath,
        file: file 
     }
     );
  }); console.log(processPath)
});
}
const markDownLinks = (processPath, options) => {
    return new Promise((resolve, reject) => {
        //Ingresa path
        //Función para convertir la ruta en absoluta
        const absoluteRoute = pathAbsolute(processPath);
        //Función que evalua si la ruta es un archivo .md
        readextName(absoluteRoute);
        //Función que lee el archivo y crea el objeto
        const basicInfoLinks = [];
        readNewFile(absoluteRoute)
        return basicInfoLinks;
    })
}
