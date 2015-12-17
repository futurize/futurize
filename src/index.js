import Task from 'data.task';


// futurizeP :: CPS -> ( ...args -> Task )
export const futurize = fn => function (...args) {
  return new Task((rej, res) =>
    fn(...args, (err, result) => err? rej(err): res(result))
  );
};


// futurizeP :: Promise -> ( ...args -> Task )
export const futurizeP = fn => function (...args) {
  return new Task((rej, res) =>
    fn(...args).then(res, rej)
  );
};
