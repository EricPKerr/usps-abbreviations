var data = require('./abbreviations.json');
var ucwords = require('ucwords');

var END_PUNCTUATION_REGEX = /([.,\/#!$%\^&\*;:{}=\-_`~()\]\[])+$/g;

function transformText(text, options) {
  options = Object.assign({
    shiftInputCase: true,
    shiftOutputCase: true,
    stripPunctuation: false
  }, options || {});

  if(options.shiftInputCase) {
    text = text.toUpperCase();
  }

  var result = [];
  var words = text.trim().split(' ');

  words.forEach(function(word){
    var matches = word.match(END_PUNCTUATION_REGEX);
    var appendPunctuation = matches ? matches[1] : '';

    var part = word.replace(END_PUNCTUATION_REGEX, '');

    if(data.hasOwnProperty(part)) {
      part = data[part];
    }

    if(!options.stripPunctuation) {
      part += appendPunctuation;
    }

    if(options.shiftOutputCase) {
      part = ucwords(part.toLowerCase());
    }

    result.push(part);
  });

  return result.join(' ');
}

exports.transformText = transformText;