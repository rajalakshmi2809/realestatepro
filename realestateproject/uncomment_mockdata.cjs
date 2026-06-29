const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/mockData.js');
const content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');
const newLines = [];

for (let i = 0; i < lines.length; i++) {
  if (i < 51 && lines[i].startsWith('// ')) {
    newLines.push(lines[i].substring(3));
  } else if (i < 51 && lines[i] === '//') {
    newLines.push('');
  } else {
    newLines.push(lines[i]);
  }
}

fs.writeFileSync(filePath, newLines.join('\n'));
console.log("Uncommented properties in mockData.js");
