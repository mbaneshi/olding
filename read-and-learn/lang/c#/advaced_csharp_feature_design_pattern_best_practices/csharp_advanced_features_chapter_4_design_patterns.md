**Timestamp:** 2023-10-23  
**Short Description:** Detailed explanation of "Design Patterns in C#", covering Creational, Structural, and Behavioral design patterns with practical C# examples.  
**Response Size:** 93 lines, 7407 characters  

```bash
nvim csharp_advanced_features_chapter_4_design_patterns.md
```

---

### Chapter 4: **Design Patterns in C#**

Design patterns are tried-and-true solutions to common problems in software design. They provide a shared language for developers to communicate design decisions and enhance maintainability. There are three main types of design patterns: **Creational**, **Structural**, and **Behavioral**.

---

#### 4.1 Creational Design Patterns

Creational patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.

---

##### **4.1.1 Singleton Pattern**

The **Singleton** pattern ensures a class has only one instance and provides a global point of access to it. This is useful when exactly one object is needed, like a configuration manager or logging service.

- **Example:**

  ```csharp
  public class Singleton
  {
      private static Singleton _instance;
      private static readonly object _lock = new object();

      private Singleton() { }

      public static Singleton Instance
      {
          get
          {
              lock (_lock)
              {
                  if (_instance == null)
                      _instance = new Singleton();
                  return _instance;
              }
          }
      }

      public void Log(string message)
      {
          Console.WriteLine(message);
      }
  }
  ```

  Usage:

  ```csharp
  Singleton.Instance.Log("Application started");
  ```

---

##### **4.1.2 Factory Method Pattern**

The **Factory Method** pattern provides an interface for creating objects, allowing subclasses to alter the type of objects created.

- **Example:**

  ```csharp
  public abstract class Creator
  {
      public abstract IProduct FactoryMethod();

      public string SomeOperation()
      {
          var product = FactoryMethod();
          return product.Operation();
      }
  }

  public class ConcreteCreatorA : Creator
  {
      public override IProduct FactoryMethod() => new ConcreteProductA();
  }

  public class ConcreteCreatorB : Creator
  {
      public override IProduct FactoryMethod() => new ConcreteProductB();
  }

  public interface IProduct
  {
      string Operation();
  }

  public class ConcreteProductA : IProduct
  {
      public string Operation() => "Result of ConcreteProductA";
  }

  public class ConcreteProductB : IProduct
  {
      public string Operation() => "Result of ConcreteProductB";
  }
  ```

  Usage:

  ```csharp
  Creator creator = new ConcreteCreatorA();
  Console.WriteLine(creator.SomeOperation());
  ```

---

##### **4.1.3 Abstract Factory Pattern**

The **Abstract Factory** pattern is used to create families of related or dependent objects without specifying their concrete classes.

- **Example:**

  ```csharp
  public interface IButton
  {
      void Paint();
  }

  public interface ICheckbox
  {
      void Paint();
  }

  public class WinButton : IButton
  {
      public void Paint() => Console.WriteLine("Windows Button");
  }

  public class MacButton : IButton
  {
      public void Paint() => Console.WriteLine("Mac Button");
  }

  public class WinCheckbox : ICheckbox
  {
      public void Paint() => Console.WriteLine("Windows Checkbox");
  }

  public class MacCheckbox : ICheckbox
  {
      public void Paint() => Console.WriteLine("Mac Checkbox");
  }

  public interface IGUIFactory
  {
      IButton CreateButton();
      ICheckbox CreateCheckbox();
  }

  public class WinFactory : IGUIFactory
  {
      public IButton CreateButton() => new WinButton();
      public ICheckbox CreateCheckbox() => new WinCheckbox();
  }

  public class MacFactory : IGUIFactory
  {
      public IButton CreateButton() => new MacButton();
      public ICheckbox CreateCheckbox() => new MacCheckbox();
  }
  ```

  Usage:

  ```csharp
  IGUIFactory factory = new WinFactory();
  IButton button = factory.CreateButton();
  button.Paint();
  ```

---

#### 4.2 Structural Design Patterns

Structural patterns focus on composing classes and objects to form larger structures while keeping the structure flexible and efficient.

---

##### **4.2.1 Adapter Pattern**

The **Adapter** pattern allows incompatible interfaces to work together. It acts as a bridge between two interfaces that otherwise couldn’t work together.

