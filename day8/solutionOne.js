const fs = require('fs');
const os = require('os');

fs.readFile('input.txt', (err, data) => {
    const input = data.toString();
    const instruction = input.split(os.EOL)[0];
    const steps = instruction.split('');

    const mapItems  = input.split(os.EOL).slice(2);

    const mapObjects = {};
    for (let map of mapItems) {
        const key = map.split(' = ')[0];
        const left = map.split(' = ')[1].split(', ')[0].slice(1,4);
        const right = map.split(' = ')[1].split(', ')[1].slice(0,3);

        mapObjects[key] = {
            left: left,
            right: right
        };
    }

    let position = mapObjects['AAA'];
    let stepCount = 0;
    while (true) {
        for (let step of steps) {
            if (step === 'L') {
                position = mapObjects[position['left']];
            } else if (step === 'R') {
                position = mapObjects[position['right']];
            }
            stepCount++;
            if (position === mapObjects['ZZZ']) {
                break;
            }
        }
        if (position === mapObjects['ZZZ']) {
            break;
        }
    }

    console.log(stepCount); //14681
});