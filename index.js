function g(N) {
  var result = 0;
  // N = 46290
  // Find the number's digits
  // ex. 5
  var digitCount = N.toString().length;

  // count g(100) 以下的數 ex. g(97)
  if(digitCount <= 2) {
    // count g(N) and return
    return result;
  }

  function countAbove100 (num) {
    var count = 0;
    // 3位數以上
    // [4,6,2,9,0]
    var NtoArray =  Array.from(String(N), Number);
    // [4,6,2]
    // 1, 2,
    for(var i = 0; i < (NtoArray.length - 2); i++) {
      // count g(10000)*4
      // i=0, 10^4; i=1, 10^3, i=2,10^2
      // ex. 10000
      var unitTenthsOfTheDigit = Math.pow(10, NtoArray.length - 1 - i); // ex. 10000 = 10^4
      // 計算 10000 中，有7的數字有幾個 =  (all - numbers without 7)
      var countOfTheDigitTenths = unitTenthsOfTheDigit - Math.pow(9, NtoArray.length - 1 - i); // 10000 - 9^4, 1000 - 9^3
      // ex. "4"
      var valueOfTheDigit = NtoArray[i];

      count = result + countOfTheDigitTenths * valueOfTheDigit;
    }

    return count;
  }

  function countBelow100(num) {
    var quotient = Math.floor(num / 10); // 2
    var remainder = num % 10; // 5
    var sevenCountInUnit = (remainder >= 7)? 1: 0; // 0 or 1, 0 in this case
    var countOfSevenAsUnitNumber = quotient + sevenCountInUnit;
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

  var countAboveOneHundred = countAbove100(N);
  var countBelowOneHundred = countBelow100(N % 100);


  result = countAboveOneHundred + countBelowOneHundred;

  return result;
}

console.log(g(46290))
