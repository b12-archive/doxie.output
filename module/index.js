const fold = require('1-liners/fold');
const assign = require('object-assign');
const {freeze} = Object;

const warning = (warning) => `[doxie --output] Warning: ${warning}\n`;

export default (input) => {
  // Determine the output.
  const output = fold((output, chunk) => (
    chunk.output == null ?
    output :
    output + chunk.output
  ), '', input.chunks);

  // Construct the error string:
  const errorMessages = [];

  // * Check the output
  if (!output) errorMessages.push(warning(
    'Output is empty. Perhaps you’ve forgotten to render your comments? ' +
    '<http://npm.im/doxie.render> might put you on the right track.'
  ));

  // * Check the version
  const {version} = input;
  if (typeof version !== 'number') errorMessages.push(warning(
    'Unable to determine the version of input data. The results may be ' +
    'unexpected.'
  )); else if (version !== 1) errorMessages.push(warning(
    'Incompatible version of input data. The results may be unexpected.'
  ));

  // Pass data down the pipeline.
  return freeze(assign({}, input, {
    output,
    error: errorMessages.join() || null,
  }));
};
