const fs = require('fs');
const os = require('os');

const cards = {
    "J": 1,
    "2": 2,
    "3": 3,
    "4": 4 ,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "T": 10,
    "Q": 11,
    "K": 12,
    "A": 13
};

const handTypes = {
    "FIVE_OF_A_KIND": 7,
    "FOUR_OF_A_KIND": 6,
    "FULL_HOUSE": 5,
    "THREE_OF_A_KIND": 4,
    "TWO_PAIR": 3,
    "ONE_PAIR": 2,
    "HIGH_CARD": 1
};

const getType = cardsString => {
    let type;
    const cards = cardsString.trim().split('');
    const cardsMap = cards.reduce((map, hand) => {
        map[hand] = map[hand] || [];
        map[hand].push(hand);
        return map;
    }, {});

    const uniqueCards = Object.keys(cardsMap).length;

    if (uniqueCards === 1) {
        type = "FIVE_OF_A_KIND";
    } else if (uniqueCards === 2) {
        if (Object.keys(cardsMap).some(x => x === 'J')) {
            type = "FIVE_OF_A_KIND";
        } else {
            const x = cardsMap[Object.keys(cardsMap)[0]].length;
            if (x === 4 || x === 1) {
                type = "FOUR_OF_A_KIND";
            } else {
                type = "FULL_HOUSE";
            }
        }
    } else if (uniqueCards === 3) {
        const cardOne = Object.keys(cardsMap)[0];
        const cardTwo = Object.keys(cardsMap)[1];
        const cardThree = Object.keys(cardsMap)[2];

        const x = cardsMap[cardOne].length;
        const y = cardsMap[cardTwo].length;
        const z = cardsMap[cardThree].length;
        if (Object.keys(cardsMap).some(x => x === 'J')) {
            const noOfJokers = cardsMap['J'].length;
            if (noOfJokers === 3) {
                type = "FOUR_OF_A_KIND";
            } else if (noOfJokers === 2) {
                type = "FOUR_OF_A_KIND";
            } else if (noOfJokers === 1) {
                if (x === 2 || y === 2 || z === 2) {
                    type = "FULL_HOUSE";
                } else {
                    type = "FOUR_OF_A_KIND";
                }
            }
        } else {
            if (x === 3 || y === 3 || z === 3) {
                type = "THREE_OF_A_KIND"
            } else {
                type = "TWO_PAIR"
            }
        }
    } else if (uniqueCards === 4) {
        if (Object.keys(cardsMap).some(x => x === 'J')) {
            type = "THREE_OF_A_KIND"
        } else {
            type = "ONE_PAIR"
        }
    } else {
        if (Object.keys(cardsMap).some(x => x === 'J')) {
            type = "ONE_PAIR"
        } else {
            type = "HIGH_CARD"
        }
    }

    return type;
}

fs.readFile('input.txt', (err, data) => {
    const input = data.toString();
    const hands = input.split(os.EOL);

    const customObjectArray = [];
    for (let hand of hands) {
        const cards = hand.split(' ')[0];
        const bid = hand.split(' ')[1];

        customObjectArray.push({
            hand: hand,
            cards: cards,
            bid: Number(bid),
            type: getType(cards),
            rank: handTypes[getType(cards)]
        });
    }

    const rankedArray = customObjectArray.sort((a, b) => {
        if (a.rank > b.rank) {
            return 1;
        } else if (a.rank < b.rank) {
            return -1;
        } else {
            let val = 0;
            for (let i=0; i<5; i++) {
                if (cards[a.cards.charAt(i)] > cards[b.cards.charAt(i)]) {
                    val = 1;
                    break;
                } else if (cards[a.cards.charAt(i)] < cards[b.cards.charAt(i)]) {
                    val =-1;
                    break
                }
            }
            return val;
        }

    });

    //part 2 - 253718286
    console.log(rankedArray.map((obj, index) => obj.bid * (index+1)).reduce((acc, curr) => acc + curr, 0));
});