const fs = require('fs');
const os = require('os');

fs.readFile('input.txt', (err, data) => {
   const input = data.toString();
   const histories = input.split(os.EOL);

   const results = [];
   for(const history of histories) {
       let values = history.split(' ').map(x => Number(x));
       const deductions = [values];
       while (true) {
           const newValues = [];
           for(let i=0; i< values.length-1 ; i++) {
               const x = values[i+1] - values[i];
               newValues.push(x);
           }
           values = newValues;
           deductions.push(values);
           if (values.every(x => x === 0)) {
               break;
           }
       }

       const steps = deductions.length;
       const firstValues = [];
        for(let i=steps-1; i>=0; i--) {
            const values = deductions[i];
            const firstValue = values[0];
            firstValues.push(firstValue);
        }



       results.push(firstValues.reduce((acc, curr) => curr-acc));
       console.log(results);
   }
   console.log(results.reduce((acc, curr) => acc+curr));
   //1022
});