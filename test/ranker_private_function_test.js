import 'babel-polyfill'
import { expect } from 'chai'
import { privates } from '../ranker'

describe('#enumerateRanks', () => {
  it('should take in a list of strings and return an array of integers', () => {
    const ranks = ['2', '3', '4', '5', '6']
    const expected = [2, 3, 4, 5, 6]
    const actual = privates.enumerateRanks(ranks)
    expect(actual).to.be.an('Array')
    expect(actual.length).to.equal(5)
    expect(actual).to.deep.equal(expected)
  })
  it('should convert face cards to numeric equivalents', () => {
    const ranks = ['10', 'J', 'Q', 'K', 'A']
    const expected = [10, 11, 12, 13, 14]
    const actual = privates.enumerateRanks(ranks)
    expect(actual).to.be.an('Array')
    expect(actual.length).to.equal(5)
    expect(actual).to.deep.equal(expected)
  })
  it('should sort the cards based on ranks from lowest to greatest', () => {
    const ranks = ['9', '8', '9', 'K', '2']
    const expected = [2, 8, 9, 9, 13]
    const actual = privates.enumerateRanks(ranks)
    expect(actual).to.be.an('Array')
    expect(actual.length).to.equal(5)
    expect(actual).to.deep.equal(expected)
  })
})

describe('#checkFlush', () => {
  it('should take in a list of strings, and return a string if all values are equal', () => {
    const suits = ['h', 'h', 'h', 'h', 'h']
    const expected = 'h'
    const actual = privates.checkFlush(suits)
    expect(actual).to.be.a('String')
    expect(actual).to.equal(expected)
  })
  it('should take in a list of strings, and return null if any of the values are different', () => {
    const suits = ['h', 's', 'c', 'h', 'h']
    const actual = privates.checkFlush(suits)
    expect(actual).to.be.null
  })
})

describe('#checkStraight', () => {
  it('should take in a list of strings, and return false if they are not in numeric order', () => {
    const ranks = ['2', '3', '5', '6', '7']
    const actual = privates.checkStraight(ranks)
    expect(actual).to.be.false
  })
  it('should take in a list of strings, and return true if they are in numeric order', () => {
    const ranks = ['2', '3', '4', '5', '6']
    const actual = privates.checkStraight(ranks)
    expect(actual).to.be.true
  })
  it('should return true when the ranks are [2, 3, 4, 5, A]', () => {
    const ranks = ['2', '4', 'A', '3', '5']
    const actual = privates.checkStraight(ranks)
    expect(actual).to.be.true
  })
  it('should return true for a royal straight', () => {
    const ranks = ['A', 'Q', '10', 'J', 'K']
    const actual = privates.checkStraight(ranks)
    expect(actual).to.be.true
  })
  it('should return false for a set with a pair', () => {
    const ranks = ['2', '3', '3', '5', '6']
    const actual = privates.checkStraight(ranks)
    expect(actual).to.be.false
  })
})

describe('#checkAceKing', () => {
  it('should return true for a set containing both an Ace and King', () => {
    const ranks = ['A', '2', '4', 'K', 'A']
    const actual = privates.checkAceKing(ranks)
    expect(actual).to.be.true
  })
  it('should return false for a set containing an Ace but no King', () => {
    const ranks = ['2', '3', 'A', 'Q', '3']
    const actual = privates.checkAceKing(ranks)
    expect(actual).to.be.false
  })
  it('should return false for a set containing a King but no Ace', () => {
    const ranks = ['2', '3', 'K', 'Q', '3']
    const actual = privates.checkAceKing(ranks)
    expect(actual).to.be.false
  })
  it('should return false for a set containing neither an Ace nor a King', () => {
    const ranks = ['2', '3', 'Q', 'Q', '3']
    const actual = privates.checkAceKing(ranks)
    expect(actual).to.be.false
  })
})

