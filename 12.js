'use strict'

var input = require('./12.json')

function dig (node) {
  if (typeof node == 'number') {
    return node
  }

  if (node == null) {
    return 0
  }

  if (Array.isArray(node)) {
    return node.reduce(function (num, el) {
      return num + dig(el)
    }, 0)
  }

  if (typeof node == 'object') {
    let keys = Object.keys(node)
    let is_red = keys.filter(function (key) {
      return node[key] === 'red'
    })

    if (is_red.length) {
      return 0
    }

    return keys.reduce(function (num, key) {
      return num + dig(node[key])
    }, 0)
  }

  return 0
}



console.log(dig(input))