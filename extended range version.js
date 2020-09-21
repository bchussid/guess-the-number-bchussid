const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();



async function start() {



  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let userMax = await ask("First, let's set the range. We'll play between 1 and a number of your choosing. Please enter the max limit now. ")
  console.log("You entered: " + userMax)
  let secretNumber = await ask("Now pick a number between 1 and the number you just entered - What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);

  let min = 1
  let max = userMax

  //something about the way this is running is giving numbers way outside the specified range
  function randNum(min, userMax) {
    let range = (userMax - min) + 1;
    let decimal = (Math.random() * range);
    let int = Math.floor(decimal) + min;
    return int;
  }



  let compGuess = randNum(min, max)
  //if i can limit the number of repitions (or asks), that could work as a cheat guard

  answer = await ask(`Is your number ${compGuess}? Please enter 'yes' or 'no': `)

  while (answer !== 'yes' && answer !== 'no') {
    answer = await ask("Please enter either 'yes' or 'no': ")
  }

  if (answer === 'no') {

    while (answer === 'no') {
      console.log("inside the while loop!")
      let upOrDown = await ask("Is it 'higher' or 'lower'? ")


      if (upOrDown === 'lower') {
        max = compGuess - 1;
        compGuess = Math.floor(((min + max) / 2)); //chooses number in the middle of the range - 'smart guesses'
        console.log('You said the number was lower') // see where this is at, use this concept/placement for cheat guard
      } else if (upOrDown === 'higher') {            // like if min > max (new values once they've been reassigned based on previous answers)
        min = compGuess + 1;
        compGuess = Math.floor(((min + max) / 2)); //'smart guess'
        console.log('You said it was higher')
      } else if (secretNumber === compGuess && (answer === 'no')) { //cheat guard seems to work here but needs tweaking - almost there
        console.log("Cheater!")
        process.exit()
      } else if (min > max || max < min) {                      //seems like this cheat guard should work as well
        console.log('cheatah!')
        process.exit()
      } else {
        console.log("I don't understand - please enter either 'higher' or 'lower' but I'll ask again... ") //should bring you back to is it higher or lower but it brings you back to 'is your number...?'
      }

      answer = await ask(`Is your number ${compGuess}? `) //* this is returning a number outside range - why? *


      while (answer !== 'yes' && answer !== 'no') { 
        answer = await ask("Please enter either 'yes' or 'no' - ")
      }
      if (answer === "yes") {
        console.log("Nailed it! Good game!") 
        process.exit() 
      }
      //cheat guard?: if # of compguess's > [log2(max) + 1]

      //if (secretNumber === compGuess && (answer === 'no')), you're a cheatah
    }
  }
}