describe('#checkSets', () => {
  it('should return an empty object when called with a hand with no sets', () => {
    const ranks = ['2', '7', '9', 'K', 'A']
    const expected = {}
    const actual = privates.checkSets(ranks)
    expect(actual).to.deep.equal(expected)
  })
  it('should return an object containing a pairs member with a hand containing a pair', () => {
    const ranks = ['2', '9', '9', 'K', 'A']
    const expected = {
      pairs: ['9'],
    }
    const actual = privates.checkSets(ranks)
    expect(actual).to.deep.equal(expected)
    expect(actual.pairs).to.be.an('Array')
  })
  it('should return an object containing a pairs member with a hand containing two pair', () => {
    const ranks = ['A', '9', '9', 'K', 'A']
    const expected = {
      pairs: ['9', 'A'],
    }
    const actual = privates.checkSets(ranks)
    expect(actual).to.deep.equal(expected)
  })
  it('should return an object containing a triple member with a hand containing a triple', () => {
    const ranks = ['A', '9', '9', 'K', '9']
    const expected = {
      triple: '9',
    }
    const actual = privates.checkSets(ranks)
    expect(actual).to.deep.equal(expected)
    expect(actual.triple).to.be.a('String')
  })
  it('should return an object containing a triple and pairs member with a hand containing a full house', () => {
    const ranks = ['A', '9', '9', 'A', '9']
    const expected = {
      pairs: ['A'],
      triple: '9',
    }
    const actual = privates.checkSets(ranks)
    expect(actual).to.deep.equal(expected)
  })
  it('should return an object containing a quad member with a hand containing a four of a kind', () => {
    const ranks = ['9', '9', '9', 'K', '9']
    const expected = {
      quad: '9',
    }
    const actual = privates.checkSets(ranks)
    expect(actual).to.deep.equal(expected)
    expect(actual.quad).to.be.a('String')
  })
})

describe('#getRank', () => {
  it('should return a string for values 2-10', () => {
    let value = '2'
    let actual = privates.getRank(value)
    expect(actual).to.equal(value)
    value = '3'
    actual = privates.getRank(value)
    expect(actual).to.equal(value)
    value = '4'
    actual = privates.getRank(value)
    expect(actual).to.equal(value)
    value = '5'
    actual = privates.getRank(value)
    expect(actual).to.equal(value)
    value = '6'
    actual = privates.getRank(value)
    expect(actual).to.equal(value)
    value = '7'
    actual = privates.getRank(value)
    expect(actual).to.equal(value)
    value = '8'
    actual = privates.getRank(value)
    expect(actual).to.equal(value)
    value = '9'
    actual = privates.getRank(value)
    expect(actual).to.equal(value)
    value = '10'
    actual = privates.getRank(value)
    expect(actual).to.equal(value)
  })
  it('should return an "A" when passed 14', () => {
    const value = 14
    const actual = privates.getRank(value)
    expect(actual).to.equal('A')
  })
  it('should return an "K" when passed 13', () => {
    const value = 13
    const actual = privates.getRank(value)
    expect(actual).to.equal('K')
  })
  it('should return an "Q" when passed 12', () => {
    const value = 12
    const actual = privates.getRank(value)
    expect(actual).to.equal('Q')
  })
  it('should return an "J" when passed 11', () => {
    const value = 11
    const actual = privates.getRank(value)
    expect(actual).to.equal('J')
  })
})

describe('#checkHighCard', () => {
  it('should return an "A" when the highest card is an Ace', () => {
    const ranks = ['A', '9', '9', 'K', '9']
    const expected = 'A'
    const actual = privates.checkHighCard(ranks)
    expect(actual).to.equal(expected)
  })
  it('should return an "K" when the highest card is an King', () => {
    const ranks = ['10', '9', '9', 'K', '9']
    const expected = 'K'
    const actual = privates.checkHighCard(ranks)
    expect(actual).to.equal(expected)
  })
  it('should return an "Q" when the highest card is an Queen', () => {
    const ranks = ['4', '9', '9', '8', 'Q']
    const expected = 'Q'
    const actual = privates.checkHighCard(ranks)
    expect(actual).to.equal(expected)
  })
  it('should return an "J" when the highest card is a Jack', () => {
    const ranks = ['J', '9', '3', '4', '9']
    const expected = 'J'
    const actual = privates.checkHighCard(ranks)
    expect(actual).to.equal(expected)
  })
  it('should return a 10 when the highest card is a Ten', () => {
    const ranks = ['10', '9', '7', '4', '8']
    const expected = 10
    const actual = privates.checkHighCard(ranks)
    expect(actual).to.equal(expected)
  })
})
