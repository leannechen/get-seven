const g = require('./index');

/*
* 0
7
10
359
1176
6297
3439
-15
31.6


6297
46290
*/

// Basic test
test('Inputting 0 get 0', () => {
  expect(g(0)).toBe(0);
});

test('Inputting 7 get 1', () => {
  expect(g(7)).toBe(1);
})

test('Inputting 20 get 1', () => {
  expect(g(20)).toBe(2);
})

test('Inputting 70 get 8', () => {
  expect(g(100)).toBe(19);
})

test('Inputting 70.5 get 8', () => {
  expect(g(70.5)).toBe(8);
})

test('Inputting 100 get 19', () => {
  expect(g(100)).toBe(19);
})

test('Inputting 1000 get 271', () => {
  expect(g(1000)).toBe(271);
})

test('Numbers above 100 could be composited, example: 6200', () => {
  const g100 = g(100);
  const g1000 = g(1000);
  expect(g(6200)).toBe(g1000 * 6 + g100 * 2);
})

test('Numbers above 100 could be composited, example: 25300', () => {
  const g100 = g(100);
  const g1000 = g(1000);
  const g10000 = g(10000);
  expect(g(25300)).toBe(g10000 * 2 + g1000 * 5 + g100 * 3);
})

test('Inputting 6297 get 1683', () => {
  expect(g(6297)).toBe(1683);
})

test('Inputting 46290 get ', () => {
  expect(g(46290)).toBe(15438);
})
