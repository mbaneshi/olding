### List of Available Design Patterns in Computer Science

Design patterns are typical solutions to common problems in software design. Here’s a breakdown of widely recognized patterns:

#### **1. Creational Design Patterns**  
Creational patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.

- **Singleton**: Ensures that a class has only one instance and provides a global point of access to it.
- **Factory Method**: Defines an interface for creating an object, but lets subclasses alter the type of objects that will be created.
- **Abstract Factory**: Provides an interface for creating families of related or dependent objects without specifying their concrete classes.
- **Builder**: Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.
- **Prototype**: Creates new objects by copying an existing object, known as a prototype.

#### **2. Structural Design Patterns**  
Structural patterns focus on how objects and classes are composed to form larger structures.

- **Adapter**: Allows objects with incompatible interfaces to work together by wrapping an incompatible object.
- **Bridge**: Separates an object’s abstraction from its implementation so that the two can vary independently.
- **Composite**: Composes objects into tree-like structures to represent part-whole hierarchies. Clients can treat individual objects and compositions of objects uniformly.
- **Decorator**: Adds behavior or responsibilities to objects dynamically without altering their code.
- **Facade**: Provides a simplified interface to a complex subsystem.
- **Flyweight**: Reduces the cost of creating and managing a large number of similar objects by sharing objects.
- **Proxy**: Provides a surrogate or placeholder for another object to control access to it.

#### **3. Behavioral Design Patterns**  
Behavioral patterns are concerned with communication between objects.

- **Chain of Responsibility**: Passes requests along a chain of handlers until an object handles the request.
- **Command**: Encapsulates a request as an object, thereby allowing for parameterization of clients with queues, requests, and operations.
- **Interpreter**: Defines a grammatical representation for a language and provides an interpreter to deal with this grammar.
- **Iterator**: Provides a way to access elements of a collection object sequentially without exposing its underlying representation.
- **Mediator**: Defines an object that encapsulates how a set of objects interact, promoting loose coupling by preventing direct object-to-object interaction.
- **Memento**: Captures and externalizes an object’s internal state so that it can be restored later without violating encapsulation.
- **Observer**: Defines a dependency between objects such that when one object changes state, all its dependents are notified and updated automatically.
- **State**: Allows an object to alter its behavior when its internal state changes, appearing to change its class.
- **Strategy**: Defines a family of algorithms, encapsulates each one, and makes them interchangeable.
- **Template Method**: Defines the skeleton of an algorithm in a method, deferring some steps to subclasses.
- **Visitor**: Separates an algorithm from an object structure by moving the hierarchy of methods into one object.

#### **4. Concurrency Design Patterns**  
Concurrency patterns deal with multi-threaded programming and processes interacting across threads.

- **Active Object**: Decouples method execution from method invocation for objects that each reside in their own thread of control.
- **Executor**: Provides a higher-level replacement for managing and controlling thread execution, decoupling task submission from task execution.
- **Monitor Object**: Controls access to an object by multiple threads, ensuring that only one thread can access the object at a time.
- **Thread Pool**: Manages a pool of worker threads to limit the number of threads running at a given time and improve resource utilization.
- **Reactor**: Handles service requests delivered concurrently to a service handler by dispatching them to appropriate handlers.

#### **5. Architectural Patterns**  
Architectural patterns focus on the overall organization of the system and its components.

- **MVC (Model-View-Controller)**: Divides an application into three interconnected components (Model, View, and Controller) to separate internal representations of information from the ways that information is presented and accepted.
- **Microservices**: Breaks down a system into a set of small, independently deployable services.
- **Event-Driven**: Promotes the production, detection, consumption, and reaction to events.
- **Layered**: Organizes the system into layers, with each layer providing services to the layer above it.
- **Client-Server**: Defines two types of nodes in a network: servers providing resources and services, and clients requesting them.

### Conclusion
These design patterns offer a proven approach to solving frequent design challenges in computer science, aiding in building scalable, maintainable, and flexible systems.

---

**Timestamp**: 2024-10-14 10:32:00  
**Description**: Provided a categorized list of design patterns in computer science.  
**Length**: 63 lines, 4,366 characters  

```design-patterns-list.md```
