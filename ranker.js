import {
  countBy,
  each,
  has,
  invert,
  map,
  range,
  uniq,
} from 'lodash'

const highCards = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
}

const cardNames = {
  A: 'Ace',
  K: 'King',
  Q: 'Queen',
  J: 'Jack',
}


const enumerateRanks = function enumerate(ranks) {
  const numericRanks = map(ranks, card => {
    if (has(highCards, card)) {
      return highCards[card]
    }
    return parseInt(card, 10)
  })

  return numericRanks.sort((a, b) => {
    return a - b
  })
}

const checkFlush = function flush(suits) {
  const uniqueSuits = uniq(suits)
  if (uniqueSuits.length === 1) {
    return uniqueSuits[0]
  }
  return null
}

const checkStraight = function straight(ranks) {
  const sortedRanks = enumerateRanks(ranks)
  let isSequence = true
  let indexes

  // check for A, 2, 3, 4, 5
  if (sortedRanks[4] === 14 && sortedRanks[0] === 2) {
    indexes = range(0, 3)
  } else {
    indexes = range(0, 4)
  }

  // iterate over the range of ranks to determine if they are in sequence
  each(indexes, index => {
    if ((sortedRanks[index + 1] - sortedRanks[index]) !== 1) {
      isSequence = false
    }
  })

  return isSequence
}

const checkAceKing = function aceKing(ranks) {
  if (ranks.includes('A') && ranks.includes('K')) {
    return true
  }
  return false
}


const checkSets = function setCheck(ranks) {
  let pairs = []
  let triple
  let quad
  let sets = {}
  const rankMap = countBy(ranks)

  each(Object.keys(rankMap), key => {
    if (rankMap[key] === 2) {
      pairs.push(key)
    } else if (rankMap[key] === 3) {
      triple = key
    } else if (rankMap[key] === 4) {
      quad = key
    }
  })

  if (pairs.length > 0) {
    sets.pairs = pairs
  }
  if (triple) {
    sets.triple = triple
  }
  if (quad) {
    sets.quad = quad
  }

  return sets
}

const getRank = function stringRank(value) {
  if (value in cardNames) {
    return cardNames[value]
  }
  return value
}

const checkHighCard = function high(ranks) {
  const highCard = (enumerateRanks(ranks))[4]
  let cardRank = highCard
  if (highCard > 10) {
    cardRank = (invert(highCards))[highCard]
  }
  return getRank(cardRank)
}

const rankHand = function rank(hand) {
  let flushSuit
  let isStraight = false
  let hasAceKing = false
  let sets = {}
  let handType

  const handOutput = 'Hand: ' + hand.join(' ') + ' '

  const suits = map(hand, card => {
    if (card.length === 3) {
      return card[2]
    }
    return card[1]
  })
  const ranks = map(hand, card => {
    if (card.length === 3) {
      return card.slice(0, 2)
    }
    return card[0]
  })

  // Check for flush or straight
  flushSuit = checkFlush(suits)
  isStraight = checkStraight(ranks)

  // If we have a flush, or straight, there are no pairs
  if (flushSuit || isStraight) {
    // if the hand is a straight, check if it's 10, J, Q, K, A
    if (isStraight) {
      hasAceKing = checkAceKing(ranks)
    }

    if (flushSuit && hasAceKing) {
      // Flush in the sequence 10, J, Q, K, A
      handType = '(Royal Flush)'
    } else if (flushSuit && isStraight) {
      handType = '(Straight Flush)'
    } else if (isStraight) {
      handType = '(Straight)'
    } else if (flushSuit) {
      handType = '(Flush)'
    }
  } else {
    // Look for pairs
    sets = checkSets(ranks)
    if (has(sets, 'quad')) {
      handType = '(Four of a kind '
      handType += getRank(sets.quad)
      handType += 's)'
    } else if (has(sets, 'triple')) {
      if (has(sets, 'pairs')) {
        handType = '(Full House)'
      } else {
        handType = '(Three of a kind '
        handType += getRank(sets.triple)
        handType += 's)'
      }
    } else if (has(sets, 'pairs')) {
      if (sets.pairs.length === 2) {
        handType = '(2 Pair)'
      } else {
        handType = '(Pair of '
        handType += getRank(sets.pairs[0])
        handType += 's)'
      }
    } else {
      // This is a high card hand
      handType = '(High card '
      handType += checkHighCard(ranks)
      handType += ')'
    }
  }

  // print ranking to console
  console.log(handOutput + handType)
}

const privates = {
  enumerateRanks: enumerateRanks,
  checkFlush: checkFlush,
  checkStraight: checkStraight,
  checkAceKing: checkAceKing,
  checkSets: checkSets,
  getRank: getRank,
  checkHighCard: checkHighCard,
}

export default rankHand
export { privates }
