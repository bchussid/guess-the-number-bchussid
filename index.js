//Sorry about the multiple files. This will definitely be one I'll re-submit...
//the ones to look at are (under the guess-the-number folder) are: extended range.js, index.js, and inversegame.js
//I know it's mostly there but tweaks definitely need to be made.
//Couldn't figure out how to combine the two versions, had difficulty with the cheat clauses
//and something in the randNum function in the extended range version is off
//I just could not finish it the way I wanted to for the life of me

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();
function randNum(min, max) {
  let range = (max - min) + 1;
  let decimal = (Math.random() * range);
  let int = Math.floor(decimal) + min;
  return int;
}



async function start() {



  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("Pick a number between 1 and 100 - What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);

  let min = 1
  let max = 100

  let compGuess = randNum(min, max)

  let answer = await ask(`Is your number ${compGuess}? Please enter 'yes' or 'no': `)

  while (answer !== 'yes' && answer !== 'no') {
    answer = await ask("Please enter either 'yes' or 'no': ") //so that you can only enter 'yes' or 'no'
  }

  if (answer === 'no') {  

    while (answer === 'no') {
      let upOrDown = await ask("Is it 'higher' or 'lower'? ")

      if (upOrDown === 'lower') {
        max = compGuess - 1;
        compGuess = Math.floor(((min + max) / 2)); //gives you the 'smart guesses' - picks in the middle of the range
      } else if (upOrDown === 'higher') {
        min = compGuess + 1;
        compGuess = Math.floor(((min + max) / 2));
      } else if (secretNumber === compGuess && (answer === 'no')) { //cheat guard almost seems to work here but needs tweaking - almost there
        console.log("Cheater!")
        process.exit()
      } else if (min > max || max < min) {                      //seems like this cheat guard placed here should work as well
        console.log('cheatah!')
        process.exit()
      } else {
        console.log("I don't understand - please enter either 'higher' or 'lower' but I'll ask again... ") 
      }



      answer = await ask(`Is your number ${compGuess}? `)


      while (answer !== 'yes' && answer !== 'no') { 
        answer = await ask("Please enter either 'yes' or 'no' - ") // makes sure input is only either 'yes' or 'no'
      }
      if (answer === "yes") {
        console.log("Nailed it! Good game!") //vict message & it works when the game is won
        process.exit()
      }
    }
  }
}
//another cheat guard: if # of compguess's (in this case, it's 7) > [log2(max) + 1]

      //potential cheat guard: if (secretNumber === compGuess && (answer === 'no')) {
      // console.log('cheatah')
      //} 