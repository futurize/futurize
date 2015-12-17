import { readFile } from 'fs'
import { futurize } from './';

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
