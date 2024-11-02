### **Chapter 2: Getting Started with EF Core**

---

**Setting up EF Core in a C# Project**

To start using Entity Framework Core in a project, you need to set up the appropriate dependencies and configure EF Core to interact with your chosen database provider. This chapter covers the initial setup and basic configurations required for a C# project using EF Core.

---

**Step 1: Install EF Core and Database Providers**

The first step is to add the necessary NuGet packages to your project. You need the core EF package as well as the specific database provider you are using.

For example, if you are using SQL Server, you would install the following packages via the .NET CLI:

```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

If you're using a different database like PostgreSQL or SQLite, install the corresponding provider package:

- For **PostgreSQL**:  
  ```bash
  dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
  ```

- For **SQLite**:  
  ```bash
  dotnet add package Microsoft.EntityFrameworkCore.Sqlite
  ```

These packages provide the essential components and functionality to interact with the database of your choice.

---

**Step 2: Configure the EF Core Context**

Now that you have EF Core installed, the next step is to configure the `DbContext`. The `DbContext` represents the session with the database and is responsible for querying and saving data.

**Basic Configuration:**
1. Create a class that derives from `DbContext`.
2. Override the `OnConfiguring` method to define the database connection.
3. Define `DbSet<T>` properties for each entity.

Example:

```csharp
public class ApplicationDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=.;Database=EFCoreDemo;Trusted_Connection=True;");
    }
}
```

Here:
- The `Products` property represents the `Products` table in the database.
- `UseSqlServer` configures the database connection string for SQL Server. If you're using another provider like PostgreSQL, you would replace this with the corresponding provider method, e.g., `UseNpgsql` for PostgreSQL.

**Connection Strings:**
- The connection string in EF Core tells your application how to connect to the database. In the example above, the connection string is passed directly to the `UseSqlServer` method, but in real-world applications, it is better to store it in a configuration file, like `appsettings.json`.

Example of `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=EFCoreDemo;Trusted_Connection=True;"
  }
}
```

To use this connection string, modify the `DbContext` configuration:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    var connectionString = Configuration.GetConnectionString("DefaultConnection");
    optionsBuilder.UseSqlServer(connectionString);
}
```

This approach improves maintainability by keeping sensitive configuration details separate from the codebase.

---

**Step 3: Initialize the Database**

After configuring EF Core and your `DbContext`, the next step is to ensure that the database exists and is properly initialized with the required tables.

**EnsureCreated()**  
In development, you can use the `EnsureCreated()` method to create the database if it doesn't exist. This is a quick way to initialize your database for prototyping, but it doesn't handle more complex database updates (like migrations).

```csharp
using (var context = new ApplicationDbContext())
{
    context.Database.EnsureCreated();
}
```

**Example: Creating a Simple Database with EF Core**

Let's tie everything together and create a simple console application that initializes a database with a `Products` table.

```csharp
class Program
{
    static void Main(string[] args)
    {
        using (var context = new ApplicationDbContext())
        {
            context.Database.EnsureCreated();

            // Add a product to the database
            var product = new Product
            {
                Name = "Smartphone",
                Price = 499.99m,
                StockQuantity = 100
            };

            context.Products.Add(product);
            context.SaveChanges();

            // Fetch and display products from the database
            var products = context.Products.ToList();
            foreach (var p in products)
            {
                Console.WriteLine($"ID: {p.Id}, Name: {p.Name}, Price: {p.Price}");
            }
        }
    }
}
```

In this example:
- The `EnsureCreated()` method ensures the database is created if it doesn't exist.
- A new `Product` entity is added to the database.
- The products are fetched from the database and printed to the console.

---

**Key Concepts Covered:**

1. **DbContext**: Represents the session with the database, encapsulating database operations like querying and saving.
2. **DbSet<T>**: Represents a collection (table) of entities (rows) of a specific type (`T`).
3. **Connection Strings**: Connection strings provide the information needed for EF Core to connect to the database. They are best managed through configuration files such as `appsettings.json`.
4. **EnsureCreated**: A method to quickly set up the database during the development phase. For production systems, migrations (discussed in Chapter 5) are preferred for managing database schema changes.

---

**Common Errors During Setup:**
- **Connection string issues**: Ensure the connection string is accurate and matches your database provider.
- **Missing packages**: Make sure you have installed both the EF Core base package and the corresponding database provider package.

---

This chapter guides you through setting up and configuring Entity Framework Core in a .NET project, allowing you to start interacting with the database using your models. In the next chapter, we will explore how to define models and set up relationships between entities.

---

```bash
nvim 02-getting-started-with-ef-core.md
```

**Timestamp**: 2024-10-23 13:05:00  
**Summary**: Setup guide for Entity Framework Core in a C# project, including installation, DbContext configuration, and database initialization.  
**Lines**: 74  
**Characters**: 6,316  
