/**
 * Get the count of numbers that contain at least a 7 (e.g. 17, 275, 77)
 * when you write out all the numbers from 1 to N
 * @param N
 * @returns {number} count of numbers that contain a 7
 */
function g(N) {
  // N = 46290
  // Find the number's digits
  // ex. 5位數

  // Transform N to integer if it's float number
  if(N % 1 !== 0) {
    N = Math.trunc(N);
  }
  // Get its absolute value if it's a negative number
  if(N < 0) {
    N = Math.abs(N);
  }

  // Transform N to number array, e.g. 46290 -> [4,6,2,9,0]
  var numberArrayFromN =  Array.from(String(N), Number);

  /**
   * Get count of numbers that contain at least a 7 below 100 (not including 100)
   * @param num
   * @returns {number}
   */
  function getCountBelow100(num) {

    // 1. Count how many numbers are with 7 in unit digits. Ex. 17, 27, 37...
    // Get tens digit, e.g. 9 for 97.
    var tensDigit = Math.floor(num / 10);
    // Get ones digit, e.g. 7 for 97.
    var onesDigit = num % 10;
    // Know whether ones contains a 7, and count with it
    var sevenCountInUnit = (onesDigit >= 7)? 1: 0;
    var countOfSevenAsUnitDigit = tensDigit + sevenCountInUnit;

    // 2. Count how many numbers are with 7 in tens digits. Ex. 70, 71, 72...
    // * Excluding 77 because it's already counted in `sevenCountInUnit`
    var countOfSevenAsTensDigitIn70s = 0;
    if(num < 70) {
      return countOfSevenAsUnitDigit;
    }
    if(70 <= num && num < 77) {
      countOfSevenAsTensDigitIn70s = num - 70 + 1;
    } else if(77 <= num && num < 80) {
      countOfSevenAsTensDigitIn70s = num - 70;
    } else if(num >=80) {
      countOfSevenAsTensDigitIn70s = 79 - 70; // doesn't add 1 because 77 is excluded
    }
    return countOfSevenAsUnitDigit + countOfSevenAsTensDigitIn70s;
  }

  /**
   * Get count of numbers that contain at least a 7 above 100 (including 100)
   * @param num
   * @returns {number}
   */
  function getCountAbove100 (num) {
    var result = 0;
    var numberArray = Array.from(String(num), Number);
    // Iterating through [4,6,2] if N is 46297
    for(var i = 0; i < (numberArray.length - 2); i++) {
      // count g(10000)*4
      // i=0, 10^4; i=1, 10^3, i=2,10^2
      // ex. 10000 (10^4)
      var tensOfTheDigit = Math.pow(10, numberArray.length - 1 - i);
      // 計算 10000 中，有7的數字有幾個 =  (all - numbers without 7)
      // 10000 - 9^4 = 10^4 - 9^4
      var countOfTheTens = tensOfTheDigit - Math.pow(9, numberArray.length - 1 - i);
      // ex. "4"
      var valueOfTheDigit = numberArray[i];

      result = result + countOfTheTens * valueOfTheDigit;
    }

    return result;
  }

  // count g(100) 以下的數 ex. g(97)
  if(numberArrayFromN.length <= 2) {
    // count g(N) and return
    return getCountBelow100(N);
  }

  var countAbove100 = getCountAbove100(N);
  var countBelow100 = getCountBelow100(N % 100);

  return countAbove100 + countBelow100;

}

// console.log(g(46290));

module.exports = g;
