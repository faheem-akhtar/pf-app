/* eslint-disable @typescript-eslint/no-explicit-any */

import { objectCompare } from 'helpers/object/compare';

describe('objectCompare', () => {
  it('should return true for same objects', () => {
    expect(objectCompare({ a: 1, b: '2' }, { a: 1, b: '2' })).toBeTruthy();
  });

  it('should return false for save objects with different type', () => {
    expect(objectCompare({ a: 1, b: '2' }, { a: 1, b: 2 })).toBeFalsy();
  });

  it('should return true for nested same objects', () => {
    expect(objectCompare({ a: 1, b: { ba: 11, bb: 'bb' } }, { a: 1, b: { ba: 11, bb: 'bb' } })).toBeTruthy();
  });

  it('should return false for nested different objects', () => {
    expect(objectCompare({ a: 1, b: { ba: 11, bb: 'bb' } }, { a: 1, b: { ba: 11 } })).toBeFalsy();
  });

  it('should return true for same objects sorted in different order', () => {
    expect(objectCompare({ a: 1, b: '2' }, { b: '2', a: 1 })).toBeTruthy();
  });

  it('should handle non object values', () => {
    expect(objectCompare(10 as any, 10)).toBeTruthy();
    expect(objectCompare(10 as any, 11)).toBeFalsy();

    expect(objectCompare('10' as any, '10')).toBeTruthy();
    expect(objectCompare('10' as any, '11')).toBeFalsy();
  });

  it('should handle the case for an array item', () => {
    expect(objectCompare({ a: 1, b: ['1', '2'] }, { a: 1, b: ['2', '1'] })).toBeTruthy();

    expect(objectCompare({ a: 1, b: [1, 2] }, { a: 1, b: [2, 1] })).toBeTruthy();

    expect(objectCompare({ a: 1, b: ['1', '2'] }, { a: 1, b: ['1', '3'] })).toBeFalsy();
  });
});
