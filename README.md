# Dice Game Scorer

A JavaScript implementation of a dice game scoring system, with CLI and programmatic interfaces. The objective of the game is to obtain the lowest possible score. To that end, the rules of the game are as follows

## Game Rules

1. All dice are thrown on a board.
2. **Initial Roll**: 5 dice (configurable)
3. **Scoring per Roll**:
   - Remove **all 3s** → Score **0 points**
   - **No 3s**? Remove **lowest die** → Add its value to score
4. Repeat until no die remain
5. **Total Score** = Sum of all rolls

## Installation

```bash
git clone https://github.com/yourusername/dice-game-scorer.git
cd dice-game-scorer
npm install
```

## Usage

### CLI Interface

```bash
node src/index.js [diceCount] [iterations]
```

#### Example:

```bash
node src/index.js 5 10000
```

### Programmatic Interface

```bash
const DiceGameScorer = require('./src/diceGameScorer/diceGameScorer');

// Custom simulation
const game = new DiceGameScorer(3, 5000); // 3 dice, 5000 iterations
game.runSimulation();
```

## Sample Ouput

```bash
Number of simulations was 10000 using 5 dice.
Total 0 occurs 0.0202 occurred 202.0 times.
Total 1 occurs 0.0379 occurred 379.0 times.
...
Total simulation took 0.03 seconds.
```

## Testing

```bash
npm test                    # All tests
npm run test:integration    # Integration tests only
```

## Project Structure

```text
src/
├── diceGameScorer/         # Core logic
├── index.js                # CLI interface
tests/
├── unit/                   # Unit tests
├── integration/            # CLI/integration tests
├── __mocks__/              # Mock files
```
