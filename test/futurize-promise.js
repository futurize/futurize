import expect from 'expect';
import Promise from 'pinkie-promise';
import Task from 'data.task';
import { futurizeP } from '../src';


const future = futurizeP(Task);


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
    const futurized = future(time);
    const task = futurized('test');

    task.fork(_, eventuallyEqual('test', done));
  });

  it('should create a future from a promise and reject', done => {
    const futurized = future(erroring);
    const task = futurized('test');

    task.fork(eventuallyEqual('test', done), _);
  });
});
