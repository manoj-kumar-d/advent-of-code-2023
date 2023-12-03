const fs = require('fs');
const os = require('os');

fs.readFile('input.txt', (err, data) => {
   const input = data.toString();
   const games = input.split(os.EOL);

   const result = games
       .map(game => {
           const gameData = game.split(':')[1].trim().split('; ');

           const red = gameData
               .map(pick => pick.split(', '))
               .flat()
               .filter(selection => selection.split(' ')[1] === 'red')
               .map(selection => Number(selection.split(' ')[0]));

           const green = gameData
               .map(pick => pick.split(', '))
               .flat()
               .filter(selection => selection.split(' ')[1] === 'green')
               .map(selection => Number(selection.split(' ')[0]));


           const blue = gameData
               .map(pick => pick.split(', '))
               .flat()
               .filter(selection => selection.split(' ')[1] === 'blue')
               .map(selection => Number(selection.split(' ')[0]));


           return Math.max(...red) * Math.max(...green) * Math.max(...blue);
       }).reduce((acc, curr) => {
           return acc + curr;
       }, 0);

    console.log(result);
});