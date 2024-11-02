**Timestamp:** 2023-10-23  
**Short Description:** Elaboration of "Best Practices" from the advanced C# book outline, covering clean code principles, SOLID, DI, error handling, performance optimization, and unit testing.  
**Response Size:** 86 lines, 6853 characters  

```bash
nvim csharp_advanced_features_chapter_3_best_practices.md
```

---

### Chapter 3: **Best Practices**

---

#### 3.1 Clean Code Principles in C#

Writing clean code is essential for building maintainable, scalable, and understandable software. Following well-established coding practices makes it easier for others (and your future self) to read, maintain, and extend code. Key principles to follow when writing C# include:

---

##### **3.1.1 Meaningful Names**

Names should describe the purpose of variables, methods, and classes clearly and concisely. Use descriptive names that convey intent without requiring extra comments.

- **Bad Example:**

  ```csharp
  var d = DateTime.Now;
  ```

- **Good Example:**

  ```csharp
  var currentDateTime = DateTime.Now;
  ```

---

##### **3.1.2 Keep Methods Small and Focused**

Each method should do **one thing** and one thing only. If a method grows too large or performs multiple actions, it becomes difficult to understand, test, and maintain.

- **Bad Example:**

  ```csharp
  public void ProcessOrder(Order order)
  {
      ValidateOrder(order);
      SaveOrderToDatabase(order);
      SendConfirmationEmail(order);
  }
  ```

- **Good Example:**

  ```csharp
  public void ProcessOrder(Order order)
  {
      ValidateOrder(order);
      SaveOrder(order);
      NotifyCustomer(order);
  }

  private void ValidateOrder(Order order) { /* ... */ }
  private void SaveOrder(Order order) { /* ... */ }
  private void NotifyCustomer(Order order) { /* ... */ }
  ```

---

##### **3.1.3 Avoid Code Duplication**

Duplicate code increases the likelihood of bugs and maintenance difficulties. Reuse code through methods, classes, and inheritance.

- **Bad Example:**

  ```csharp
  public void PrintUserDetails(User user)
  {
      Console.WriteLine(user.Name);
      Console.WriteLine(user.Email);
  }

  public void PrintAdminDetails(Admin admin)
  {
      Console.WriteLine(admin.Name);
      Console.WriteLine(admin.Email);
  }
  ```

- **Good Example:**

  ```csharp
  public void PrintDetails(IPerson person)
  {
      Console.WriteLine(person.Name);
      Console.WriteLine(person.Email);
  }
  ```

---

#### 3.2 SOLID Principles with C# Examples

The **SOLID** principles are a set of five design principles that help ensure code is easier to maintain, extend, and refactor.

---

##### **3.2.1 Single Responsibility Principle (SRP)**

A class should have **one and only one reason to change**, meaning it should have only one responsibility or job.

- **Bad Example:**

  ```csharp
  public class UserManager
  {
      public void CreateUser(User user)
      {
          // User creation logic
      }

      public void SendEmail(User user)
      {
          // Email sending logic
      }
  }
  ```

- **Good Example:**

  ```csharp
  public class UserManager
  {
      public void CreateUser(User user)
      {
          // User creation logic
      }
  }

  public class EmailService
  {
      public void SendEmail(User user)
      {
          // Email sending logic
      }
  }
  ```

---

##### **3.2.2 Open/Closed Principle (OCP)**

Software entities (classes, methods, etc.) should be **open for extension, but closed for modification**. This can often be achieved through inheritance or interfaces.

- **Bad Example:**

  ```csharp
  public class DiscountService
  {
      public double GetDiscount(Product product)
      {
          if (product.Category == "Electronics")
              return 10;
          return 5;
      }
  }
  ```

- **Good Example:**

  ```csharp
  public abstract class Discount
  {
      public abstract double GetDiscount();
  }

  public class ElectronicsDiscount : Discount
  {
      public override double GetDiscount() => 10;
  }

  public class ClothingDiscount : Discount
  {
      public override double GetDiscount() => 5;
  }
  ```

---

##### **3.2.3 Liskov Substitution Principle (LSP)**

Objects of a derived class should be able to **replace objects of the base class** without affecting the functionality of the program. 

- **Bad Example:**

  ```csharp
  public class Bird
  {
      public virtual void Fly() { }
  }

  public class Penguin : Bird
  {
      public override void Fly()
      {
          throw new Exception("Penguins can't fly");
      }
  }
  ```

