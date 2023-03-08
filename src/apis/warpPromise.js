const wrapPromise = (promiseFn) => (...args) => {
  const promise = promiseFn(...args).then(
    (result) => {
      promise.status = 'fulfilled';
      promise.value = result;
    },
    (reason) => {
      promise.status = 'rejected';
      promise.reason = reason;
    },
  );

  return () => {
    if (promise.status === 'fulfilled') {
      return promise.value;
    } if (promise.status === 'rejected') {
      throw promise.reason;
    } else if (promise.status === 'pending') {
      throw promise;
    } else {
      promise.status = 'pending';
      throw promise;
    }
  };
};

export default wrapPromise;
