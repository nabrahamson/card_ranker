import 'babel-polyfill'
import rankHand from '../ranker'
import sinon from 'sinon'

describe('#rankHand', () => {
  it('should detect a royal flush', () => {
    let spy = sinon.spy(console, 'log')
    const hand = ['As', '10s', 'Js', 'Ks', 'Qs']
    const expected = 'Hand: As 10s Js Ks Qs (Royal Flush)'
    rankHand(hand)
    sinon.assert.calledWith(spy, expected)
    console.log.restore()
  })
  it('should detect a straight flush', () => {
    let spy = sinon.spy(console, 'log')
    const hand = ['As', '2s', '5s', '3s', '4s']
    const expected = 'Hand: As 2s 5s 3s 4s (Straight Flush)'
    rankHand(hand)
    sinon.assert.calledWith(spy, expected)
    console.log.restore()
  })
  it('should detect a flush and not a straight flush', () => {
    let spy = sinon.spy(console, 'log')
    const hand = ['6s', '5s', 'As', '3s', '4s']
    const expected = 'Hand: 6s 5s As 3s 4s (Flush)'
    rankHand(hand)
    sinon.assert.calledWith(spy, expected)
    console.log.restore()
  })
  it('should detect a high card and not a straight flush', () => {
    let spy = sinon.spy(console, 'log')
    const hand = ['6s', '5s', 'Ac', '3s', '4s']
    const expected = 'Hand: 6s 5s Ac 3s 4s (High card Ace)'
    rankHand(hand)
    sinon.assert.calledWith(spy, expected)
    console.log.restore()
  })
  it('should detect a flush', () => {
    let spy = sinon.spy(console, 'log')
    const hand = ['As', 'Ks', '5s', '3s', '4s']
    const expected = 'Hand: As Ks 5s 3s 4s (Flush)'
    rankHand(hand)
    sinon.assert.calledWith(spy, expected)
    console.log.restore()
  })
  it('should detect a straight', () => {
    let spy = sinon.spy(console, 'log')
    const hand = ['As', '2h', '5s', '3s', '4s']
    const expected = 'Hand: As 2h 5s 3s 4s (Straight)'
    rankHand(hand)
    sinon.assert.calledWith(spy, expected)
    console.log.restore()
  })
  it('should detect a pair', () => {
    let spy = sinon.spy(console, 'log')
    const hand = ['As', 'Ah', '5s', '3s', '4s']
    const expected = 'Hand: As Ah 5s 3s 4s (Pair of Aces)'
    rankHand(hand)
    sinon.assert.calledWith(spy, expected)
    console.log.restore()
  })
  it('should detect two pair', () => {
    let spy = sinon.spy(console, 'log')
    const hand = ['As', 'Ah', '5c', '5d', '4s']
    const expected = 'Hand: As Ah 5c 5d 4s (2 Pair)'
    rankHand(hand)
    sinon.assert.calledWith(spy, expected)
    console.log.restore()
  })
  it('should detect three of a kind', () => {
    let spy = sinon.spy(console, 'log')
    const hand = ['As', '5h', '5c', '5d', '4s']
    const expected = 'Hand: As 5h 5c 5d 4s (Three of a kind 5s)'
    rankHand(hand)
    sinon.assert.calledWith(spy, expected)
    console.log.restore()
  })
  it('should detect a full house', () => {
    let spy = sinon.spy(console, 'log')
    const hand = ['As', '5h', '5c', '5d', 'Ac']
    const expected = 'Hand: As 5h 5c 5d Ac (Full House)'
    rankHand(hand)
    sinon.assert.calledWith(spy, expected)
    console.log.restore()
  })
  it('should detect four of a kind', () => {
    let spy = sinon.spy(console, 'log')
    const hand = ['5s', '5h', '5c', '5d', 'Ac']
    const expected = 'Hand: 5s 5h 5c 5d Ac (Four of a kind 5s)'
    rankHand(hand)
    sinon.assert.calledWith(spy, expected)
    console.log.restore()
  })
  it('should detect a hand with just a high card', () => {
    let spy = sinon.spy(console, 'log')
    const hand = ['6s', '8h', '3c', '5d', 'Jc']
    const expected = 'Hand: 6s 8h 3c 5d Jc (High card Jack)'
    rankHand(hand)
    sinon.assert.calledWith(spy, expected)
    console.log.restore()
  })
})

