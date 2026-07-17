const { TokenType, lex } = require('./lexer');
const { parse } = require('./parser');
const { compile, escapeHtml, render } = require('./compiler');

module.exports = { TokenType, lex, parse, compile, escapeHtml, render };
