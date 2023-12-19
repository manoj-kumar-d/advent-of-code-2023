const fs = require('fs');
const os = require('os');

//test_part_two_input
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

    const startWith__A = Object.keys(mapObjects).filter(x => x.charAt(2) === 'A');
    console.log(startWith__A);
    const itemsToFollow = startWith__A.length;
    let stepCount = 0;
    while (true) {
        for (let step of steps) {
                for (let i = 0; i < itemsToFollow; i++) {
                    let pKey = startWith__A[i];
                    let positions = mapObjects[pKey];

                    if (step === 'L') {
                        pKey = positions['left'];
                    } else if (step === 'R') {
                        pKey = positions['right'];
                    }
                    startWith__A[i] = pKey;
                }
                stepCount++;
                console.log(stepCount);
                console.log(startWith__A);
                if (startWith__A.every(x => x.charAt(2) === 'Z')) {
                    break
                }
        }
        if (startWith__A.every(x => x.charAt(2) === 'Z')) {
            break;
        }
    }
});