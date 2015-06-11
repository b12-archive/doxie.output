import output from '../module/index';

const test = require('tape-catch');
const title = require('1-liners/curry')(require('1-liners/plus'))(
  'Programmatic interface: '
);

test(title('Concatenates chunk output.'), (is) => {
  is.equal(
    output({chunks: [
      {output: 'abcdef'},
    ]}).output,
    'abcdef',
    'in the simplest of cases'
  );

  is.equal(
    output({chunks: [
      {output: 'abc'},
      {output: 'def'},
    ]}).output,
    'abcdef',
    'in the most obvious scenario'
  );

  is.equal(
    output({chunks: [
      {output: 'abc'},
      {data: {}},
      {output: null},
      {output: undefined},
      {output: 'def'},
    ]}).output,
    'abcdef',
    'ignoring chunks with non-defined, undefined and null output'
  );

  is.equal(
    output({chunks: [
      {output: true},
      {output: ['abc']},
      {output: {toString: () => 'def'}},
    ]}).output,
    'trueabcdef',
    'casting other types to string'
  );

  is.end();
});
