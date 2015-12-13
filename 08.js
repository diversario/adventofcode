'use strict'

var fs = require('fs')

var input = fs.readFileSync('./08_input.txt')

const NEW_LINE = 10

var chars_code = 0

for (let i = 0; i < input.length; i++) {
  let c = input[i]

  if (c != NEW_LINE) {
    chars_code++
  }
}

var to_char = String.fromCharCode

function get_char(input) {
  if (!input.length) {
    return null
  }

  let char = to_char(input[0])

  if (char == '\\') {
    let esc_char = to_char(input[1])
    char += esc_char

    if (esc_char === 'x') {
      char += to_char(input[2])
      char += to_char(input[3])
    }
  }

  return char
}

var c
var chars_mem = 0

while ((c = get_char(input)) !== null) {
  if (c !== '\n' && c !== '"') {
    chars_mem++
  }

  input = input.slice(c.length)
}

console.log(`Code characters: ${chars_code}. Memory characters: ${chars_mem}. Diff: ${chars_code - chars_mem}.`)