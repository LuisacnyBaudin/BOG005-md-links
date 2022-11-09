const { pathAbsolute, getMDfiles, getAllobjects, getvalidateLinks, readMd, processLink} = require('../src/function.js')
const { markDownLinks } = require('../src/index.js')
const  axios  = require('axios');
jest.mock('axios');

describe("pathAbsolute", () => {
  it("should be a function", () => {
    expect(typeof pathAbsolute).toBe("function");
  })
})
it("if it receives an absolute path, it displays that path again", () => {
  expect(pathAbsolute("C:/Users/Usuario/BOG005-md-links/testmd")).toEqual("C:/Users/Usuario/BOG005-md-links/testmd");
})
it("if it receives a relative path, it converts it to absolute", () => {
  expect(pathAbsolute("testmd")).toEqual("C:\\Users\\Usuario\\BOG005-md-links\\testmd");
})

const getmdFilesData = [
  'C:\\Users\\Usuario\\BOG005-md-links\\testmd\\archivos.md',
  'C:\\Users\\Usuario\\BOG005-md-links\\testmd\\archivosparavver.md',
  'C:\\Users\\Usuario\\BOG005-md-links\\testmd\\pruebarecursividad\\archivos2.md'
];

describe('getMdfiles', () => {
  it('should be a function', () => {
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

const arrayFalse=
  [
    
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'C\\Users\\Usuario\\BOG005-md-links\\testmd\\archivos.md'
    },

  ]
  
  const arrayTrue=[
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'C:\\Users\\Usuario\\BOG005-md-links\\testmd\\archivos.md',
      status: 200,
      ok: '✅'
    },
  
    
  ]
describe('markDownLinks', () => {
  it('should be a function', () => {
    expect(typeof markDownLinks).toBe('function');
  });

  it('It should return the message: E    R     R    O     R.    please check again!!', (done)=>{
    const resolveData = markDownLinks(' ');
    resolveData.then((res)=> expect(res).toStrictEqual('E    R     R    O     R.    please check again!!')).catch((rej)=>rej);
    done();
  });


  it('Debería retornar en un array de objetos con href, text y file', (done) => {
    const resolveDataFalse = markDownLinks(('testmd'));
    resolveDataFalse.then((res) => expect(res).toEqual(arrayFalse));
    done();
  });

  it('Debería retornar en un array de objetos con href, text, file, status y ok', (done) => {
    const resolveDataTrue = markDownLinks(('testmd'), { validate: true });
    resolveDataTrue.then((res) => expect(res).toEqual(arrayTrue));
    done();
  });
  
});