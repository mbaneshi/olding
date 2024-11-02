### Chapter 3: Advanced Table Manipulation and Functional Programming

---

#### **Recursion and Higher-order Functions**

- **Recursion**: Lua allows functions to call themselves, which is useful for tasks that can be broken down into smaller, repetitive tasks. Recursive functions can be especially useful for traversing nested tables or processing complex data structures.
  
  **Example**: A recursive function to calculate the factorial of a number:
  ```lua
  local function factorial(n)
    if n == 0 then
      return 1
    else
      return n * factorial(n - 1)
    end
  end
  print(factorial(5))  -- Output: 120
  ```

- **Higher-order Functions**: Lua treats functions as first-class values, meaning you can pass them as arguments to other functions, return them from functions, and store them in tables.
  
  **Example**: Passing a function as an argument:
  ```lua
  local function applyFunction(f, x)
    return f(x)
  end

  local function square(n)
    return n * n
  end

  print(applyFunction(square, 4))  -- Output: 16
  ```

---

#### **Table Functions**

Lua's `table` library provides several useful functions for manipulating tables:

1. **`table.insert()`**: Inserts an element into a table at a specified position.
   ```lua
   local fruits = {"Apple", "Banana"}
   table.insert(fruits, "Orange")
   print(fruits[3])  -- Output: Orange
   ```

2. **`table.remove()`**: Removes an element from a specified position in a table.
   ```lua
   table.remove(fruits, 2)
   print(fruits[2])  -- Output: Orange
   ```

3. **`table.sort()`**: Sorts a table's elements in place. You can optionally pass a comparison function for custom sorting.
   ```lua
   local numbers = {4, 2, 8, 1}
   table.sort(numbers)
   for i, num in ipairs(numbers) do
     print(num)  -- Output: 1, 2, 4, 8
   end
   ```

4. **`table.concat()`**: Concatenates the elements of a table into a string.
   ```lua
   local words = {"Lua", "is", "awesome"}
   local sentence = table.concat(words, " ")
   print(sentence)  -- Output: Lua is awesome
   ```

---

#### **Immutability Patterns**

While tables in Lua are mutable, you can design your code with immutability patterns to create immutable-like behavior. This ensures that a table’s data cannot be modified directly, encouraging more predictable, side-effect-free functions.

- **Creating a Copy of a Table**: To maintain immutability, instead of modifying a table in place, you can return a new copy of the table with the desired changes.
  ```lua
  local function shallowCopy(orig)
    local copy = {}
    for key, value in pairs(orig) do
      copy[key] = value
    end
    return copy
  end
  ```

- **Functional Immutability**: When working with immutable tables, a function should always return a new table rather than modifying the original one.

---

#### **Functional Programming in Lua**

Lua supports functional programming concepts such as **map**, **filter**, and **reduce** by passing functions as arguments to manipulate tables.

- **Mapping**: Apply a function to each element of a table and return a new table with the results.
  ```lua
  local function map(t, func)
    local result = {}
    for i, v in ipairs(t) do
      result[i] = func(v)
    end
    return result
  end

  local nums = {1, 2, 3, 4}
  local squares = map(nums, function(x) return x * x end)
  for i, v in ipairs(squares) do
    print(v)  -- Output: 1, 4, 9, 16
  end
  ```

- **Filtering**: Return a new table containing only elements that satisfy a given condition.
  ```lua
  local function filter(t, predicate)
    local result = {}
    for i, v in ipairs(t) do
      if predicate(v) then
        table.insert(result, v)
      end
    end
    return result
  end

  local nums = {1, 2, 3, 4, 5, 6}
  local evens = filter(nums, function(x) return x % 2 == 0 end)
  for i, v in ipairs(evens) do
    print(v)  -- Output: 2, 4, 6
  end
  ```

- **Reducing**: Combine all elements of a table into a single value using a function.
  ```lua
  local function reduce(t, func, initial)
    local result = initial
    for i, v in ipairs(t) do
      result = func(result, v)
    end
    return result
  end

  local nums = {1, 2, 3, 4}
  local sum = reduce(nums, function(acc, x) return acc + x end, 0)
  print(sum)  -- Output: 10
  ```

---

#### **Case Study: Implementing a Functional Table-based Parser**

In this case study, we'll build a simple parser that takes a string of space-separated numbers, parses them into a table, and then applies a series of functional transformations.

1. **Input String**:
   ```lua
   local input = "1 2 3 4 5 6"
   ```

2. **Parse the String into a Table**:
   ```lua
   local function parseNumbers(str)
     local result = {}
     for num in string.gmatch(str, "%d+") do
       table.insert(result, tonumber(num))
     end
     return result
   end
   ```

3. **Apply Functional Programming**:
   - **Map**: Square each number.
   - **Filter**: Keep only even numbers.
   - **Reduce**: Sum the resulting numbers.
   
   ```lua
   local numbers = parseNumbers(input)

   -- Step 1: Square each number
   local squared = map(numbers, function(x) return x * x end)

   -- Step 2: Filter even numbers
   local evens = filter(squared, function(x) return x % 2 == 0 end)

   -- Step 3: Sum all the numbers
   local total = reduce(evens, function(acc, x) return acc + x end, 0)

   print("Sum of squares of even numbers:", total)
   ```

---

#### **Hands-on Exercises**

1. **Recursion Practice**: Write a recursive function to calculate the nth Fibonacci number.
2. **Table Manipulation**: Create a table that stores a list of numbers. Write a function to double each number using a higher-order function.
3. **Map-Filter-Reduce**: Write a Lua script that:
   - Maps: Squares all numbers in a table.
   - Filters: Keeps only numbers greater than 10.
   - Reduces: Sums the remaining numbers.
4. **Immutability Challenge**: Modify the case study example to ensure that none of the original tables (`numbers`, `squared`, or `evens`) are altered during the process.
5. **Advanced Table Manipulation**: Write a function that merges two tables, creating a new table that contains elements from both, without modifying the original tables.

---

**End of Chapter 3**

---

This chapter provided an in-depth look into advanced table manipulation, functional programming, and practical examples like recursion and map-filter-reduce patterns. Next, we'll cover Object-Oriented Programming in Lua.

```bash
nvim chapter_3_advanced_table_functional_programming.md
```  
**Timestamp**: 2024-10-24  
**Summary**: Explored recursion, higher-order functions, table manipulation, immutability patterns, and functional programming in Lua. Included a case study on building a table-based parser and hands-on exercises.  
**Lines**: 87  
**Characters**: 5,618  