- **Good Example:**

  ```csharp
  public abstract class Bird
  {
      public abstract void Move();
  }

  public class Penguin : Bird
  {
      public override void Move()
      {
          // Penguins swim, so implement swimming behavior
      }
  }
  ```

---

##### **3.2.4 Interface Segregation Principle (ISP)**

Clients should not be forced to depend on interfaces they do not use. Instead of one large interface, split it into smaller, more specific interfaces.

- **Bad Example:**

  ```csharp
  public interface IWorker
  {
      void Work();
      void Eat();
  }
  ```

- **Good Example:**

  ```csharp
  public interface IWorkable
  {
      void Work();
  }

  public interface IFeedable
  {
      void Eat();
  }
  ```

---

##### **3.2.5 Dependency Inversion Principle (DIP)**

High-level modules should not depend on low-level modules; both should depend on abstractions.

- **Bad Example:**

  ```csharp
  public class Database
  {
      public void SaveData() { }
  }

  public class DataAccess
  {
      private Database _database = new Database();
      
      public void Save() 
      {
          _database.SaveData();
      }
  }
  ```

- **Good Example:**

  ```csharp
  public interface IDatabase
  {
      void SaveData();
  }

  public class Database : IDatabase
  {
      public void SaveData() { }
  }

  public class DataAccess
  {
      private readonly IDatabase _database;
      
      public DataAccess(IDatabase database)
      {
          _database = database;
      }

      public void Save()
      {
          _database.SaveData();
      }
  }
  ```

---

#### 3.3 Dependency Injection: Patterns and Best Practices

**Dependency Injection (DI)** is a technique where the creation of dependencies is delegated to external sources (like a DI container) rather than hardcoded within the class. This enables better testability, modularity, and maintainability.

---

##### **3.3.1 Constructor Injection**

The most common form of DI in C# is **constructor injection**. Dependencies are passed to the class through its constructor.

```csharp
public class OrderService
{
    private readonly IEmailService _emailService;

    public OrderService(IEmailService emailService)
    {
        _emailService = emailService;
    }

    public void ProcessOrder(Order order)
    {
        // Business logic
        _emailService.SendOrderConfirmation(order);
    }
}
```

---

##### **3.3.2 Property Injection**

In **property injection**, dependencies are set via public properties instead of the constructor.

```csharp
public class OrderService
{
    public IEmailService EmailService { get; set; }

    public void ProcessOrder(Order order)
    {
        EmailService.SendOrderConfirmation(order);
    }
}
```

---

#### 3.4 Error Handling and Exceptions

Handling exceptions properly ensures that your application is resilient and can recover from unexpected states. Key practices include:

- **Use specific exception types** (`ArgumentNullException`, `InvalidOperationException`, etc.).
- **Avoid swallowing exceptions** without proper logging or handling.
- **Catch exceptions at appropriate levels** and handle them as close to the source as possible.

```csharp
try
{
    var result = SomeRiskyOperation();
}
catch (ArgumentNullException ex)
{
    Console.WriteLine("An argument was null: " + ex.Message);
}
catch (Exception ex)
{
    Console.WriteLine("An error occurred: " + ex.Message);
}
```

---

#### 3.5 Code Performance Optimization Tips

Optimizing code for performance can involve several techniques, from algorithmic improvements to memory management. Some strategies include:

- **Minimizing allocations**: Use `Span<T>` and `Memory<T>` where possible to avoid heap allocations.
- **Reducing boxing/unboxing**: Avoid boxing value types by keeping types consistent.
- **Avoiding premature optimization**: Profile your application first to identify real bottlenecks before optimizing.

---

#### 3.6 Unit Testing and Test-Driven Development (TDD)

Unit testing is crucial to ensure your code works as expected. **Test-Driven Development (TDD)** follows a cycle where tests are written before code is implemented, ensuring that all code is covered by tests.

---

##### **3.6.1 Writing Unit Tests in C#**

A typical unit test in C# using **xUnit** or **NUnit** looks like this:

```csharp
public class CalculatorTests
{
    [Fact]
    public void Add_ShouldReturn

Sum_WhenValidInputs()
    {
        var calculator = new Calculator();
        var result = calculator.Add(2, 3);
        
        Assert.Equal(5, result);
    }
}
```

---

This chapter covered key best practices to follow when developing in C#. In the next chapter, we will explore **Design Patterns in C#**, which help provide common solutions to recurring problems.
