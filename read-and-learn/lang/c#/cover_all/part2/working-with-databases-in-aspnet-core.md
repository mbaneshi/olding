### **Chapter 10: Working with Databases in ASP.NET Core**

In this chapter, we’ll dive deep into how ASP.NET Core interacts with databases using Entity Framework Core (EF Core). We’ll cover best practices for integrating databases, managing database operations through repositories and unit of work patterns, and ensuring robust data validation and error handling in your web applications.

---

#### **1. Integrating EF Core with ASP.NET Core**
Entity Framework Core (EF Core) is the default ORM (Object-Relational Mapper) used in ASP.NET Core for database interactions. EF Core simplifies database access by allowing developers to work with strongly typed classes rather than writing raw SQL.

##### **1.1. Setting Up EF Core in ASP.NET Core**
To get started with EF Core in an ASP.NET Core project, follow these steps:
1. Install the necessary EF Core NuGet packages:
   ```bash
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   dotnet add package Microsoft.EntityFrameworkCore.Design
   ```

2. In your `Startup.cs` (ASP.NET Core 5.x or below) or `Program.cs` (ASP.NET Core 6.x and above), configure EF Core in the `ConfigureServices` method:
   ```csharp
   public class Startup
   {
       public void ConfigureServices(IServiceCollection services)
       {
           services.AddDbContext<ApplicationDbContext>(options =>
               options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
       }
   }
   ```
   - Replace `"DefaultConnection"` with your connection string defined in the `appsettings.json` file:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=MyDatabase;Trusted_Connection=True;"
     }
   }
   ```

3. Define your `DbContext`:
   ```csharp
   public class ApplicationDbContext : DbContext
   {
       public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
           : base(options)
       {
       }

       public DbSet<Product> Products { get; set; }
   }
   ```

4. Create your entity model:
   ```csharp
   public class Product
   {
       public int Id { get; set; }
       public string Name { get; set; }
       public decimal Price { get; set; }
   }
   ```

##### **1.2. Running Migrations**
Once EF Core is configured, use migrations to apply changes to the database schema:
1. Create a migration:
   ```bash
   dotnet ef migrations add InitialCreate
   ```

2. Update the database:
   ```bash
   dotnet ef database update
   ```

---

#### **2. Using Repositories and Unit of Work Patterns**
The **repository pattern** and **unit of work pattern** are design patterns used to abstract the data access logic and provide a clean separation of concerns.

##### **2.1. Repository Pattern**
The repository pattern acts as an intermediary between your application's business logic and the data layer, ensuring cleaner, more maintainable code.

1. Create a repository interface:
   ```csharp
   public interface IProductRepository
   {
       Task<IEnumerable<Product>> GetAllAsync();
       Task<Product> GetByIdAsync(int id);
       Task AddAsync(Product product);
       Task UpdateAsync(Product product);
       Task DeleteAsync(int id);
   }
   ```

2. Implement the repository:
   ```csharp
   public class ProductRepository : IProductRepository
   {
       private readonly ApplicationDbContext _context;

       public ProductRepository(ApplicationDbContext context)
       {
           _context = context;
       }

       public async Task<IEnumerable<Product>> GetAllAsync()
       {
           return await _context.Products.ToListAsync();
       }

       public async Task<Product> GetByIdAsync(int id)
       {
           return await _context.Products.FindAsync(id);
       }

       public async Task AddAsync(Product product)
       {
           await _context.Products.AddAsync(product);
           await _context.SaveChangesAsync();
       }

       public async Task UpdateAsync(Product product)
       {
           _context.Products.Update(product);
           await _context.SaveChangesAsync();
       }

       public async Task DeleteAsync(int id)
       {
           var product = await _context.Products.FindAsync(id);
           if (product != null)
           {
               _context.Products.Remove(product);
               await _context.SaveChangesAsync();
           }
       }
   }
   ```

##### **2.2. Unit of Work Pattern**
The unit of work pattern ensures that multiple operations affecting different entities are treated as a single transaction, providing consistency when saving changes.

1. Create the unit of work interface:
   ```csharp
   public interface IUnitOfWork : IDisposable
   {
       IProductRepository Products { get; }
       Task<int> CompleteAsync();
   }
   ```

2. Implement the unit of work:
   ```csharp
   public class UnitOfWork : IUnitOfWork
   {
       private readonly ApplicationDbContext _context;
       public IProductRepository Products { get; private set; }

       public UnitOfWork(ApplicationDbContext context)
       {
           _context = context;
           Products = new ProductRepository(_context);
       }

       public async Task<int> CompleteAsync()
       {
           return await _context.SaveChangesAsync();
       }

       public void Dispose()
       {
           _context.Dispose();
       }
   }
   ```

---

#### **3. Implementing Data Validation and Error Handling**
Data validation ensures that the data entering your system meets certain rules. ASP.NET Core provides several ways to implement validation, from using annotations to custom validation logic.

##### **3.1. Data Annotations**
1. Add validation attributes to your models:
   ```csharp
   public class Product
   {
       public int Id { get; set; }

       [Required]
       [StringLength(100, MinimumLength = 3)]
       public string Name { get; set; }

       [Range(0.01, 9999.99)]
       public decimal Price { get; set; }
   }
   ```

2. In your controller, check if the model is valid:
   ```csharp
   [HttpPost]
   public async Task<IActionResult> Create(Product product)
   {
       if (ModelState.IsValid)
       {
           await _unitOfWork.Products.AddAsync(product);
           return RedirectToAction(nameof(Index));
       }
       return View(product);
   }
   ```

##### **3.2. Handling Errors**
Use global exception handling to catch errors at a central point:
1. In `Startup.cs` (ASP.NET Core 5.x) or `Program.cs` (ASP.NET Core 6.x), add middleware for handling errors:
   ```csharp
   public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
   {
       if (env.IsDevelopment())
       {
           app.UseDeveloperExceptionPage();
       }
       else
       {
           app.UseExceptionHandler("/Home/Error");
       }

       app.UseStatusCodePagesWithReExecute("/Home/Error", "?code={0}");
   }
   ```

2. Implement error pages and logging as needed.

---

### **Summary**
In this chapter, we covered:
- Integrating EF Core with ASP.NET Core, setting up the database, and running migrations.
- Applying the repository and unit of work patterns to abstract data access logic.
- Implementing data validation and error handling mechanisms to ensure reliable application behavior.

---

```bash
nvim working-with-databases-in-aspnet-core.md
```

Timestamp: 2024-10-23  
Lines: 94  
Characters: 7,667
