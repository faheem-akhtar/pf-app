import { numberFormat } from 'helpers/number/format';

describe('numberFormat', () => {
  it('should return a number formatted to a rounded value separated by commas or another spacer', () => {
    expect(numberFormat(1000)).toEqual('1,000');
  });

  it('should return a number formatted to a rounded value separated by custom spacer', () => {
    expect(numberFormat(1000, '-')).toEqual('1-000');
  });
});
