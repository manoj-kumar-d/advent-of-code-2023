const fs = require('fs');
const os = require('os');

fs.readFile('input.txt', (err, data) => {
   const input = data.toString();
   const games = input.split(os.EOL);

   const validRed = 12;
   const validGreen = 13;
   const validBlue = 14;

   const result = games.filter(game => {
       const gameData = game.split(':');
       const gameDetails = gameData[1];
       return gameDetails.split('; ')
           .map(pick => pick.trim().split(', '))
           .map(pick=> pick.map(option => option.split(' ')))
           .every(pick => pick.every(option => {
               if (option[1] === 'red') {
                   return option[0] <= validRed;
               } else if (option[1] === 'green') {
                   return option[0] <= validGreen;
               } else if (option[1] === 'blue') {
                   return option[0] <= validBlue;
               }
           }));
   }).map(game => {
       const gameData = game.split(':');
       const gameName = gameData[0];
       return  Number(gameName.split(' ')[1]);
   }).reduce((acc, curr) => {
       return acc + curr;
   }, 0);

   console.log(result);
});