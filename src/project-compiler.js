const fs = require('node:fs');
const path = require('node:path');
const { compile } = require('./compiler');

const IGNORED_DIRECTORIES = new Set(['.git', 'node_modules', 'dist']);

function findMdrFiles(directory, root = directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && !IGNORED_DIRECTORIES.has(entry.name)) {
      files.push(...findMdrFiles(path.join(directory, entry.name), root));
    } else if (entry.isFile() && entry.name.endsWith('.mdr')) {
      files.push(path.relative(root, path.join(directory, entry.name)));
    }
  }
  return files.sort();
}

function compileProject(projectDirectory, outputDirectory = 'dist') {
  const root = path.resolve(projectDirectory);
  const outputRoot = path.resolve(root, outputDirectory);
  const inputFiles = findMdrFiles(root);
  const outputFiles = [];

  for (const relativeInput of inputFiles) {
    const relativeOutput = relativeInput.replace(/\.mdr$/, '.html');
    const outputPath = path.join(outputRoot, relativeOutput);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    const source = fs.readFileSync(path.join(root, relativeInput), 'utf8');
    fs.writeFileSync(outputPath, `${compile(source)}\n`);
    outputFiles.push(relativeOutput);
  }

  return { root, outputRoot, files: outputFiles };
}

module.exports = { compileProject, findMdrFiles };