- **Example:**

  ```csharp
  public interface ITarget
  {
      string GetRequest();
  }

  public class Adaptee
  {
      public string GetSpecificRequest() => "Specific request";
  }

  public class Adapter : ITarget
  {
      private readonly Adaptee _adaptee;

      public Adapter(Adaptee adaptee)
      {
          _adaptee = adaptee;
      }

      public string GetRequest() => _adaptee.GetSpecificRequest();
  }
  ```

  Usage:

  ```csharp
  Adaptee adaptee = new Adaptee();
  ITarget target = new Adapter(adaptee);
  Console.WriteLine(target.GetRequest());
  ```

---

##### **4.2.2 Facade Pattern**

The **Facade** pattern provides a simplified interface to a complex subsystem. It reduces dependencies between clients and subsystems by hiding the complexity behind a simple interface.

- **Example:**

  ```csharp
  public class SubsystemA
  {
      public void OperationA() => Console.WriteLine("Subsystem A Operation");
  }

  public class SubsystemB
  {
      public void OperationB() => Console.WriteLine("Subsystem B Operation");
  }

  public class Facade
  {
      private readonly SubsystemA _subsystemA;
      private readonly SubsystemB _subsystemB;

      public Facade()
      {
          _subsystemA = new SubsystemA();
          _subsystemB = new SubsystemB();
      }

      public void Operation()
      {
          _subsystemA.OperationA();
          _subsystemB.OperationB();
      }
  }
  ```

  Usage:

  ```csharp
  var facade = new Facade();
  facade.Operation();
  ```

---

#### 4.3 Behavioral Design Patterns

Behavioral patterns deal with communication between objects and how they work together.

---

##### **4.3.1 Observer Pattern**

The **Observer** pattern defines a one-to-many relationship between objects so that when one object changes state, all of its dependents are notified and updated automatically.

- **Example:**

  ```csharp
  public interface IObserver
  {
      void Update(string message);
  }

  public interface ISubject
  {
      void Attach(IObserver observer);
      void Detach(IObserver observer);
      void Notify();
  }

  public class ConcreteSubject : ISubject
  {
      private List<IObserver> _observers = new List<IObserver>();
      private string _state;

      public string State
      {
          get => _state;
          set
          {
              _state = value;
              Notify();
          }
      }

      public void Attach(IObserver observer) => _observers.Add(observer);
      public void Detach(IObserver observer) => _observers.Remove(observer);
      public void Notify()
      {
          foreach (var observer in _observers)
          {
              observer.Update(_state);
          }
      }
  }

  public class ConcreteObserver : IObserver
  {
      private string _name;

      public ConcreteObserver(string name) => _name = name;

      public void Update(string message)
      {
          Console.WriteLine($"{_name} received update: {message}");
      }
  }
  ```

  Usage:

  ```csharp
  var subject = new ConcreteSubject();
  var observer1 = new ConcreteObserver("Observer 1");
  var observer2 = new ConcreteObserver("Observer 2");

  subject.Attach(observer1);
  subject.Attach(observer2);

  subject.State = "New state";
  ```

---

##### **4.3.2 Strategy Pattern**

The **Strategy** pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. This allows the algorithm to vary independently from clients that use it.

- **Example:**

  ```csharp
  public interface IStrategy
  {
      void Execute();
  }

  public class ConcreteStrategyA : IStrategy
  {
      public void Execute() => Console.WriteLine("Strategy A");
  }

  public class ConcreteStrategyB : IStrategy
  {
      public void Execute() => Console.WriteLine("Strategy B");
  }

  public class Context
  {
      private IStrategy _strategy;

      public Context(IStrategy strategy)
      {
          _strategy = strategy;
      }

      public void SetStrategy(IStrategy strategy)
      {
          _strategy = strategy;
      }

      public void ExecuteStrategy() => _strategy.Execute();
  }
  ```

  Usage:

  ```csharp
  var context = new Context(new ConcreteStrategyA());
  context.ExecuteStrategy(); // Output: Strategy A

  context.SetStrategy(new ConcreteStrategyB());
  context.ExecuteStrategy(); // Output: Strategy B
  ```

---

This chapter provided an in-depth look at the most commonly used design patterns in C#. In the next chapter, we will dive into **Performance and Optimization** strategies in C# applications.
