import (countBy, each, has, invert, map, uniq) from 'lodash';

const highCards = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
}

const rank_hand = function rank(hand) {
  let flushSuit;
  let isStraight = false;
  let hasAceKing = false;
  let sets = {};
  let handType;

  const has = Object.prototype.hasOwnProperty;
  const handOutput = 'Hand: ' + hand + ' ';

  const suits = map(hand, card => {
    return card[1];
  });
  const ranks = map(hand, card => {
    return card[0];
  });

  // Check for flush or straight
  flushSuit = is_flush(suits);
  isStraight = is_straight(ranks);

  // If we have a flush, or straight, there are no pairs
  if (is_flush || isStraight) {
    // if the hand is a straight, check if it's 10, J, Q, K, A
    if (isStraight) {
      hasAceKing = has_ace_king(ranks);
    }

    if(flushSuit && hasAceKing) {
      // Flush in the sequence 10, J, Q, K, A
      handType = '(Royal Flush)';
    } else if(flushSuit && isStraight) {
      handType = '(Straight Flush)';
    } else if (isStraight) {
      handType = '(Straight)';
    } else if (flushSuit) {
      handType = '(Flush)';
    }
  } else {

    // Look for pairs
    sets = check_sets(ranks);
    if (has.call(sets, 'quad')) {
      handType = '(Four of a kind ';
      handType += get_rank(sets.quad);
      handType += ')';
    } else if (has.call(sets, 'triple')) {
      if (has.call(sets, 'pairs')) {
        handType = '(Full House)';
      } else {
        handType = '(Three of a kind ';
        handType += get_rank(sets.triple);
        handType += ')';
      }
    } else if (has.call(sets, 'pairs')) {
      if (sets.pairs.length === 2) {
        handType = '(2 Pair)';
      } else {
        handType = '(Pair of ';
        handType += get_rank(sets.pairs[0]);
        handType += ')';
      }
    } else {
      //This is a high card hand
      handType = '(High card ';
      handType += high_card(ranks);
      handType += ')';
    }

    // print ranking to console
    console.log(handOutput + handType);
}

const is_flush = function flush(suits) {
  const uniqueSuits = uniq(suits);
  if (uniqueSuits.length === 1){
    return uniqueSuits[0];
  }
  return null;
}

const is_straight = function straight(ranks) {
  const enumeratedRanks = enumerate_ranks(ranks);
  const sortedRanks = enumeratedRanks.sort();

  // check for A, 2, 3, 4, 5
  if(sortedRanks[4] === 13 and sortedRanks.slice(0,3) === [2, 3, 4, 5]) {
    return true;
  }

  const headTailDifference = sortedRanks[4] - sortedRanks[0];
  if (headTailDifference === 4) {
    return true;
  }
  return false;
};

const has_ace_king = function ace_king(ranks) {
  if (ranks.includes('A') && ranks.includes('K')) {
    return true;
  }
  return false;
}


const check_sets = function set_check(ranks) {
  let pairs = [];
  let triple;
  let quad;
  let sets = {};
  const rankCount = countBy(ranks);

  each(Object.keys(rankMap), key => {
    if (rankMap[key] === 2) {
      pairs.push(key);
    } else if (rankMap[key] === 3) {
      triple = key;
    } else if (rankMap[key] === 4) {
      quad = key;
    }
  })

  if (pairs.length > 0) {
    sets['pairs'] = pairs;
  }
  if (triple) {
    sets['triple'] = triple;
  }
  if (quad) {
    sets['quad'] = quad;
  }

  return sets;

}

const get_rank = function string_rank(value) {
  if (value > 10) {
    return (invert(highCards))[value];
  }
  return value;
}

const high_card = function high(ranks) {

  const highCard = (ranks.sort())[4];
  if (highCard > 10) {
    return (invert(highCards))[highCard];
  }
  return highCard;
}

const enumerate_ranks = function enumerate(ranks) {
  const numericRanks = map(ranks, card => {
    if (has(highCards, card)) {
      return highCards[card];
    }
    return parseInt(card);
  });

  return numericRanks.sort();
}
