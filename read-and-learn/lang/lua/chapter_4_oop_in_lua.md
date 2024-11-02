### Chapter 4: Object-Oriented Programming in Lua

---

#### **OOP Basics in Lua**

Unlike languages with built-in support for object-oriented programming (OOP), Lua does not have a formal class system. However, Lua’s tables and metatables provide a flexible mechanism for implementing OOP paradigms such as **encapsulation**, **inheritance**, and **polymorphism**.

- **Tables as Objects**: Lua’s tables are versatile enough to represent objects, and functions can be stored in tables to represent methods.
  
  **Example**: A simple object-like structure in Lua:
  ```lua
  local person = {
    name = "John",
    age = 30
  }

  function person:speak()
    print("Hello, my name is " .. self.name)
  end

  person:speak()  -- Output: Hello, my name is John
  ```

In the example above, `person` is a table representing an object, and `speak` is its method. The colon (`:`) syntax is used to implicitly pass the table (`self`) to the method.

---

#### **Inheritance and Encapsulation**

Lua supports inheritance through the use of **metatables**. You can define a “class” by setting a metatable on a table and using the `__index` metamethod to delegate lookups to another table (acting as a base class).

- **Creating a Base Class**:
  ```lua
  local Animal = {}

  function Animal:new(name)
    local newObj = {name = name}
    self.__index = self
    return setmetatable(newObj, self)
  end

  function Animal:speak()
    print(self.name .. " makes a sound.")
  end
  ```

- **Inheritance with Metatables**:
  We can define a subclass, **Dog**, that inherits from **Animal**.
  ```lua
  local Dog = Animal:new()

  function Dog:speak()
    print(self.name .. " barks.")
  end
  ```

- **Instantiating Objects**:
  ```lua
  local myDog = Dog:new("Buddy")
  myDog:speak()  -- Output: Buddy barks.
  ```

In this example, `Dog` inherits from `Animal`. The `__index` metamethod ensures that if `Dog` does not have a method like `speak`, it will look it up in the `Animal` table.

---

#### **Encapsulation**

Encapsulation involves hiding the internal state of an object and only allowing access through its methods. In Lua, encapsulation can be achieved by defining local variables and exposing access to them only through methods.

**Example**: Encapsulating internal state:
```lua
local Counter = {}

function Counter:new()
  local newObj = {count = 0}
  self.__index = self
  return setmetatable(newObj, self)
end

function Counter:increment()
  self.count = self.count + 1
end

function Counter:getCount()
  return self.count
end

local myCounter = Counter:new()
myCounter:increment()
print(myCounter:getCount())  -- Output: 1
```

Here, the `count` property is encapsulated within the `Counter` object, and the only way to modify it is through the `increment` method.

---

#### **Polymorphism**

Polymorphism allows methods to be overridden in subclasses. Lua achieves this through inheritance and method overriding.

- **Example**: Continuing with the **Animal** and **Dog** example:
  ```lua
  local Cat = Animal:new()

  function Cat:speak()
    print(self.name .. " meows.")
  end

  local myCat = Cat:new("Whiskers")
  myCat:speak()  -- Output: Whiskers meows.
  ```

In this example, both `Dog` and `Cat` override the `speak` method from the `Animal` class, demonstrating polymorphism.

---

#### **Prototype-based Inheritance**

Lua uses a **prototype-based inheritance** system, where objects inherit directly from other objects rather than from classes. This is more dynamic than class-based inheritance and is a common approach in languages like JavaScript.

- **Prototype-based inheritance using metatables**:
  ```lua
  local prototype = {value = 0}

  function prototype:new(o)
    o = o or {}
    setmetatable(o, self)
    self.__index = self
    return o
  end

  function prototype:increment()
    self.value = self.value + 1
  end

  local instance1 = prototype:new()
  instance1:increment()
  print(instance1.value)  -- Output: 1

  local instance2 = prototype:new()
  print(instance2.value)  -- Output: 0
  ```

Each object created using the `prototype:new()` method has its own independent state, but they share the same methods defined in the prototype.

---

#### **Project: Create a Simple Class System**

In this project, we will implement a simple class system with basic features like class creation, inheritance, and method overriding.

1. **Class Definition**:
   ```lua
   local function class()
     local newClass = {}
     newClass.__index = newClass

     function newClass:new(o)
       o = o or {}
       setmetatable(o, self)
       return o
     end

     return newClass
   end
   ```

2. **Defining a Base Class**:
   ```lua
   local Vehicle = class()

   function Vehicle:new(name, speed)
     local newObj = {name = name, speed = speed}
     return self.super.new(self, newObj)
   end

   function Vehicle:move()
     print(self.name .. " is moving at " .. self.speed .. " mph.")
   end
   ```

3. **Inheritance**:
   ```lua
   local Car = class()
   Car.super = Vehicle

   function Car:new(name, speed, fuel)
     local newObj = Car.super.new(self, name, speed)
     newObj.fuel = fuel
     return newObj
   end

   function Car:refuel()
     print("Refueling " .. self.name .. ".")
   end
   ```

4. **Testing the Class System**:
   ```lua
   local myCar = Car:new("Tesla", 120, "Electric")
   myCar:move()  -- Output: Tesla is moving at 120 mph.
   myCar:refuel()  -- Output: Refueling Tesla.
   ```

---

#### **Hands-on Exercises**

1. **Basic OOP**: Implement a simple `Shape` class with properties like `width` and `height`. Create subclasses like `Rectangle` and `Circle` and implement a `calculateArea` method for each.

2. **Encapsulation**: Create a `BankAccount` class that has private fields for `balance`. Implement methods for `deposit` and `withdraw`, ensuring the balance cannot be accessed directly.

3. **Polymorphism**: Define a base class `Vehicle` with a method `move()`. Create two subclasses `Car` and `Boat`, each overriding the `move()` method to print appropriate messages (e.g., “driving” vs “sailing”).

4. **Prototype-based Inheritance**: Write a script that demonstrates prototype-based inheritance by creating objects that inherit behavior from a prototype object and share common methods.

---

**End of Chapter 4**

---

In this chapter, we explored object-oriented programming in Lua, focusing on creating objects, encapsulation, inheritance, and polymorphism using tables and metatables. We also implemented a simple class system to bring these concepts together. The next chapter will dive into **metatables, metamethods, and coroutines**.

```bash
nvim chapter_4_oop_in_lua.md
```  
**Timestamp**: 2024-10-24  
**Summary**: Covered object-oriented programming (OOP) in Lua, including encapsulation, inheritance, polymorphism, prototype-based inheritance, and project exercises to reinforce the concepts.  
**Lines**: 92  
**Characters**: 5,713  
