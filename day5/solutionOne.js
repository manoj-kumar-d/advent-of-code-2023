const fs = require('fs');
const os = require('os');

fs.readFile('test.txt', (err, data) => {
   const input = data.toString();
   const res = input.split(os.EOL);

   const seeds = res[0].split(':')[1].trim().split(' ').map(x => Number(x));

   const allMaps = [];
   let maps = [];
   for (let i = 2; i < res.length; i++) {
      if (res[i] === '') {
         allMaps.push(maps);
         maps = [];
         continue;
      }
      maps.push(res[i]);
   }

   for(let i = 1 ; i < allMaps[0].length; i++) {
      const allMapElement = allMaps[0][i].trim().split(' ').map(x=> Number(x));
      const destRangeStart = allMapElement[0];
      const sourceRangeStart = allMapElement[1];
      const rangeLength = allMapElement[2];

      if (source >= sourceRangeStart && source < (sourceRangeStart+rangeLength)) {
         let pos = source - sourceRangeStart;
         return destRangeStart + pos;
         break;
      }
   }



   console.log(allMaps[0]);
});
