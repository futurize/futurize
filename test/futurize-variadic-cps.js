import expect from 'expect';
import Task from 'data.task';
import { futurizeV } from '../src';


const future = futurizeV(Task);

const _ = () => expect(true).toNotBe(false);
const eventuallyEqual = (expected, done) => res => {
  expect(res).toEqual(expected);
  done();
};

describe('#futurize-variadic-cps', () => {

  function time (a, b, cb) {
    setTimeout(() => cb(null, a, b), 100);
  }

  function erroring (a, cb) {
    setTimeout(() => cb(a), 100);
  }

  it('should create a future from a CPS-function and resolve', done => {
    const futurized = future(time);
    const task = futurized('a', 'b');

    task.fork(_, eventuallyEqual(['a', 'b'], done));
  });

  it('should create a future from a CPS-function and reject', done => {
    const futurized = future(erroring);
    const task = futurized('test');

    task.fork(eventuallyEqual('test', done), _);
  });
});
