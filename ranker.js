import (countBy, uniq, map, has) from 'lodash';

const highCards = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
}

const rank_hand = function rank(hand) {
  const suits = map(hand, card => {
    return card[1];
  });
  const ranks = map(hand, card => {
    return card[0];
  });
}

const is_flush = function flush(suits) {
  const uniqueSuits = uniq(suits);
  if (uniqueSuits.length === 1){
    return uniqueSuits[0];
  }
  return null;
}

const has_pairs = function pairs(ranks) {
  const rankCount = countBy(ranks);
  if(rankCount.length === 5) {
    return false;
  }
  if(rankCount.length === 4) {
    return check_sets(rankCount);
  }
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

const is_three_of_kind;
const is_four_of_kind;
const high_card;

const enumerate_ranks = function enumerate(ranks) {
  const numericRanks = map(ranks, card => {
    if (has(highCards, card)) {
      return highCards[card];
    }
    return parseInt(card);
  });
}
