const mocksData = {

    filePath: 'C:/Users/Usuario/BOG005-md-links/testmd',
    validateFalse : 
        [
            {
              href: 'https://es.wikipedia.org/wiki/Markdown',
              text: 'Markdown',
              file: 'C://Users//Usuario//BOG005-md-links//testmd//archivos.md'
            },
            {
              href: 'https://nodejs.org/',
              text: 'Node.js',
              file: 'C://Users//Usuario//BOG005-md-links//testmd//archivos.md'
            },
            {
              href: 'https://www.pixar.com/error500',
              text: 'Pruebaerror',
              file: 'C://Users//Usuario//BOG005-md-links//testmd//archivos.md'
            },
            {
              href: 'https://nodee.eeeejs.org/',
              text: 'Node.js',
              file: 'C://Users//Usuario//BOG005-md-links//testmd//archivos.md'
            },
            {
              href: 'https://nodee.ejs.o/rg/',
              text: 'Node.js',
              file: 'C://Users//Usuario//BOG005-md-links//testmd//archivos.md'
            },
            {
              href: 'https://es.wikipedia.org/wiki/Markdown',
              text: 'Markdown',
              file: 'C://Users//Usuario//BOG005-md-links//testmd//archivosparavver.md'
            },
            {
              href: 'https://nodejs.org/',
              text: 'Node.js',
              file: 'C://Users//Usuario//BOG005-md-links//testmd//archivosparavver.md'
            }
          ], 
    validateTrue: [
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: 'C://Users//Usuario//BOG005-md-links//testmd//archivos.md',
          status: 200,
          ok: '✅'
        },
        {
          href: 'https://nodejs.org/',
          text: 'Node.js',
          file: 'C://Users//Usuario//BOG005-md-links//testmd//archivos.md',
          status: 200,
          ok: '✅'
        },
        {
          href: 'https://www.pixar.com/error500',
          text: 'Pruebaerror',
          file: 'C://Users//Usuario//BOG005-md-links//testmd//archivos.md',
          status: 'Please,check the link',
          ok: '🚫'
        },
        {
          href: 'https://nodee.eeeejs.org/',
          text: 'Node.js',
          file: 'C://Users//Usuario//BOG005-md-links//testmd//archivos.md',
          status: 'Please,check the link',
          ok: '🚫'
        },
        {
          href: 'https://nodee.ejs.o/rg/',
          text: 'Node.js',
          file: 'C://Users//Usuario//BOG005-md-links//testmd//archivos.md',
          status:'Please,check the link',
          ok: '🚫'
        },
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: 'C://Users//Usuario//BOG005-md-links//testmd//archivosparavver.md',
          status: 200,
          ok: '✅'
        },
        {
          href: 'https://nodejs.org/',
          text: 'Node.js',
          file: 'C://Users//Usuario//BOG005-md-links//testmd//archivosparavver.md',
          status: 200,
          ok: '✅'
        }
      ],
    

    statsData: { Total: 2, Unique: 1 },
    statsAndValidateData: { Total: 2, Unique: 1, Broken: 1 }
  }
  
  module.exports = {
    mocksData
  }