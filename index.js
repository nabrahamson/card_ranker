import {
  each,
  range,
  shuffle,
} from 'lodash'
import rankHand from './ranker'

// initialize a standard deck of cards
const newDeck = require('./cards.json')
let shuffledDeck = shuffle(newDeck.cards)

// deal 10 poker hands and rank each of them
each(range(0, 10), () => {
  let hand = []
  each(range(0, 5), () => {
    hand.push(shuffledDeck.pop())
  })
  rankHand(hand)
})

