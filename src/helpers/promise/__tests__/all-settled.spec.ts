import { promiseAllSettled } from '../all-settled';

describe('promiseAllSettled()', () => {
  it('should return multiple promisses', async () => {
    const [promise1, promise2] = await promiseAllSettled([Promise.resolve('promise 1'), Promise.resolve('promise 2')]);

    expect(promise1).toEqual('promise 1');
    expect(promise2).toEqual('promise 2');
  });

  it('should return the error if promise failed', async () => {
    const [promise1, promise2] = await promiseAllSettled([
      Promise.resolve('promise 1'),
      Promise.reject('error message'),
    ]);

    expect(promise1).toEqual('promise 1');
    expect(promise2).toEqual({
      ok: false,
      error: {
        body: 'error message',
      },
    });
  });
});
