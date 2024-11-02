### **Chapter 6: Advanced EF Core Features**

---

As you grow more comfortable with Entity Framework Core (EF Core), you'll encounter scenarios where you'll need to leverage its more advanced capabilities to improve performance, flexibility, and efficiency in managing complex data models. This chapter delves into advanced EF Core features such as loading related data, custom queries, performance tuning, and more.

In this chapter, we will cover:
- Lazy loading vs. eager loading and how to optimize performance.
- Implementing custom queries and stored procedures.
- Performance tuning and best practices for efficient data operations.

---

#### **Lazy Loading vs. Eager Loading**

When working with relationships in EF Core, such as one-to-many or many-to-many, you have different strategies to load related entities: lazy loading, eager loading, and explicit loading. These strategies have trade-offs in terms of performance, memory usage, and code complexity.

---

##### **Eager Loading**

Eager loading loads related entities as part of the initial query. This is useful when you know in advance that you'll need to access related data, and you want to retrieve it all in a single round-trip to the database.

**Eager Loading Example:**

```csharp
var products = context.Products
    .Include(p => p.Category)
    .ToList();
```

In this example, when retrieving `Products`, EF Core will also load the related `Category` data in a single database query. The `Include()` method is used to specify which related data should be loaded.

**Use Cases:**
- Use eager loading when you need to access related entities frequently and want to avoid multiple database trips.

---

##### **Lazy Loading**

Lazy loading defers the loading of related entities until they are accessed for the first time. EF Core only fetches the related data when you explicitly access it, which can improve performance if the related data is not always needed.

To enable lazy loading, you need to install the `Microsoft.EntityFrameworkCore.Proxies` package and configure your `DbContext` to use lazy loading proxies:

```bash
dotnet add package Microsoft.EntityFrameworkCore.Proxies
```

```csharp
public class ApplicationDbContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder
            .UseLazyLoadingProxies()
            .UseSqlServer("YourConnectionString");
    }
}
```

Once enabled, you can mark your navigation properties as `virtual` to allow lazy loading:

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public virtual Category Category { get; set; }  // Lazy loading
}
```

**Lazy Loading Example:**

```csharp
var product = context.Products.Find(1);
var categoryName = product.Category.Name;  // Related data loaded when accessed
```

**Drawbacks of Lazy Loading:**
- Can lead to the "N+1 query problem," where each entity access results in a new database query.
- May degrade performance if not managed carefully.

---

##### **Explicit Loading**

Explicit loading allows you to control when and how related data is loaded, giving you more fine-grained control over database queries. This can be helpful when lazy loading is not enabled, but you still want to load related entities dynamically.

**Explicit Loading Example:**

```csharp
var product = context.Products.Find(1);

// Explicitly load the related category
context.Entry(product).Reference(p => p.Category).Load();
```

Explicit loading uses the `Reference()` or `Collection()` methods to load related entities explicitly when needed.

---

#### **Implementing Custom Queries and Stored Procedures**

In some cases, EF Core's default behavior for querying data may not be sufficient, especially when dealing with complex queries or stored procedures. Fortunately, EF Core provides several ways to execute custom queries and stored procedures while still benefiting from EF Core's change tracking and mapping features.

---

##### **Raw SQL Queries**

EF Core allows you to run raw SQL queries when you need more control over the SQL being executed. You can use the `FromSqlRaw()` or `FromSqlInterpolated()` methods to run raw SQL queries and map the results to entity types.

**Raw SQL Query Example:**

```csharp
var products = context.Products
    .FromSqlRaw("SELECT * FROM Products WHERE Price > {0}", 100)
    .ToList();
```

In this example, the query retrieves all products with a price greater than 100 using raw SQL.

**Important Notes:**
- Be cautious of SQL injection risks when using raw SQL queries.
- EF Core tracks the results of raw SQL queries just like LINQ queries.

---

##### **Stored Procedures**

EF Core also allows you to execute stored procedures. While EF Core doesn't directly map stored procedure results to entities by default, you can use raw SQL queries to call the stored procedures and map the results manually.

**Executing a Stored Procedure:**

```csharp
var products = context.Products
    .FromSqlRaw("EXEC GetProductsByCategory @p0", categoryId)
    .ToList();
