Let's start with the first module: **Assert** (`assert`).

### 1. **Assert Module**

The `assert` module provides a simple set of assertion functions for testing invariants. It is useful for writing tests to ensure code behaves as expected by comparing actual and expected values.

#### Available Methods

1. **assert(value, message)**: Throws an error if the `value` is falsy. Can include an optional error `message`.
2. **assert.deepEqual(actual, expected, message)**: Tests for deep equality between `actual` and `expected` objects. Will throw an error if they are not deeply equal.
3. **assert.deepStrictEqual(actual, expected, message)**: Similar to `assert.deepEqual()`, but also checks that object prototypes and property types are the same.
4. **assert.equal(actual, expected, message)**: Tests for loose equality (using `==`). If `actual` is not equal to `expected`, it throws an error.
5. **assert.fail(message)**: Throws an error with the provided `message`. Use this to explicitly fail tests.
6. **assert.ifError(value)**: Throws an error if `value` is not `null` or `undefined`. Commonly used to test callback errors.
7. **assert.notDeepEqual(actual, expected, message)**: Throws an error if the `actual` and `expected` are deeply equal.
8. **assert.notDeepStrictEqual(actual, expected, message)**: Throws an error if the `actual` and `expected` are strictly deeply equal.
9. **assert.notEqual(actual, expected, message)**: Tests for loose inequality. Throws an error if `actual` is equal to `expected`.
10. **assert.notStrictEqual(actual, expected, message)**: Tests for strict inequality. Uses the `!==` operator.
11. **assert.ok(value, message)**: Alias of `assert()`. Throws an error if `value` is falsy.
12. **assert.strictEqual(actual, expected, message)**: Tests for strict equality (using `===`). Throws an error if `actual` is not strictly equal to `expected`.
13. **assert.throws(fn, error, message)**: Expects the function `fn` to throw an error. Optionally, you can pass an `error` constructor or validation function to check the specific type of error.
14. **assert.doesNotThrow(fn, error, message)**: Expects `fn` not to throw an error. Throws an error if the function throws one.

#### Examples

```js
const assert = require('assert');

// Example 1: Basic assert
assert(5 > 1, '5 is greater than 1');  // Passes, no error

// Example 2: assert.deepEqual
const obj1 = { a: 1 };
const obj2 = { a: 1 };
assert.deepEqual(obj1, obj2, 'Objects should be deeply equal');

// Example 3: assert.throws
assert.throws(
  () => {
    throw new Error('wrong value');
  },
  Error,
  'An error should be thrown'
);
```

#### Use Cases

- Testing and debugging.
- Validation of input in small scripts or test environments.

The `assert` module is part of the Node.js core, so you don't need to install anything to use it.

**Next:** Type **next** to move to the second module, `async_hooks`.

```md
nodejs-assert-module.md
```

**Timestamp**: 2024-10-14 10:30:00  
**Description**: Overview of the Node.js `assert` module, including available methods and usage.  
**Length**: 33 lines, 1,953 characters.  
