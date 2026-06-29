const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/Properties/PropertyDetails.jsx');
const content = fs.readFileSync(filePath, 'utf-8');

const lines = content.split('\n');
const newLines = [];

for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith('// ')) {
    newLines.push(lines[i].substring(3));
  } else if (lines[i] === '//' || lines[i] === '//\r') {
    newLines.push('');
  } else {
    newLines.push(lines[i]);
  }
}

fs.writeFileSync(filePath, newLines.join('\n'));
console.log("Uncommented PropertyDetails.jsx");
