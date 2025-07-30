/**
 * Dice Game Scorer
 * Simulates a dice game where players roll dice and score based on specific rules.
 */
class DiceGameScorer {
  /**
   * Initializes a new instance of the DiceGameScorer class.
   * @param {number} numOfDice - The number of dice to roll.
   * @param {number} iterations - The number of simulations to run.
   */
  constructor(numOfDice = 5, iterations = 10000) {
    this.numOfDice = numOfDice;
    this.iterations = iterations;
    this.diceFaces = 6;
    this.occurrences = [];
  }

  /**
   * Runs the simulation of the dice game.
   */
  runSimulation() {
    const startTime = Date.now();
    this.occurrences = new Array(this.numOfDice * this.diceFaces + 1).fill(0);
    
    this.play();
    this.printResults(startTime);
  }

  /**
   * Plays the dice roll.
   */
  play() {
    for (let idx = 0; idx < this.iterations; idx++) {
      let numOfDiceCurrentRoll = this.numOfDice;
      let minTotal = 0;
      
      while (numOfDiceCurrentRoll > 0) {
        const diceNums = this.rollDice(numOfDiceCurrentRoll);
        // console.log(`Roll ${idx + 1}: ${diceNums.join(', ')}`);  // Uncomment for debugging
        // Process the roll to get the score and number of dice removed
        const { score, diceRemoved } = this.processRoll(diceNums);
        
        // Update the minimum total score
        minTotal += score;
        // console.log(`Min total: ${minTotal}`); // Uncomment for debugging
        
        // Update the number of dice remaining
        numOfDiceCurrentRoll -= diceRemoved;
        // console.log(`Dice remaining: ${numOfDiceCurrentRoll}`);
      }
      
      this.occurrences[minTotal]++;
    }
  }

  /**
   * Rolls the specified number of dice.
   * @param {number} diceCnt - The number of dice to roll.
   * @returns {Array<number>} - An array of rolled dice values.
   */
  rollDice(diceCnt) {
    return Array.from({ length: diceCnt }, () => 
      Math.floor(Math.random() * this.diceFaces) + 1
    );
  }

  /**
   * Processes the rolled dice according to the game rules.
   * @param {Array<number>} diceNums - An array of rolled dice values.
   * @returns {{ score: number, diceRemoved: number }} - The score and number of dice removed.
   */
  processRoll(diceNums) {
    const hasThrees = diceNums.includes(3);
    
    if (hasThrees) {
      const diceWith3 = diceNums.filter(die => die === 3).length;
      return { score: 0, diceRemoved: diceWith3 };
    } else {
      const minDie = Math.min(...diceNums);
      return { score: minDie, diceRemoved: 1 };
    }
  }

  /**
   * Prints the simulation results.
   * @param {number} startTime - The start time of the simulation.
   */
  printResults(startTime) {
    console.log(`Number of simulations was ${this.iterations} using ${this.numOfDice} dice.`);
    
    this.occurrences.forEach((count, idx) => {
      if (count > 0) {
        const percentage = (count / this.iterations);
        console.log(`Total ${idx} occurs ${percentage} occurred ${count}.0 times.`);
      }
    });
    
    const elapsed = (Date.now() - startTime) / 1000;
    console.log(`Total simulation took ${elapsed.toFixed(2)} seconds.`);
  }
}

module.exports = DiceGameScorer;