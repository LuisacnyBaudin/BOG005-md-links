const { pathAbsolute, getMDfiles, getAllobjects, getvalidateLinks, readMd, processLink} = require('../src/function.js')
const { markDownLinks } = require('../src/index.js')
const { mocksDataResult } = require('./datamocks.spec')
const  axios  = require('axios');
jest.mock('axios');

describe("pathAbsolute", () => {
  it("deberia ser una funcion", () => {
    expect(typeof pathAbsolute).toBe("function");
  })
})
it("si recibe una ruta absoluta, muestra esa ruta nuevamente", () => {
  expect(pathAbsolute("C:/Users/Usuario/BOG005-md-links/testmd")).toEqual("C:/Users/Usuario/BOG005-md-links/testmd");
})
it("si recibe una ruta relativa, la convierte en absoluta", () => {
  expect(pathAbsolute("testmd")).toEqual("C:\\Users\\Usuario\\BOG005-md-links\\testmd");
})

const getmdFilesData = [
  'C:\\Users\\Usuario\\BOG005-md-links\\testmd\\archivos.md',
  'C:\\Users\\Usuario\\BOG005-md-links\\testmd\\archivosparavver.md',
  'C:\\Users\\Usuario\\BOG005-md-links\\testmd\\pruebarecursividad\\archivos2.md'
];

describe('getMdfiles', () => {
  it('Debería ser una función', () => {
    expect(typeof getMDfiles).toBe('function');
  });
  it('Deberia retornar las rutas incluyendo si hay mas carpetas', () => {
    expect(getMDfiles('testmd')).toEqual(getmdFilesData);
  });
});
const arrayURL = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'C://Users//Usuario//BOG005-md-links//testmd//archivos.md'
  },
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'C://Users//Usuario//BOG005-md-links//testmd//archivos.md'
  }
]

const arrayLinksError = [
  {
    href: 'https://www.pixar.com/error500',
    text: 'Pruebaerror',
    file: 'C://Users//Usuario//BOG005-md-links//testmd//archivos.md',
  },

];

describe('getvalidateLinks', () => {
  it('Debería validar el estado de los links resueltos', (done) => {
    const linksMucks = [
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
      }
    ];
    getvalidateLinks(arrayURL)
      .then((data) => {
        expect(data).toEqual(linksMucks);
        done();
      });
  });
  it('Debería validar el estado de los links rechazados', (done) => {
    axios.get.mockRejectedValueOnce('Please,check the link');

    const linksError = [
      {
        href: 'https://www.pixar.com/error500',
        text: 'Pruebaerror',
        file: 'C://Users//Usuario//BOG005-md-links//testmd//archivos.md',
        status: 'Please,check the link',
        ok: '🚫'
      },
      
    ]
    getvalidateLinks(arrayLinksError)
      .then((data) => {
        expect(data).toEqual(linksError);
        done();
      });
  });

});