'use strict'

var input = 'bgvyzdsv'
var crypto = require('crypto')

var num = 0
  , hash = ''

function has_leading_zeroes (str) {
  return /^000000/.test(str)
}

while (!has_leading_zeroes(hash)) {
  num++
  hash = crypto.createHash('md5').update(`${input}${num}`).digest('hex')
}

console.log('Lowest number is %d', num)