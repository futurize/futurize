import expect from 'expect';
import Promise from 'pinkie-promise';

import { futurizeP } from '../src';

const _ = () => expect(true).toNotBe(false);
const eventuallyEqual = (expected, done) => res => {
  expect(res).toEqual(expected);
  done();
};

describe('#futurize-promise', () => {

  function time (text, cb) {
    return new Promise((res, rej) => 
      setTimeout(() => res(text), 100)
    );
  }

  function erroring (text, cb) {
    return new Promise((res, rej) => 
      setTimeout(() => rej(text), 100)
    );
  }

  it('should create a future from a promise and resolve', done => {
    const futurized = futurizeP(time);
    const task = futurized('test');

    task.fork(_, eventuallyEqual('test', done));
  });

  it('should create a future from a promise and reject', done => {
    const futurized = futurizeP(erroring);
    const task = futurized('test');

    task.fork(eventuallyEqual('test', done), _);
  });
});
