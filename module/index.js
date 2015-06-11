const fold = require('1-liners/fold');

export default (input) => ({
  output: fold((output, chunk) => (
    chunk.output == null ?
    output :
    output + chunk.output
  ), '', input.chunks),

  version: input.version,
  chunks: input.chunks,
});
