### **Chapter 4: CRUD Operations with EF Core**

---

CRUD (Create, Read, Update, Delete) operations are the foundation of any database-driven application. Entity Framework Core (EF Core) provides a clean, straightforward way to perform these operations while leveraging the power of LINQ for querying data.

In this chapter, we’ll cover:
- Performing basic CRUD operations.
- Using LINQ to query the database.
- Handling transactions and concurrency control.

---

#### **Creating Data (Insert Operation)**

To insert a new record into the database, you use the `Add()` or `AddRange()` method in combination with the `SaveChanges()` method. `Add()` inserts a single entity, while `AddRange()` can be used for bulk insertion of multiple entities.

**Example: Creating a New Product**

```csharp
public class ProductService
{
    private readonly ApplicationDbContext _context;

    public ProductService(ApplicationDbContext context)
    {
        _context = context;
    }

    public void AddProduct(string name, decimal price, int stockQuantity, int categoryId)
    {
        var product = new Product
        {
            Name = name,
            Price = price,
            StockQuantity = stockQuantity,
            CategoryId = categoryId
        };

        _context.Products.Add(product);
        _context.SaveChanges();  // Persists the data to the database
    }
}
```

Key Points:
- `Add()` adds the entity to the context’s tracking list.
- `SaveChanges()` sends an `INSERT` SQL command to the database.

---

#### **Reading Data (Select Operation)**

EF Core provides several ways to retrieve data from the database. You can use LINQ to perform complex queries, and the `Find()`, `FirstOrDefault()`, `SingleOrDefault()`, and `ToList()` methods are commonly used for querying entities.

**Example: Querying Products by Category**

```csharp
public List<Product> GetProductsByCategory(int categoryId)
{
    return _context.Products
        .Where(p => p.CategoryId == categoryId)
        .ToList();  // Executes the query and returns the result as a list
}
```

Key Points:
- LINQ is used to filter the products based on the `CategoryId`.
- `ToList()` executes the query and retrieves all matching products as a list.

**Reading a Single Record by Primary Key**

```csharp
public Product GetProductById(int id)
{
    return _context.Products.Find(id);  // Uses the primary key to find a record
}
```

The `Find()` method is optimized for querying by primary key and is one of the most efficient ways to retrieve a single entity.

---

#### **Updating Data (Update Operation)**

To update a record, you first retrieve the entity, modify its properties, and then call `SaveChanges()` to persist the changes. EF Core tracks changes to the entity, and when `SaveChanges()` is called, it generates an `UPDATE` SQL command for the modified fields.

**Example: Updating a Product's Price**

```csharp
public void UpdateProductPrice(int productId, decimal newPrice)
{
    var product = _context.Products.Find(productId);
    if (product != null)
    {
        product.Price = newPrice;
        _context.SaveChanges();  // Persist the updated price
    }
}
```

Key Points:
- EF Core tracks the changes made to the `product` object.
- `SaveChanges()` generates the appropriate SQL `UPDATE` statement.

---

#### **Deleting Data (Delete Operation)**

To delete an entity, you retrieve it from the database and call the `Remove()` method. Like the `Add()` and `Update()` methods, `Remove()` only marks the entity for deletion. The deletion is finalized when `SaveChanges()` is called.

**Example: Deleting a Product**

```csharp
public void DeleteProduct(int productId)
{
    var product = _context.Products.Find(productId);
    if (product != null)
    {
        _context.Products.Remove(product);
        _context.SaveChanges();  // Executes the delete operation
    }
}
```

Key Points:
- `Remove()` marks the entity for deletion.
- `SaveChanges()` sends a `DELETE` SQL command to the database.

---

#### **Using LINQ with EF Core**

LINQ (Language Integrated Query) is a powerful query language in .NET that allows you to write SQL-like queries against your entities. EF Core translates LINQ queries into SQL queries, which are executed against the database.

**Example: Fetching Products with a Price Filter**

```csharp
public List<Product> GetProductsUnderPrice(decimal price)
{
    return _context.Products
        .Where(p => p.Price < price)
        .OrderBy(p => p.Price)
        .ToList();
}
```

