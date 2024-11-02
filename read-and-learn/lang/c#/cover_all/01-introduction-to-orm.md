### **Chapter 1: Introduction to ORM**

---

**Definition of Object-Relational Mapping (ORM)**

Object-Relational Mapping (ORM) is a programming technique that enables developers to interact with databases using object-oriented programming (OOP) paradigms. Instead of writing SQL queries manually to retrieve or manipulate data, ORM frameworks allow developers to map database tables to C# classes and interact with the database via objects. This abstraction simplifies data access and helps bridge the gap between the relational world of databases and the object-oriented world of modern programming languages.

In ORM:
- Tables become classes.
- Columns become properties of those classes.
- Rows of the table become instances of the class.

ORM frameworks handle converting C# objects to database records and vice versa, which is often referred to as "mapping."

**Benefits of Using ORM in Applications**

The use of ORM provides several advantages:

1. **Productivity**: Developers no longer need to write boilerplate SQL code. The ORM handles database interactions, reducing the need for repetitive tasks like writing SQL queries.
   
2. **Maintainability**: With ORM, you write code that directly interacts with entities. Changes in the database structure or the object model are often easier to manage than if you had raw SQL queries scattered throughout your application.

3. **Security**: ORM frameworks provide built-in protection against SQL injection by parameterizing SQL queries automatically.

4. **Abstraction**: ORMs abstract the database layer, allowing developers to focus on business logic rather than database access logic. This abstraction also enables code that is more aligned with object-oriented practices, making it easier to reason about and maintain.

5. **Cross-Database Compatibility**: With ORM frameworks, switching from one database provider to another (e.g., from SQL Server to PostgreSQL) is often simpler. The ORM manages provider-specific SQL differences, allowing the code to remain mostly unchanged.

---

**Overview of Entity Framework Core**

**Entity Framework Core (EF Core)** is a modern, lightweight, and open-source ORM framework developed by Microsoft for the .NET platform. It provides a high-level API for working with relational databases using C# objects. EF Core is the evolution of the original Entity Framework, redesigned to work with the .NET Core ecosystem and modern-day programming practices.

Some key features of EF Core include:

- **Cross-Platform**: Works on Windows, macOS, and Linux.
- **Extensibility**: Easily extensible to support different database providers like SQL Server, PostgreSQL, MySQL, and SQLite.
- **LINQ Support**: Developers can use Language-Integrated Query (LINQ) to query databases in a strongly typed, C#-like syntax.
- **Migration Support**: EF Core provides migration tools that help keep your database schema in sync with your application models as they evolve over time.

---

### Code Example: Introduction to ORM with Entity Framework Core

Let's start with a small demonstration of how EF Core simplifies database interactions.

**Step 1: Define an Entity (C# Class)**
```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
}
```

In this class, the `Product` class represents a table in the database. The properties correspond to the columns in the table.

- **Id**: Primary key column.
- **Name**: A string representing the product's name.
- **Price**: A decimal representing the price of the product.
- **StockQuantity**: An integer representing the stock available for the product.

**Step 2: Define the DbContext (Data Access Layer)**
```csharp
public class ApplicationDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("YourConnectionStringHere");
    }
}
```

- **DbSet<Product>**: Represents the `Products` table in the database, where the `Product` class defines the schema.
- **OnConfiguring**: Configures the database connection, in this case, using SQL Server.

EF Core takes care of generating the SQL commands necessary to create the `Products` table and interact with it (insert, update, delete, query).

**Step 3: Performing CRUD Operations (High-Level ORM Overview)**

Here's a verbose example showcasing basic CRUD operations using EF Core:

```csharp
using (var context = new ApplicationDbContext())
{
    // Create a new product
    var newProduct = new Product
    {
        Name = "Laptop",
        Price = 1200.00m,
        StockQuantity = 50
    };
    context.Products.Add(newProduct);
    context.SaveChanges();

    // Read all products
    var products = context.Products.ToList();
    foreach (var product in products)
    {
        Console.WriteLine($"ID: {product.Id}, Name: {product.Name}, Price: {product.Price}");
    }

    // Update a product
    var productToUpdate = context.Products.First(p => p.Id == newProduct.Id);
    productToUpdate.StockQuantity += 20; // Increase stock
    context.SaveChanges();

    // Delete a product
    var productToDelete = context.Products.First(p => p.Id == newProduct.Id);
    context.Products.Remove(productToDelete);
    context.SaveChanges();
}
```

In the example above, notice how EF Core handles everything from table creation to data manipulation without the need to write raw SQL:

1. **Create**: A new product entity is created and saved to the database.
2. **Read**: All products are retrieved from the database and printed.
3. **Update**: The stock quantity of a product is updated.
4. **Delete**: A product is deleted from the database.

Key Structure:
- **DbSet<T>**: This represents the table in the database. EF Core automatically translates operations on the DbSet into SQL queries.
- **SaveChanges()**: Persists all changes made in the context (additions, updates, or deletions) to the database.
  
---

This chapter lays the foundation for understanding how EF Core abstracts database access, providing an ORM solution to simplify and optimize data management. In the next chapter, we'll dive deeper into setting up EF Core in a project and configuring it for real-world usage.

---

```bash
nvim 01-introduction-to-orm.md
```

**Timestamp**: 2024-10-23 12:34:00  
**Summary**: Detailed introduction to ORM and Entity Framework Core (EF Core) with basic code examples for CRUD operations.  
**Lines**: 74  
**Characters**: 6,162  
