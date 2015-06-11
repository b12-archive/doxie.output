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

  is.equal(
    output({chunks: [
      {},
    ]}).output,
    '',
    'returns an empty string when no chunks produce output'
  );

  is.equal(
    output({chunks: [
    ]}).output,
    '',
    'returns an empty string when there are no chunks'
  );

  is.end();
});

test(title('Doesn’t break other plugins.'), (is) => {
  let chunks = [];

  is.equal(
    output({chunks}).chunks,
    chunks,
    'returning `.chunks` unchanged'
  );

  is.equal(
    output({chunks, version: 1}).version,
    1,
    'passing on the `.version` `1`'
  );

  let incompatibleVersion = Symbol();
  is.equal(
    output({chunks, version: incompatibleVersion}).version,
    incompatibleVersion,
    'passing on an incompatible `.version`'
  );

  is.equal(
    output({chunks}).version,
    undefined,
    'not defining a `.version` when it’s not there initially'
  );

  is.end();
});

test(title('Is helpful when things go wrong.'), (is) => {
  const chunks = [];

  is.ok(
    /unexpected results/i.test(
      output({chunks, version: '1'}).error
    ),
    'printing a helpful message when the version isn’t a number'
  );

  is.ok(
    /unexpected results/i.test(
      output({chunks, version: '1'}).error
    ),
    'printing a helpful message when the version isn’t `1`'
  );

  is.ok(
    /output is empty/i.test(
      output({chunks: [
        {data: {}},
      ]}).error
    ),
    'printing a helpful message when no chunks produce output'
  );

  is.ok(
    /output is empty/i.test(
      output({chunks: [
        {output: null},
        {output: ''},
      ]}).error
    ),
    'printing a helpful message when chunks produce empty output'
  );

  is.end();
});
