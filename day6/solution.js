const fs = require('fs');
const os = require('os');

fs.readFile('input.txt', (err, data) => {
    const input = data.toString();

    const lineOne = input.split(os.EOL)[0];
    const times = lineOne.slice(9, lineOne.length).trim().split(' ')
        .filter(x => x !== '').map(x => Number(x));
    const lineTwo = input.split(os.EOL)[1];
    const distances = lineTwo.slice(9, lineTwo.length).trim().split(' ')
        .filter(x => x !== '').map(x => Number(x));

    let result = 1;
    for (let game = 0; game < times.length; game++) {
        const time = times[game];
        const recordDistance = distances[game];

        let winningTimes = 0;
        for (let hold = 0; hold <= time; hold++) {
            let speed = hold;
            let travelTime = time - hold;

            let possibleDistance = speed * travelTime;
            if (possibleDistance > recordDistance) {
                winningTimes++;
            }
        }

        if (winningTimes > 0) {
            result*=winningTimes;
        }
    }

    console.log(result); //2269432

});