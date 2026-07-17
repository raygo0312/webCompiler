const { TokenType, lex } = require('./lexer');
const { parse } = require('./parser');

module.exports = { TokenType, lex, parse };
