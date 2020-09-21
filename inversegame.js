//this has a several bugs (some with the 'if'statements/loops and maybe some type coersion errors) but technically works
//would've liked to have had more time with it though

const { type } = require('os');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}



start();

// declaration of functions + variables im going to use throughout
function randNum(min, max) {
    let range = (max - min) + 1;
    let decimal = (Math.random() * range);
    let int = Math.floor(decimal) + min;
    return int;
}



async function start() {
    console.log("Let's play a game where I (computer) make up a number between 1 and 100 and you (human) try to guess it.")

    const secretNumber = randNum(1, 100) 

    await ask("My secret number is: " + secretNumber + " Hit enter to proceed")
    console.log(typeof (secretNumber))

    let guess = await ask("Enter your first guess... ")

    if (guess === NaN) {
        await ask("Please enter a number") //this should only allow you to enter a number
    }

    if (guess !== secretNumber) {

        while (guess !== secretNumber) {

            if (guess > secretNumber) {
                console.log("Too high, sucka.")
                guess = await ask("Take another stab:  ")
            } else if (guess < secretNumber); {
                console.log("Too low, sucka")
                guess = await ask("Try again: ")
            }
            if (+guess === +secretNumber) {
                console.log("Got it!")
                process.exit();
            }
        }

    }

}