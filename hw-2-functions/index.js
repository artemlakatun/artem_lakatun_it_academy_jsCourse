/**
 * @param {number} a
 * @param {number} b
 * @param {function} callback
 * @return {number | string}
 */
const checkNumbersAndExecuteOperation = (a, b, callback) => {
  if(typeof a === 'string' || typeof b === 'string') {
    return 'Error with numbers. Operation impossible';
  }
  return callback(a, b);
};

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
// function should return sum of two numbers
const sum = (a, b) => {
  return a + b;
};

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
// function should return result of subtraction of two numbers
const subtract = (a, b) => {
  return a - b;
};

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
// function should return result of multiplication of two numbers
const multiply = (a, b) => {
  return a * b;
};

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
// function should return result of division of two numbers
const divide = (a, b) => {
  return a / b;
};

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
// function should return result of modulus of two numbers
const getModulus = (a, b) => {
  return a % b;
};

/**
 * @param {string} messageType
 * @return {function(*): string }
 */
// Create function that returns another function which receives messages param and returns combination of messageType with message
const formatLogger = (messageType) => {

  return function (message) {
    return `${messageType}: ${message}`;
  }
};

/**
 * @param {number} num1
 * @param {number} num2
 * @param {function} callback1
 * @param {function} callback2
 * @return {number | string}
 */
// Create function that receives two numbers, and two callbacks
  // It should check if two numbers are real numbers and return result of the second callback. In case it's not a numbers - it should return error message with firstCallback// Create function that receives two numbers, and two callbacks
  // It should check if two numbers are real numbers and return result of the second callback. In case it's not a numbers - it should return error message with firstCallback
const calculateResult = (num1, num2, callback1, callback2) => {
  return callback1(num1, num2, callback2);
};

module.exports = {
  checkNumbersAndExecuteOperation,
  sum,
  subtract,
  multiply,
  divide,
  getModulus,
  calculateResult,
  formatLogger,
};
