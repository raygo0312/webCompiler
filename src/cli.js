const path = require('node:path');
const { compileProject } = require('./project-compiler');

const args = process.argv.slice(2);
const projectPath = args.find((argument) => !argument.startsWith('--')) || '.';
const outputFlag = args.indexOf('--out-dir');
const outputPath = outputFlag >= 0 ? args[outputFlag + 1] : 'dist';

if (outputFlag >= 0 && !outputPath) {
  console.error('Usage: npm run compile -- [project-dir] [--out-dir <directory>]');
  process.exitCode = 1;
} else {
  const result = compileProject(path.resolve(projectPath), outputPath);
  console.log(`Compiled ${result.files.length} .mdr file(s) to ${result.outputRoot}`);
  result.files.forEach((file) => console.log(`  ${file}`));
}
