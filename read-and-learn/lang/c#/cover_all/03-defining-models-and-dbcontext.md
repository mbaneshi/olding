### **Chapter 3: Defining Models and DbContext**

---

In this chapter, we will dive deeper into defining entity models and configuring relationships between them. EF Core uses the concept of **models** to represent database tables and relationships in object-oriented form. The **DbContext** serves as the bridge between these models and the database, managing querying, saving, and other database operations.

---

**Creating Entity Classes (Models)**

Each entity in your application corresponds to a table in the database, and each property of the entity represents a column in that table.

**Basic Entity Definition:**

```csharp
public class Product
{
    public int Id { get; set; }  // Primary key
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
}
```

In this example:
- `Id` is defined as the primary key (by convention, EF Core automatically treats properties named `Id` or `ClassNameId` as the primary key).
- `Name`, `Price`, and `StockQuantity` are simple columns in the `Products` table.

**Data Annotations for Configuration:**

Data annotations can be used to customize how EF Core maps the properties of an entity to database columns.

```csharp
public class Product
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    [Range(0.01, 9999.99)]
    public decimal Price { get; set; }

    [Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }
}
```

- `[Required]`: Ensures the `Name` property is not nullable.
- `[MaxLength(100)]`: Sets a maximum length of 100 characters for the `Name`.
- `[Range]`: Restricts the values allowed for `Price` and `StockQuantity`.

---

**Understanding DbContext and Its Role**

The `DbContext` is central to working with EF Core. It manages the database connection, tracks changes to entities, and allows you to query and save data.

Here’s a basic example:

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

- **DbSet<Product>**: Represents the `Products` table in the database.
- **OnConfiguring**: Configures the context to use SQL Server, but you can swap it for another provider (PostgreSQL, MySQL, etc.).

### Key Methods in DbContext:
- **SaveChanges()**: Saves all changes made to the entities being tracked.
- **Add()**, **Update()**, **Remove()**: Methods used to add, update, or delete entities.
- **Find()**, **FirstOrDefault()**, **ToList()**: Query methods to retrieve data from the database.

---

**Configuring Model Relationships**

Real-world applications involve multiple entities that are related to each other. EF Core allows you to define these relationships using **navigational properties** and **foreign keys**.

**One-to-Many Relationship:**

In a one-to-many relationship, one record in the first entity relates to many records in the second entity. For example, a `Category` can have multiple `Products`.

```csharp
public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<Product> Products { get; set; }
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int CategoryId { get; set; }  // Foreign key
    public Category Category { get; set; }  // Navigation property
}
```

In this example:
- `Category` has a collection of `Products` (`ICollection<Product>`).
- `Product` includes a foreign key (`CategoryId`) and a navigation property (`Category`) to relate back to `Category`.

EF Core automatically recognizes the relationship and sets up the necessary foreign key constraints in the database.

---

**Many-to-Many Relationship:**

Many-to-many relationships in EF Core require an intermediate entity (join table) that connects the two related entities.

For example, a `Product` can be associated with multiple `Tags`, and each `Tag` can be associated with multiple `Products`.

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<ProductTag> ProductTags { get; set; }
}

public class Tag
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<ProductTag> ProductTags { get; set; }
}

public class ProductTag  // Join table
{
    public int ProductId { get; set; }
    public Product Product { get; set; }

    public int TagId { get; set; }
    public Tag Tag { get; set; }
}
```

Here, `ProductTag` is the intermediate entity that holds the foreign keys from both `Product` and `Tag`. EF Core will automatically create the join table with appropriate foreign key constraints.

---

**Fluent API for Model Configuration**

Sometimes, using data annotations is not sufficient or flexible enough to handle more complex mappings. In such cases, EF Core provides the Fluent API for model configuration.

For instance, if you want to configure a one-to-one relationship between two entities using the Fluent API:

```csharp
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public CustomerDetails CustomerDetails { get; set; }
}

public class CustomerDetails
{
    public int Id { get; set; }
    public string Address { get; set; }
    public Customer Customer { get; set; }
}

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Customer>()
        .HasOne(c => c.CustomerDetails)
        .WithOne(cd => cd.Customer)
        .HasForeignKey<CustomerDetails>(cd => cd.Id);
}
```

- `HasOne()`: Specifies the navigation property on the primary entity.
- `WithOne()`: Specifies the navigation property on the related entity.
- `HasForeignKey()`: Configures the foreign key for the relationship.

---

**Summary of Key Concepts:**
1. **Entity Class**: Represents a table in the database, with properties that represent the columns.
2. **DbContext**: Acts as a bridge between your application code and the database. It tracks entities and allows CRUD operations.
3. **One-to-Many Relationship**: One entity (like `Category`) is related to multiple other entities (like `Products`).
4. **Many-to-Many Relationship**: Involves a join table that connects two entities (like `Product` and `Tag`).
5. **Fluent API**: Offers fine-grained control over model relationships and configurations.

---

**Verbose Code Example: Defining Models and DbContext**

Here's a comprehensive example that defines multiple entities and demonstrates how to configure relationships.

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int CategoryId { get; set; }  // Foreign key
    public Category Category { get; set; }  // Navigation property
    public ICollection<ProductTag> ProductTags { get; set; }  // Many-to-Many relationship
}

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<Product> Products { get; set; }  // One-to-Many relationship
}

public class Tag
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<ProductTag> ProductTags { get; set; }  // Many-to-Many relationship
}

public class ProductTag
{
    public int ProductId { get; set; }
    public Product Product { get; set; }

    public int TagId { get; set; }
    public Tag Tag { get; set; }
}

public class ApplicationDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<ProductTag> ProductTags { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ProductTag>()
            .HasKey(pt => new { pt.ProductId, pt.TagId });  // Composite primary key
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("YourConnectionStringHere");
    }
}
```

---

This chapter shows how to define models and configure relationships using EF Core, allowing your application to map its entities to relational database tables. In the next chapter, we'll explore how to perform CRUD operations using these models.

---

```bash
nvim 03-defining-models-and-dbcontext.md
```

**Timestamp**: 2024-10-23 13:32:00  
**Summary**: Detailed explanation of defining models and configuring relationships in Entity Framework Core, with code examples covering one-to-many and many-to-many relationships.  
**Lines**: 94  
**Characters**: 8,366  
