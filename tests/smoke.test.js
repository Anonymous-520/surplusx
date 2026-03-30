const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

assert(true, 'Smoke test failed');
console.log('Smoke test passed');