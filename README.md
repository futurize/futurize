futurize
========

[![build status](https://img.shields.io/travis/futurize/futurize/master.svg?style=flat-square)](https://travis-ci.org/futurize/futurize)
[![npm version](https://img.shields.io/npm/v/futurize.svg?style=flat-square)](https://www.npmjs.com/package/futurize)
[![codecov.io](https://codecov.io/github/futurize/futurize/coverage.svg?branch=master)](https://codecov.io/github/futurize/futurize?branch=master)

> Turn callback-style functions or promises into futures

```diff
-function read(path) {
-  return new Future(function(reject, resolve) {
-    fs.readFile(path, function(error, data) {
-      if (error)  reject(error)
-      else        resolve(data)
-    })
-  })
-}

+const read = futurize(Future)(fs.readFile);
```

Example
-------

### Futurize a callback-style function

```js
import { futurize } from 'futurize';
import { Future } from 'ramda-fantasy';
// or
import Task from 'data.task';

const future = futurize(Future); // or futurize(Task);

import { readFile } from 'fs'

const read = future(readFile);

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
import { Future } from 'ramda-fantasy';
// or
import Task from 'data.task';
import myPromisedFunction from 'a-module';

const future = futurizeP(Future); // or futurizeP(Task);

const myFuturizedFunction = future(myPromisedFunction);
```


## API

```hs
futurize :: Constructor -> CPS -> ( ...args -> Future )
```

```hs
futurizeP :: Constructor -> Promise -> ( ...args -> Future )
```



## License

MIT © [stoeffel](https://stoeffel.github.io)
