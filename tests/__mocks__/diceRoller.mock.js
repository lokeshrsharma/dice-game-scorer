// Consistent dice rolls for predictable tests
module.exports = {
  rollDice: jest.fn().mockImplementation(count => {
    const preset = [3, 1, 4, 5, 6].slice(0, count);
    return [...preset].sort(() => Math.random() - 0.5); // Shuffle
  })
};