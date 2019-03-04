import {swapLeft, swapRight} from "./array";

describe('swapping one item to the left', () => {
  it('[1,2,3] for 1 should return [1,2,3]', () => {
    expect(swapLeft([1, 2, 3], 1)).toEqual([1, 2, 3]);
  });

  it('[1,2,3] for 2 should return [2,1,3]', () => {
    expect(swapLeft([1, 2, 3], 2)).toEqual([2, 1, 3]);
  });

  it('[1,2,3] for 3 should return [1,3,2]', () => {
    expect(swapLeft([1, 2, 3], 3)).toEqual([1, 3, 2]);
  });
});

describe('swapping one item to the right', () => {
  it('[1,2,3] for 1 should return [2,1,3]', () => {
    expect(swapRight([1, 2, 3], 1)).toEqual([2, 1, 3]);
  });

  it('[1,2,3] for 2 should return [1,3,2]', () => {
    expect(swapRight([1, 2, 3], 2)).toEqual([1, 3, 2]);
  });

  it('[1,2,3] for 3 should return [1,2,3]', () => {
    expect(swapRight([1, 2, 3], 3)).toEqual([1, 2, 3]);
  });
});

it('swapping right in a big array for 5', () => {
  const initiall = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const expected = [1, 2, 3, 4, 6, 5, 7, 8, 9, 10, 11, 12, 13];
  expect(swapRight(initiall, 5)).toEqual(expected);
});


it('swapping right in a big array for 5', () => {
  const initiall = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const expected = [1, 2, 3, 5, 4, 6, 7, 8, 9, 10, 11, 12, 13];
  expect(swapLeft(initiall, 5)).toEqual(expected);
});
