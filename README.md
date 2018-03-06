# USPS Abbreviations

Simple utility to transform USPS abbreviations to their full form.

Abbreviations from [http://www.gis.co.clay.mn.us/usps.htm](http://www.gis.co.clay.mn.us/usps.htm)

### Usage

```
var USPS = require('usps-abbreviations');

var transformed = USPS.transformText("123 N Main St, Chicago, IL 60610");
// 123 North Main Street, Chicago, Illinois 60610
```

### Options

```
USPS.transformText(text, {
  // Shift the input case to upper to match abbreviations (recommended)
  shiftInputCase: true,

  // Shift the output result to capitalized words
  shiftOutputCase: true,

  // Remove all punctuation from output
  stripPunctuation: false
})
```