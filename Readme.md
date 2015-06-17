[![Coveralls – test coverage
](https://img.shields.io/coveralls/studio-b12/doxie.output.svg?style=flat-square)
](https://coveralls.io/r/studio-b12/doxie.output)
 [![Travis – build status
](https://img.shields.io/travis/studio-b12/doxie.output/master.svg?style=flat-square)
](https://travis-ci.org/studio-b12/doxie.output)
 [![David – status of dependencies
](https://img.shields.io/david/studio-b12/doxie.output.svg?style=flat-square)
](https://david-dm.org/studio-b12/doxie.output)
 [![Stability: unstable
](https://img.shields.io/badge/stability-unstable-yellowgreen.svg?style=flat-square)
](https://github.com/studio-b12/doxie.output/issues/2)
 [![Code style: airbnb
](https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square)
](https://github.com/airbnb/javascript)




<h1                                                                 id="/"><pre>
doxie --output
</pre></h1>


A plugin for *[doxie][]*.  
**Output rendered comments.**

[doxie]:  https://github.com/studio-b12/doxie




<p align="center"><a
  title="Graphic by the great Justin Mezzell"
  href="http://justinmezzell.tumblr.com/post/91485763723"
  >
  <br/>
  <br/>
  <img
    src="Readme/Projector.gif"
    width="400"
    height="300"
  />
  <br/>
  <br/>
</a></p>




CLI Usage
---------

`doxie --output` is a plugin for the command-line tool *[doxie][]*. Most plugins are designed for *[dox][]* data. Install all three if you haven’t already:

```sh
$ npm install --global dox doxie doxie.output
```


Pass the option `--output` to *doxie* to put it in the plugin pipeline. Most likely you’ll want it listed last. I’m including [`--drop`][] and [`--render`][] to show this.

```sh
$ dox | doxie --drop @private --render --output

My first function
-----------------

Does awesome things.

###  Parameters:  ###
none.

###  Return value:  ###
* {Number} – the awesomeness factor


My second function
-----------------

<!-- … -->
```


[dox]:         http://npm.im/dox
[`--drop`]:    http://npm.im/doxie.drop
[`--render`]:  http://npm.im/doxie.render




Programmatic usage
------------------

`doxie.output` can be used directly with *[doxie-core][]* – the backend of *[doxie][]*. Install both if you haven’t already:

```sh
$ npm install doxie-core doxie.output
```


Call `doxie.output` without parameters to get the plugin function:

```js
const doxie = require('doxie-core');
const drop = require('doxie.drop');
const render = require('doxie.render');
const output = require('doxie.output');

const myTemplate = ({data}) => /* … */;
const myDoxData = {/* … */};

doxie([
  drop({'@private': true}),
  render(myTemplate),
  output(),
])(myDoxData).output;
//» "\nMy first function\n-----------------\n\nDoes awesome things.\n\n###  Par…
```


[doxie-core]:  http://npm.im/doxie-core




License
-------

[MIT][] © [Studio B12 GmbH][]

[MIT]:              ./License.md
[Studio B12 GmbH]:  http://studio-b12.de
