

// futurize :: Constructor -> CPS -> ( ...args -> Future )
export const futurize = Future => fn => function (...args) {
  return new Future((rej, res) =>
    fn(...args, (err, result) => err? rej(err): res(result))
  );
};


// futurizeP :: Constructor -> Promise -> ( ...args -> Future )
export const futurizeP = Future => fn => function (...args) {
  return new Future((rej, res) =>
    fn(...args).then(res, rej)
  );
};