```

This query calls a stored procedure named `GetProductsByCategory` and passes the `categoryId` as a parameter. The results are then mapped to the `Products` entity.

---

#### **Performance Tuning and Best Practices**

Performance is critical when working with databases, especially in high-traffic applications. EF Core provides several ways to optimize performance by reducing the number of database queries, improving caching, and minimizing unnecessary data transfers.

---

##### **1. Minimize Database Queries**

One of the most common performance issues in EF Core is executing too many database queries, especially in cases involving lazy loading. You can reduce the number of queries by:
- Using eager loading to load related data in a single query.
- Using `Select()` to load only the data you need.

**Example: Selecting Only Necessary Fields**

```csharp
var productNames = context.Products
    .Select(p => p.Name)
    .ToList();
```

This query retrieves only the `Name` field from the `Products` table, minimizing the amount of data transferred from the database.

---

##### **2. Use AsNoTracking for Read-Only Queries**

EF Core's change tracking mechanism can slow down performance, especially when querying large datasets. For read-only operations, you can disable change tracking by using the `AsNoTracking()` method.

**Example: Read-Only Query with AsNoTracking**

```csharp
var products = context.Products
    .AsNoTracking()
    .ToList();
```

By using `AsNoTracking()`, EF Core does not track changes to the retrieved entities, improving performance for read-only queries.

---

##### **3. Caching Query Results**

In certain scenarios, you can improve performance by caching frequently accessed data. While EF Core doesn't provide a built-in caching mechanism, you can use third-party libraries like `MemoryCache` or `Redis` to cache query results and reduce the load on your database.

**Example: Using In-Memory Caching for Frequently Accessed Data**

```csharp
var cacheKey = "all_products";
var products = _cache.GetOrCreate(cacheKey, entry =>
{
    entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);
    return context.Products.ToList();
});
```

In this example, frequently accessed products are cached in memory for 10 minutes, reducing the need to repeatedly query the database.

---

##### **4. Optimize Database Indexes**

Ensuring that your database has the correct indexes can drastically improve query performance. While EF Core can automatically generate some indexes, you can define additional indexes using the `Index()` method in your entity configurations.

**Example: Defining a Custom Index**

```csharp
modelBuilder.Entity<Product>()
    .HasIndex(p => p.Name)
    .HasDatabaseName("IX_ProductName");
```

This query creates an index on the `Name` column of the `Products` table, optimizing queries that filter or sort by the `Name` field.

---

##### **5. Batch Operations**

Instead of performing database operations one entity at a time, you can use bulk operations or batch updates to improve performance.

**Example: Batch Update**

```csharp
context.Products
    .Where(p => p.StockQuantity == 0)
    .ToList()
    .ForEach(p => p.StockQuantity = 100);

context.SaveChanges();
```

This code first retrieves all products with zero stock and then updates their stock quantity in a single batch, reducing the number of database round-trips.

---

#### **Summary of Key Concepts:**
1. **Lazy Loading vs. Eager Loading**: Choose the right loading strategy based on your application needs to optimize performance.
2. **Custom Queries**: Use raw SQL or stored procedures when EF Core's default behavior is insufficient for complex queries.
3. **Performance Tuning**: Minimize queries, use `AsNoTracking()` for read-only queries, and leverage caching and indexes to improve performance.
4. **Batch Operations**: Perform operations in batches to reduce database round-trips and improve efficiency.

---

```bash
nvim 06-advanced-ef-core-features.md
```

**Timestamp**: 2024-10-23 15:02:00  
**Summary**: Chapter on advanced EF Core features, including lazy and eager loading, custom queries, performance tuning, and best practices. Detailed examples and strategies for optimizing EF Core operations.  
**Lines**: 122  
**Characters**: 10255
