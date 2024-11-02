### Chapter 2: Exploring Data Structures and the Lua Standard Library

---

#### **Tables: The Cornerstone of Lua's Data Structure**

- **Tables** are the most important data structure in Lua. They can be used as arrays, dictionaries (hashmaps), sets, and even objects.
  
- **Defining a Table**:
  - Tables in Lua are created using curly braces `{}` and can store data of any type.
  - Example of an empty table:
    ```lua
    local myTable = {}
    ```

- **Tables as Arrays**:
  - Arrays are simply tables where keys are sequential integers.
  - Example:
    ```lua
    local fruits = {"Apple", "Banana", "Orange"}
    print(fruits[1])  -- Output: Apple
    ```
  
- **Tables as Dictionaries (key-value pairs)**:
  - Tables can also act as dictionaries, where the keys are not necessarily numbers but can be strings or other types.
  - Example:
    ```lua
    local person = {
      name = "John",
      age = 30
    }
    print(person["name"])  -- Output: John
    print(person.age)  -- Output: 30
    ```

- **Iterating over Tables**:
  - Lua provides `pairs()` and `ipairs()` to iterate over tables.
    - `ipairs()` iterates over numerical indices.
    - `pairs()` iterates over all key-value pairs (unordered).
  - Example:
    ```lua
    local myTable = {a = 1, b = 2, c = 3}
    for key, value in pairs(myTable) do
      print(key, value)
    end
    ```

---

#### **Working with Strings**

- Lua has a powerful set of string manipulation functions. Strings in Lua are immutable, meaning once created, their contents cannot be changed.

- **Common String Functions**:
  - `string.find(str, pattern)`: Searches for a pattern in a string.
  - `string.sub(str, start, end)`: Extracts a substring.
  - `string.format(format, ...):` Similar to printf in C.
  - Example:
    ```lua
    local s = "Hello, World!"
    print(string.sub(s, 1, 5))  -- Output: Hello
    print(string.find(s, "World"))  -- Output: 8 (start index)
    ```

- **String Concatenation**:
  - Use `..` to concatenate strings.
  - Example:
    ```lua
    local name = "Lua"
    print("Hello, " .. name .. "!")
    ```

---

#### **Mathematical Functions**

- Lua provides a set of standard mathematical functions.
  
- **Common Functions**:
  - `math.abs(x)`: Absolute value.
  - `math.sqrt(x)`: Square root.
  - `math.max(x, y)`: Maximum of two numbers.
  - `math.random()`: Generates a random number.
  - Example:
    ```lua
    print(math.sqrt(16))  -- Output: 4
    print(math.max(3, 7))  -- Output: 7
    ```

---

#### **I/O and Filesystem Operations**

- Lua provides basic functions for interacting with the file system, including reading from and writing to files.

- **Reading from a File**:
  ```lua
  local file = io.open("example.txt", "r")
  local content = file:read("*all")  -- Read the entire file
  print(content)
  file:close()
  ```

- **Writing to a File**:
  ```lua
  local file = io.open("output.txt", "w")
  file:write("Hello, Lua!")
  file:close()
  ```

- **Common I/O Functions**:
  - `io.read()`: Reads input from standard input.
  - `io.write()`: Writes output to standard output or a file.
  - `io.open(filename, mode)`: Opens a file in read, write, or append mode.

---

#### **Hands-on Exercises**

1. **Table Operations**: Create a table that stores the names of five fruits. Write a script that prints the name of each fruit using a `for` loop.

2. **String Manipulation**: Write a Lua script that takes a sentence as input and:
   - Converts it to uppercase.
   - Finds the position of the word "Lua".
   - Extracts the first five characters.

3. **Math Functions**: Create a Lua script that generates ten random numbers between 1 and 100. Use Lua’s math functions to find and print the minimum and maximum values.

4. **File Handling**: Write a Lua script that reads a text file, converts the content to uppercase, and writes it to a new file.

---

**End of Chapter 2**

---

We’ve covered Lua’s tables, strings, math functions, and I/O in this chapter, along with exercises for hands-on practice. In the next chapter, we’ll dive deeper into advanced table manipulation and functional programming in Lua.

```bash
nvim chapter_2_lua_data_structures_standard_library.md
```  
**Timestamp**: 2024-10-24  
**Summary**: Covered Chapter 2 with Lua’s tables, strings, math functions, I/O, and exercises for hands-on practice.  
**Lines**: 72  
**Characters**: 4,013  
