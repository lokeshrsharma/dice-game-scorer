const DiceGameScorer = require('./diceGameScorer/diceGameScorer');

// Command-line execution
(() => {
  if (require.main === module) {
    let numOfDice = 5;
    let iterations = 10000;

    if (process.argv.length >= 4) {
      try {
        // Ensure values are numbers
        if (isNaN(numOfDice) || isNaN(iterations)) {
          throw new Error("Invalid arguments");
        }
        // Ensure values are integers
        if (!Number.isInteger(numOfDice) || !Number.isInteger(iterations)) {
          throw new Error("Invalid arguments");
        }

        // Ensure values are greater than 0
        if (numOfDice <= 0 || iterations <= 0) {
          throw new Error("Values must be greater than 0");
        }
        
        numOfDice = parseInt(process.argv[2]);
        iterations = parseInt(process.argv[3]);
      } catch (e) {
        console.error("Invalid arguments. Usage: node index.js [dice] [iterations]");
        process.exit(1);
      }
    }

    const game = new DiceGameScorer(numOfDice, iterations);
    game.runSimulation();
  }
})();