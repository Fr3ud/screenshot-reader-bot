const Tesseract = require('tesseract.js');

let result = 'Something went wrong...'

function recognize() {

  return Tesseract.recognize(link, lang, {
      logger: data => console.log(data),
    })
   .then(({ data: {text }}) => {
      return text;
   })
}

function setResult(text) {
  text = text.replace(/\n\s*\n/g, '\n');
  result = text;
}