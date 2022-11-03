const { pathAbsolute, getMDfiles, getAllobjects, getvalidateLinks} = require('./function.js')

const chalk = require('chalk');
const fs = require('fs')
const path = require('path');
const routeTest = 'testmd';
  
   const markDownLinks = (Path, option={validate:false}) => {
   return new Promise((resolve, reject) => {
    const verifyAbsolut = pathAbsolute(Path);
    const containerArray = getMDfiles(verifyAbsolut);
   if(option.validate){
    getAllobjects(containerArray)
    .then(res => getvalidateLinks(res))
    .then(res2 => resolve(res2))
   }else {
    getAllobjects(containerArray)
    .then(res => resolve(res))
   }
  })
}

markDownLinks(routeTest).then((data) => {
  console.log(("si sirve", data));
});


module.exports= {markDownLinks};

