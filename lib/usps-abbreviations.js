var data = require('./abbreviations.json');
var ucwords = require('ucwords');

var END_PUNCTUATION_REGEX = /([.,\/#!$%\^&\*;:{}=\-_`~()\]\[])+$/g;
var BEGIN_PUNCTUATION_REGEX = /^([.,\/#!$%\^&\*;:{}=\-_`~()\]\[])+/g;

function transformText(text, options) {
  options = Object.assign({
    skipMiddleEndingPeriod: true,
    skipFinalEndingPeriod: false,
    shiftInputCase: true,
    shiftOutputCase: true,
    stripPunctuation: false
  }, options || {});

  var result = [];
  var words = text.trim().split(' ');

  words.forEach(function(word, i){
    var endMatches = word.match(END_PUNCTUATION_REGEX);
    var beginMatches = word.match(BEGIN_PUNCTUATION_REGEX);

    var appendPunctuation = endMatches ? endMatches[0] : '';
    var prependPunctuation = beginMatches ? beginMatches[0] : '';

    if(appendPunctuation === '.') {
      if(options.skipMiddleEndingPeriod && i < words.length - 1) {
        return result.push(word);
      }
      if(options.skipFinalEndingPeriod && i === words.length - 1) {
        return result.push(word);
      }
    }

    if(options.skipEndingPeriod && appendPunctuation === '.' && i < words.length - 1) {
      return result.push(word);
    }

    var part = word.replace(END_PUNCTUATION_REGEX, '');
    part = part.replace(BEGIN_PUNCTUATION_REGEX, '');

    if(options.shiftInputCase) {
      part = part.toUpperCase();
    }

    if(data.hasOwnProperty(part)) {
      part = data[part];
    }

    if(options.shiftOutputCase) {
      part = ucwords(part.toLowerCase());
    }

    if(!options.stripPunctuation) {
      part = prependPunctuation + part + appendPunctuation;
    }

    result.push(part);
  });

  return result.join(' ');
}

exports.transformText = transformText;