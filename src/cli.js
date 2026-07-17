const fs = require('node:fs');
const path = require('node:path');
const { compile } = require('./compiler');

const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Usage: npm run compile -- <input.md>');
  process.exitCode = 1;
} else {
  const source = fs.readFileSync(path.resolve(inputPath), 'utf8');
  process.stdout.write(`${compile(source)}\n`);
}
