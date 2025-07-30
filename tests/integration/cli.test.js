const { execSync } = require('child_process');
const path = require('path');

describe('CLI Execution', () => {
  const cliPath = path.join(__dirname, '../../src/diceGameScorer/diceGameScorer.js');

  test('should run with default parameters', async () => {
    const output = execSync(`node ${cliPath}`).toString();
    
    setTimeout(() => {
      expect(output).toContain('Number of simulations');
    }, 4000); // usually it takes ~200 ms. Rest is for the delay
  });

  test('should accept custom parameters', async () => {
    const output = execSync(`node ${cliPath} 3 50`).toString();

    setTimeout(() => {
      expect(output).toContain('50 using 3 dice');
    }, 4000); // usually it takes few ms. Rest is for the delay
  });

  test('should reject values less than 1', () => {
    try {
      execSync(`node ${cliPath} 0 50`);
    } catch (error) {
      expect(error.status).toBe(1);
      expect(error.stderr.toString()).toContain('greater than 0');
    }
  });

  test('should reject non-numeric values', () => {
    try {
      execSync(`node ${cliPath} zero ten`);
    } catch (error) {
      expect(error.status).toBe(1);
      expect(error.stderr.toString()).toContain('Invalid arguments');
    }
  });

  test('should reject non-integer values', () => {
    try {
      execSync(`node ${cliPath} 3.0 50.5`);
    } catch (error) {
      expect(error.status).toBe(1);
      expect(error.stderr.toString()).toContain('Invalid arguments');
    }
  });
});