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
var e = ''
var encoded = []

var input_view = input.slice(0)

while ((c = get_char(input_view)) !== null) {
  if (c !== '\n' && c !== '"') {
    chars_mem++
  }



  input_view = input_view.slice(c.length)
}

input.forEach(function(c, i){
  c = to_char(c)

  switch (c) {
    case '"': e += '\\"'
    break
    case '\\': e += '\\\\'
    break
    case '\n': break
    default: e += c
  }

  if (c == '\n' || i == input.length - 1) {
    e = '"' + e + '"'
    encoded.push(e)
    e = ''
  }
})


var encoded_count = encoded.reduce(function (prev, el) {
  return prev + el.length
}, 0)

console.log(`Code characters: ${chars_code}. Memory characters: ${chars_mem}. Diff: ${chars_code - chars_mem}.`)
console.log(`Re-encoded thingy: ${encoded_count - chars_code}`)