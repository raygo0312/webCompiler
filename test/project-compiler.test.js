const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { compileProject, findMdrFiles } = require('../src/project-compiler');

test('compiles a project tree and preserves .mdr relative paths', () => {
  const project = fs.mkdtempSync(path.join(os.tmpdir(), 'mdr-project-'));
  fs.mkdirSync(path.join(project, 'pages', 'nested'), { recursive: true });
  fs.mkdirSync(path.join(project, 'node_modules', 'ignored'), { recursive: true });
  fs.writeFileSync(path.join(project, 'index.mdr'), '# Home');
  fs.writeFileSync(path.join(project, 'pages', 'about.mdr'), 'About');
  fs.writeFileSync(path.join(project, 'pages', 'nested', 'team.mdr'), '+ One');
  fs.writeFileSync(path.join(project, 'node_modules', 'ignored', 'bad.mdr'), 'Ignored');

  assert.deepEqual(findMdrFiles(project), [
    'index.mdr',
    'pages/about.mdr',
    'pages/nested/team.mdr',
  ]);

  const result = compileProject(project);
  assert.deepEqual(result.files, [
    'index.html',
    'pages/about.html',
    'pages/nested/team.html',
  ]);
  assert.equal(fs.readFileSync(path.join(project, 'dist', 'index.html'), 'utf8'), '<h1>Home</h1>\n');
  assert.equal(fs.readFileSync(path.join(project, 'dist', 'pages', 'nested', 'team.html'), 'utf8'),
    '<ol>\n  <li>One</li>\n</ol>\n');

  fs.rmSync(project, { recursive: true, force: true });
});
