const DiceGameScorer = require('../../src/diceGameScorer/diceGameScorer');

describe('DiceGameScorer Class', () => {
  let scorer;

  beforeEach(() => {
    scorer = new DiceGameScorer(5, 100); // 5 dice, 100 iterations for tests
    jest.spyOn(scorer, 'rollDice').mockImplementation(() => [1, 2, 4, 5, 6]);
  });

  describe('rollDice()', () => {
    test('should return array of correct length', () => {
      
      scorer.rollDice
      .mockReturnValueOnce([1, 4, 6]);       // role once with 3 dice
      const result = scorer.rollDice(3);

      expect(result).toHaveLength(3);
      result.forEach(die => {
        expect(die).toBeGreaterThanOrEqual(1);
        expect(die).toBeLessThanOrEqual(6);
      });
    });
  });

  describe('processRoll()', () => {
    test('should remove all 3s and score 0', () => {
      const dice = [3, 3, 1, 4, 5];
      const result = scorer.processRoll(dice);
      expect(result).toEqual({ score: 0, diceRemoved: 2 });
    });

    test('should remove lowest die when no 3s', () => {
      const dice = [1, 2, 4, 5, 6];
      const result = scorer.processRoll(dice);
      expect(result).toEqual({ score: 1, diceRemoved: 1 });
    });

    test('should remove only one lowest die when no 3s', () => {
      const dice = [1, 1, 2, 5, 6];
      const result = scorer.processRoll(dice);
      expect(result).toEqual({ score: 1, diceRemoved: 1 });
    });

    test('should remove only one die when no 3s and all numbers are same', () => {
      const dice = [6, 6, 6, 6, 6];
      const result = scorer.processRoll(dice);
      expect(result).toEqual({ score: 6, diceRemoved: 1 });
    });

    test('should handle all 3s case', () => {
      const dice = [3, 3, 3, 3, 3];
      const result = scorer.processRoll(dice);
      expect(result).toEqual({ score: 0, diceRemoved: 5 });
    });
  });

  describe('play()', () => {
    test('should accumulate scores correctly', () => {
      scorer.rollDice
        .mockReturnValueOnce([3, 1, 4, 3, 6]) // First roll
        .mockReturnValueOnce([1, 4, 6])       // Second roll
        .mockReturnValueOnce([4, 6])          // Third roll
        .mockReturnValueOnce([6]);            // Fourth roll

      scorer.occurrences[11] = 0; // Reset occurrences for this test
      scorer.play();
      
      // Verify score distribution
      console.log(scorer.occurrences);
      expect(scorer.occurrences[11]).toBeGreaterThanOrEqual(1); //  (from 3s) + 1 (lowest)
    });
  });

  describe('Integration', () => {
    test('full simulation should not throw errors', () => {
      const realGame = new DiceGameScorer(3, 10);
      expect(() => realGame.runSimulation()).not.toThrow();
    });
  });
});