import { isBetween, omit, padEnd, uniq } from '../../../src/util/helper';

describe('Helper', () => {
  it('isBetween()', () => {
    expect(isBetween(3, 4, 6)).toBe(false);
    expect(isBetween(3, 2, 6)).toBe(true);
  });

  it('padEnd', () => {
    expect(padEnd('skr', 5, '~')).toBe('skr~~');
    expect(padEnd([1, 2, 3], 5, 4)).toEqual([1, 2, 3, 4, 4]);
    expect(padEnd([1, 2, 3], 3, 3)).toEqual([1, 2, 3]);
  });

  it('omit', () => {
    expect(omit({}, [])).toEqual({});
    expect(omit({ a: 1, b: 2 }, ['a'])).toEqual({ b: 2 });
    expect(omit({ a: 1, b: 2 }, ['a', 'c'])).toEqual({ b: 2 });
    expect(omit({ a: 1, b: 2 }, ['a', 'b', 'c'])).toEqual({});

    // 保持引用
    const obj = { a: 1, b: 2 };
    expect(omit(obj, ['a', 'b'])).toEqual({});
    expect(obj).toEqual({});
  });

  it('uniq', () => {
    expect(uniq([1, 2, 3, 4, 5, 5, 1])).toEqual([1, 2, 3, 4, 5]);
    expect(uniq(['a', 'b', 'c', 'a'])).toEqual(['a', 'b', 'c']);

    const a = { a: 1 };
    const b = { b: 1 };

    expect(uniq([a, b, a])).toEqual([a, b]);
  });
});
