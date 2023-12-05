const fs = require('fs');
const os = require('os');

fs.readFile('input.txt', (err, data) => {
    const input = data.toString();
    const cards = input.split(os.EOL);

    const result = cards
        .map(x => {
            const a = x.trim().split(':');
            const b = a[1].trim().split('|');
            const c = b[0].trim().split(' ').filter(x => x.trim() !== '').map(x => Number(x));
            const d = b[1].trim().split(' ').filter(x => x.trim() !== '').map(x => Number(x));

            let r = 0;
            for (let i of c) {
                if (d.includes(i)) {
                    if (r === 0) {
                        r++;
                    } else {
                        r*=2;
                    }
                }
            }

            return r;
        })
        .reduce((acc, curr) => acc + curr, 0);

    console.log(result);
})
