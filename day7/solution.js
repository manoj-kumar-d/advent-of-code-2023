const fs = require('fs');
const os = require('os');

const cards = {
    "2": 1,
    "3": 2,
    "4": 3 ,
    "5": 4,
    "6": 5,
    "7": 6,
    "8": 7,
    "9": 8,
    "T": 9,
    "J": 10,
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
        const x = cardsMap[Object.keys(cardsMap)[0]].length;
        if (x === 4 || x === 1) {
            type = "FOUR_OF_A_KIND";
        } else {
            type = "FULL_HOUSE";
        }
    } else if (uniqueCards === 3) {
        const x = cardsMap[Object.keys(cardsMap)[0]].length;
        const y = cardsMap[Object.keys(cardsMap)[1]].length;
        const z = cardsMap[Object.keys(cardsMap)[2]].length;
        if (x === 3 || y === 3 || z === 3) {
            type = "THREE_OF_A_KIND"
        } else {
            type = "TWO_PAIR"
        }
    } else if (uniqueCards === 4) {
        type = "ONE_PAIR"
    } else {
        type = "HIGH_CARD"
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

    console.log(rankedArray.map((obj, index) => obj.bid * (index+1)).reduce((acc, curr) => acc + curr, 0));
});