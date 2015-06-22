import output from '../module/index';

const test = require('tape-catch');
const symbol = require('es6-symbol');

const title = require('1-liners/curry')(require('1-liners/plus'))(
  'Programmatic interface: '
);

test(title('Concatenates doc output.'), (is) => {
  is.equal(
    output({docs: [
      {output: 'abcdef'},
    ]}).output,
    'abcdef',
    'in the simplest of cases'
  );

  is.equal(
    output({docs: [
      {output: 'abc'},
      {output: 'def'},
    ]}).output,
    'abcdef',
    'in the most obvious scenario'
  );

  is.equal(
    output({docs: [
      {output: 'abc'},
      {data: {}},
      {output: null},
      {output: undefined},
      {output: 'def'},
    ]}).output,
    'abcdef',
    'ignoring docs with non-defined, undefined and null output'
  );

  is.equal(
    output({docs: [
      {output: true},
      {output: ['abc']},
      {output: {toString: () => 'def'}},
    ]}).output,
    'trueabcdef',
    'casting other types to string'
  );

  is.equal(
    output({docs: [
      {},
    ]}).output,
    '',
    'returns an empty string when no docs produce output'
  );

  is.equal(
    output({docs: [
    ]}).output,
    '',
    'returns an empty string when there are no docs'
  );

  is.end();
});

test(title('Doesn’t break other plugins.'), (is) => {
  let docs = [];

  is.equal(
    output({docs}).docs,
    docs,
    'returning `.docs` unchanged'
  );

  is.equal(
    output({docs, version: 1}).version,
    1,
    'passing on the `.version` `1`'
  );

  let incompatibleVersion = symbol();
  is.equal(
    output({docs, version: incompatibleVersion}).version,
    incompatibleVersion,
    'passing on an incompatible `.version`'
  );

  is.equal(
    output({docs}).version,
    undefined,
    'not defining a `.version` when it’s not there initially'
  );

  is.end();
});

test(title('Prints helpful messages things go wrong.'), (is) => {
  const docs = [];

  is.ok(
    /results .*unexpected/i.test(
      output({docs, version: '1'}).error
    ),
    'when the version isn’t a number'
  );

  is.ok(
    /results .*unexpected/i.test(
      output({docs, version: 2}).error
    ),
    'when the version isn’t `1`'
  );

  is.ok(
    /output .*empty/i.test(
      output({docs: [
        {data: {}},
      ]}).error
    ),
    'when no docs produce output'
  );

  is.ok(
    /output .*empty/i.test(
      output({docs: [
        {output: null},
        {output: ''},
      ]}).error
    ),
    'when docs produce empty output'
  );

  is.equal(
    output({
      docs: [{output: 'ok'}],
      version: 1,
    }).error,
    null,
    'returning a `null` error otherwise'
  );

  is.end();
});
