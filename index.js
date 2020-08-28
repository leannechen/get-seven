function g(N) {
  // N = 46290
  // Find the number's digits
  // ex. 5位數

  // Transform N to integer if it's float number
  if(N % 1 !== 0) {
    N = Math.trunc(N);
  }
    // Transform N to number array, 46290 -> [4,6,2,9,0]
  var numberArrayFromN =  Array.from(String(N), Number);

  function getCountBelow100(num) {
    // Count how many numbers are with 7 in unit digits. Ex. 17, 27, 37...
    var quotient = Math.floor(num / 10); // 2
    var remainder = num % 10; // 5
    var sevenCountInUnit = (remainder >= 7)? 1: 0; // 0 or 1, 0 in this case
    var countOfSevenAsUnitNumber = quotient + sevenCountInUnit;

    // Count how many numbers are with 7 in tens digits. Ex. 70, 71, 72...
    var countOfSevenAsTenthNumberIn70s = 0; // 70~79, exclude 77
    if(num < 70) {
      return countOfSevenAsUnitNumber;
    }
    if(70 <= num && num < 77) {
      countOfSevenAsTenthNumberIn70s = num - 70 + 1;
    } else if(77 <= num && num < 80) {
      countOfSevenAsTenthNumberIn70s = num - 70;
    } else if(num >=80) {
      countOfSevenAsTenthNumberIn70s = 79 - 70; // doesn't add 1 because 77 is excluded
    }
    return countOfSevenAsUnitNumber + countOfSevenAsTenthNumberIn70s;
  }

  function getCountAbove100 (num) {
    var result = 0;
    // 3位數以上
    // [4,6,2]
    // 1, 2,
    for(var i = 0; i < (numberArrayFromN.length - 2); i++) {
      // count g(10000)*4
      // i=0, 10^4; i=1, 10^3, i=2,10^2
      // ex. 10000 (10^4)
      var tenthsOfTheDigit = Math.pow(10, numberArrayFromN.length - 1 - i);
      // 計算 10000 中，有7的數字有幾個 =  (all - numbers without 7)
      // 10000 - 9^4 = 10^4 - 9^4
      var countOfTheTenths = tenthsOfTheDigit - Math.pow(9, numberArrayFromN.length - 1 - i);
      // ex. "4"
      var valueOfTheDigit = numberArrayFromN[i];

      result = result + countOfTheTenths * valueOfTheDigit;
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
