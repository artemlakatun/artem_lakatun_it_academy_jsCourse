/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
// function should return sum of two numbers
const sum = (a, b) => {         // passed
  return a + b;
};

/**
 * @param {number} num
 * @return {boolean}
 */
// function should return true if number is even or false is number is not even
const isNumberEven = (num) => {         // passed
  return num % 2 === 0;
};

/**
 * @param {number} num1
 * @param {number} num2
 * @return {string}
 */
// Write logic to compare two numbers and return which number is greater, or they are equal
// If num1 is greater than num2 return string 'num1 is the largest number'
// if num2 is greater than num1 return string 'num2 is the largest number'
// if num1 is equal to num2 return string 'num1 is equal to num2'
const findLargestNumber = (num1, num2) => {         // passed
  if(num1 > num2) {
    return `${num1} is the largest number`;
  } else if (num1 < num2) {
    return (`${num2} is the largest number`);
  } else {
    return (`${num1} is equal to ${num2}`);
  }
};

/**
 * @param {number} side1
 * @param {number} side2
 * @param {number} side3
 * @return {string}
 */
// function should return type of triangle
// if triangle is equilateral return string 'Equilateral triangle'
// if triangle is Scalene return string 'Scalene triangle'
// if triangle is Isosceles return string 'Isosceles triangle'
const findTriangleType = (side1, side2, side3) => {          // passed
  if(side1 === side2 && side1 === side3) {
    return('Equilateral triangle');
  } else if (side1 === side2 && side1 !== side3) {
    return('Isosceles triangle');
  } else {
    return('Scalene triangle');
  }
};

/**
 * @param {number} month
 * @param {number} year
 * @return {string}
 */
// function should return amount of days in month with string 'The Month has X days'
// If wrong month number provided return string 'Invalid Month of value X'
const findDaysInMonth = (month, year) => {          // passed
  if (month < 1 || month > 12) {
    return `Invalid Month of value ${month}`;
  }

  const date = new Date(year, month - 1, 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  if (isNaN(lastDay)) {
    return `Invalid Month of value ${month}`;
  }

  return `The Month has ${lastDay} days`;
}

/**
 * @param {number} num1
 * @param {number} num2
 * @param {string} operation
 * @return {number | string}
 */
// function should return result of operation of num1 and num2 based on operation parameter.
// If operation is invalid return string 'Invalid operation'
const calculateResult = (num1, num2, operation) => {          // passed
  let result;

  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      result = num1 / num2;
      break;
    case 'modulus':
      result = num1 % num2;
      break;
    default:
      return `${operation} is an invalid operation`;
  }

  return result;
}

/**
 * @return {string}
 */
// Create multiply table multiplying all digits from 2 t0 9 on 1 - 10 and write result in string
// Compare your result with string in test
const getMultiplicationTable = () => {          // +- passed
  let table = '';

  for (let digit = 2; digit <= 9; digit++) {


    for (let number = 1; number <= 10; number++) {
      let result = digit * number;
      table += `${digit} * ${number} = ${result}\n`;
    }
    table += '\n';
  }

  return table;
};

module.exports = {
  isNumberEven,
  findLargestNumber,
  findTriangleType,
  findDaysInMonth,
  sum,
  calculateResult,
  getMultiplicationTable,
};
