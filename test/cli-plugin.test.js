import plugin from '../module/cli-plugin';

const test = require('tape-catch');
const title = require('1-liners/curry')(require('1-liners/plus'))(
  'CLI plugin:  '
);

test(title('Does what it’s supposed to'), (is) => {
  is.equal(
    plugin()({chunks: [
      {output: 'abc'},
      {data: {}},
      {output: null},
      {output: undefined},
      {output: 'def'},
      {output: ' '},
      {output: ['abc']},
      {output: {toString: () => 'def'}},
    ]}).output,
    'abcdef abcdef',
    'even in the wildest of cases'
  );

  is.end();
});
