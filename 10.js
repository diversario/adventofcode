'use strict'

var input = '1321131112'

function say (str) {
  if (!str.length) return ''

  var count = 0
    , output = ''
    , c

  for (let i = 0; i <= str.length; i++) {
    if (i == str.length) {
      output += `${count}${c}`
      continue
    }

    if (!c) {
      c = str[i]
    }

    if (c == str[i]) {
      count++
    } else {
      output += `${count}${c}`
      count = 1
      c = str[i]
    }
  }

  return output
}

var said = input

for (var i = 0; i < 50; i++) {
  said = say(said)

  if (i == 39) {
    console.log(`length: ${said.length}`)
  }
}

console.log(`length: ${said.length}`)