In this example:
- `Where()` filters the products based on the condition `p.Price < price`.
- `OrderBy()` sorts the results by price in ascending order.

You can also use more complex LINQ queries, including joins, groupings, and projections.

---

#### **Handling Transactions**

By default, EF Core handles transactions automatically when you call `SaveChanges()`. However, you can manually control transactions when necessary, particularly when performing multiple operations that must either all succeed or all fail.

**Example: Using a Transaction Scope**

```csharp
using (var transaction = _context.Database.BeginTransaction())
{
    try
    {
        var product = new Product { Name = "Laptop", Price = 1000, StockQuantity = 10 };
        _context.Products.Add(product);
        _context.SaveChanges();  // Save first entity

        var category = new Category { Name = "Electronics" };
        _context.Categories.Add(category);
        _context.SaveChanges();  // Save second entity

        transaction.Commit();  // Commit the transaction if both operations succeed
    }
    catch (Exception)
    {
        transaction.Rollback();  // Rollback the transaction on failure
    }
}
```

In this example:
- `BeginTransaction()` starts a transaction.
- Multiple operations are executed within the transaction.
- `Commit()` is called to save the changes only if all operations are successful.
- `Rollback()` is used to revert changes in case of an error.

---

#### **Concurrency Control**

Concurrency issues can arise when multiple users or processes try to update the same data at the same time. EF Core provides **optimistic concurrency control** to handle such situations.

You can use a **Concurrency Token** to detect conflicting updates. For example, adding a `RowVersion` property as a concurrency token.

**Example: Adding Concurrency Token**

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public byte[] RowVersion { get; set; }  // Concurrency token
}

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Product>()
        .Property(p => p.RowVersion)
        .IsRowVersion();  // Configure RowVersion as a concurrency token
}
```

If two users try to update the same record, EF Core will throw a `DbUpdateConcurrencyException` if the `RowVersion` in the database doesn’t match the one on the entity. You can handle this exception and implement custom logic to resolve the conflict.

---

#### **Verbose Code Example: CRUD Operations with EF Core**

```csharp
public class ProductService
{
    private readonly ApplicationDbContext _context;

    public ProductService(ApplicationDbContext context)
    {
        _context = context;
    }

    // Create a new product
    public void AddProduct(string name, decimal price, int stockQuantity, int categoryId)
    {
        var product = new Product
        {
            Name = name,
            Price = price,
            StockQuantity = stockQuantity,
            CategoryId = categoryId
        };
        _context.Products.Add(product);
        _context.SaveChanges();
    }

    // Read products by category
    public List<Product> GetProductsByCategory(int categoryId)
    {
        return _context.Products
            .Where(p => p.CategoryId == categoryId)
            .ToList();
    }

    // Update product price
    public void UpdateProductPrice(int productId, decimal newPrice)
    {
        var product = _context.Products.Find(productId);
        if (product != null)
        {
            product.Price = newPrice;
            _context.SaveChanges();
        }
    }

    // Delete a product
    public void DeleteProduct(int productId)
    {
        var product = _context.Products.Find(productId);
        if (product != null)
        {
            _context.Products.Remove(product);
            _context.SaveChanges();
        }
    }
}
```

---

**Summary of Key Concepts:**
1. **Create**: Use `Add()` to add new entities and call `SaveChanges()` to persist them.
2. **Read**: Use LINQ queries to retrieve data from the database, with methods like `Where()`, `Find()`, and `ToList()`.
3. **Update**: Retrieve the entity, modify its properties, and call `SaveChanges()` to apply updates.
4. **Delete**: Use `Remove()` to mark entities for deletion, and call `SaveChanges()` to finalize the operation.
5. **Transactions**: Manually handle transactions when multiple operations must succeed or fail together.
6. **Concurrency Control**: Use concurrency tokens like `RowVersion` to handle conflicting updates.

---

```bash
nvim 04-crud-operations-with-ef-core.md
```

**Timestamp**: 2024-10-23 14:13:00  
**Summary**: Comprehensive coverage of CRUD operations using EF Core, including LINQ queries, transaction handling, and concurrency control with code examples.  
**Lines**

: 129  
**Characters**: 10255
