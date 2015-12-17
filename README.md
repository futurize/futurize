futurize
========

[![build status](https://img.shields.io/travis/stoeffel/futurize/master.svg?style=flat-square)](https://travis-ci.org/stoeffel/futurize)
[![npm version](https://img.shields.io/npm/v/futurize.svg?style=flat-square)](https://www.npmjs.com/package/futurize)

> Turn callback-style functions or promises into futures

Example
-------

### Futurize a callback-style function

```js
import { futurize } from 'futurize';
import { readFile } from 'fs'

const read = futurize(readFile);

function decode(buffer) {
  return buffer.map(a => a.toString('utf-8'));
}

const readme = decode(read('README.md'));
const license = decode(read('LICENSE.md'));

const concatenated = readme.chain(a => license.map(b => a + b));

concatenated.fork(
  error => console.error(error)
, data => console.log(data)
);
```

### Futurize a promise

```js
import { futurizeP } from 'futurize';
import myPromisedFunction from 'a-module';

const myFuturizedFunction = futurizeP(myPromisedFunction);
```



## License

MIT © [stoeffel](https://stoeffel.github.io)
