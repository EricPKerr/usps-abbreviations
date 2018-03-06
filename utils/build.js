/*
Run in browser console on http://www.gis.co.clay.mn.us/usps.htm
*/

var rows = document.querySelectorAll('table tr');

var output = {};

for(var i = 0; i < rows.length; i++) {
  var row = rows[i];

  var cells = row.querySelectorAll('td');
  if(cells.length != 2) continue;


  var original = cells[0].innerText.trim();
  var abbr = cells[1].innerText.replace('*', '').trim();

  if(original.length == 0 || abbr.length == 0) continue;

  output[abbr] = original;
}

output['N'] = 'NORTH';
output['E'] = 'EAST';
output['S'] = 'SOUTH';
output['W'] = 'WEST';
output['NE'] = 'NORTHEAST';
output['NW'] = 'NORTHWEST';
output['SE'] = 'SOUTHEAST';
output['SW'] = 'SOUTHWEST';

console.log(JSON.stringify(output, null, 2));