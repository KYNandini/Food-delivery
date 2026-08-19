const fs = require('fs');
const content = fs.readFileSync('../main.js', 'utf8');
const match = content.match(/const data = (\{[\s\S]*?\});\s*\/\/\s*State/);
if (match) {
  fs.writeFileSync('data.js', 'module.exports = ' + match[1] + ';');
  console.log('Extracted to data.js');
} else {
  console.log('Failed to match');
}
