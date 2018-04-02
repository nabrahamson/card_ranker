# Card_Ranker

This is a simple package that will rank 5 card poker hands. Each hand is an array in the format
```
<Card Rank><Card Suit>.
```
Examples:
- [As, Kh, Jc, 10s, 2h]
- [2h, 3h, 4h, 5h, 6h]
- [3s, 3c, 3d, 7s, 9d]

When evaluating a hand, it prints to the console a line in the format:
```
Hand: <hand> (<evaluated string>)
```
Examples:
- Hand: As Kh Jc 10s 2h (High card Ace)
- Hand: 2h 3h 4h 5h 6h (Straight Flush)
- [3s, 3c, 3d, 7s, 9d] (Three of a kind 3s)

## Getting Started
Clone this repository onto your machine and run
`npm install`

### Prerequisites
npm and node need to be installed on the target machine to run this package as well as any tests

## Testing
With the package installed, tests may be run with the command:
`npm test`

## Demo
A demonstration of this package can be run with the command:
`npm run demo`

## Built With
- [Lodash](https://lodash.com) 

## Authors
- **Noah Abrahamson** - *Inital work* - [nabrahamson](https://github.com/nabrahamson)

