'use strict'

var input = ['Rudolph can fly 22 km/s for 8 seconds, but then must rest for 165 seconds.', 'Cupid can fly 8 km/s for 17 seconds, but then must rest for 114 seconds.', 'Prancer can fly 18 km/s for 6 seconds, but then must rest for 103 seconds.', 'Donner can fly 25 km/s for 6 seconds, but then must rest for 145 seconds.', 'Dasher can fly 11 km/s for 12 seconds, but then must rest for 125 seconds.', 'Comet can fly 21 km/s for 6 seconds, but then must rest for 121 seconds.', 'Blitzen can fly 18 km/s for 3 seconds, but then must rest for 50 seconds.', 'Vixen can fly 20 km/s for 4 seconds, but then must rest for 75 seconds.', 'Dancer can fly 7 km/s for 20 seconds, but then must rest for 119 seconds.']
var time = 2503

// var input = ['Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.', 'Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.']
// var time = 1000

function get_winners (obj) {
  var winners = []

  Object.keys(obj).forEach(function (name) {
    let deer = obj[name]

    winners.push({name: name, distance: deer.distance})
  })

  return winners.sort(function (a, b) {
    return b.distance - a.distance
  })
}

function award_points (winners, deers) {
  var top_deer = winners[0].distance

  winners.every(function (w) {
    if (w.distance >= top_deer) {
      deers[w.name].points++
    }
  })
}

var raindeers = []

input.forEach(function (line) {
  line = line.split(' ')

  raindeers.push({
    name: line[0],
    speed: parseInt(line[3], 10),
    duration: parseInt(line[6], 10),
    rest: parseInt(line[13], 10),
  })
})

var results = {}

for (let s = 1; s <= time; s++) {
  raindeers.forEach(function(deer){
    results[deer.name] = results[deer.name] || {points: 0, distance: 0}

    let period = s % (deer.duration + deer.rest)

    if (period && period <= deer.duration) {
      results[deer.name].distance += deer.speed
    }
  })

  award_points(get_winners(results), results)
}

var winner = {
  name: '',
  distance: 0
}

Object.keys(results).forEach(function(deer) {
  if (results[deer].distance > winner.distance) {
    winner.name = deer
    winner.distance = results[deer].distance
  }
})

console.log(winner)
console.log(results)