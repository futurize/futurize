import expect from 'expect';
import Task from 'data.task';
import { futurize } from '../src';


const future = futurize(Task);

const _ = () => expect(true).toNotBe(false);
const eventuallyEqual = (expected, done) => res => {
  expect(res).toEqual(expected);
  done();
};

describe('#futurize-cps', () => {

  function time (text, cb) {
    setTimeout(() => cb(null, text), 100);
  }

  function erroring (text, cb) {
    setTimeout(() => cb(text), 100);
  }

  it('should create a future from a CPS-function and resolve', done => {
    const futurized = future(time);
    const task = futurized('test');

    task.fork(_, eventuallyEqual('test', done));
  });

  it('should create a future from a CPS-function and reject', done => {
    const futurized = future(erroring);
    const task = futurized('test');

    task.fork(eventuallyEqual('test', done), _);
  });
});
