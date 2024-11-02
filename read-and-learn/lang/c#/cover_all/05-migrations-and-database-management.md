### **Chapter 5: Migrations and Database Management**

---

Migrations are a vital feature of Entity Framework Core (EF Core) that help you evolve your database schema as your application grows. Instead of manually modifying your database structure, migrations allow you to define changes in your C# code and then apply them to the database automatically. This ensures consistency between your data models and the database.

In this chapter, we’ll cover:
- What migrations are and why they are essential.
- Creating and applying migrations.
- Managing database schema changes in production.

---

#### **What are Migrations?**

A migration in EF Core represents a set of changes to the database schema. These changes can be adding or removing tables, changing columns, or modifying constraints. Migrations are stored as C# classes, which describe the required transformations.

The migration process typically involves:
1. Modifying your model classes (entities).
2. Creating a migration to capture these changes.
3. Applying the migration to update the database schema.

---

#### **Creating Your First Migration**

To create a migration, you first need to have the `Microsoft.EntityFrameworkCore.Tools` package installed. This package enables the `dotnet ef` CLI commands for managing migrations.

**Steps to Create a Migration:**

1. Modify your model (if needed).
2. Run the following command to create a migration:

```bash
dotnet ef migrations add InitialCreate
```

This command generates a migration file in the `Migrations` folder. The migration file contains two key methods:
- `Up()`: Defines the changes to be applied to the database.
- `Down()`: Defines how to revert the changes if needed (for rollback).

**Example: Initial Migration File**

```csharp
public partial class InitialCreate : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Products",
            columns: table => new
            {
                Id = table.Column<int>(nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                Name = table.Column<string>(maxLength: 100, nullable: false),
                Price = table.Column<decimal>(nullable: false),
                StockQuantity = table.Column<int>(nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Products", x => x.Id);
            });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            name: "Products");
    }
}
```

In the `Up()` method, the migration adds a new `Products` table, with columns for `Id`, `Name`, `Price`, and `StockQuantity`. The `Down()` method defines how to drop the `Products` table if the migration is rolled back.

---

#### **Applying Migrations to the Database**

Once you’ve created a migration, the next step is to apply it to your database. This can be done using the `dotnet ef` CLI tool.

**Apply the migration using this command:**

```bash
dotnet ef database update
```

This command executes the `Up()` method of all pending migrations and updates the database schema accordingly.

**Important Considerations:**
- Before running the command, ensure that your connection string and database configuration are correctly set up in `DbContext`.
- The command also updates the `__EFMigrationsHistory` table, which tracks applied migrations.

---

#### **Understanding Migrations in Detail**

**Modifying a Migration**
After generating a migration, you can manually modify the `Up()` and `Down()` methods if necessary. This might be required if EF Core generated a migration that doesn’t fully meet your needs.

**Example: Adding Default Values to a Column**

You can manually add code to specify default values in the migration:

```csharp
migrationBuilder.AddColumn<DateTime>(
    name: "CreatedDate",
    table: "Products",
    nullable: false,
    defaultValue: DateTime.UtcNow);
```

---

#### **Rolling Back Migrations**

If you need to undo a migration, EF Core allows you to roll back the changes by running the `Down()` method of a specific migration.

**To roll back the latest migration:**

```bash
dotnet ef database update LastGoodMigration
```

In this command, `LastGoodMigration` is the name of the migration you want to revert to. This command undoes all migrations after that specific one.

**Example: Rolling back to an earlier migration**

```bash
dotnet ef database update InitialCreate
```

This will roll back all migrations after `InitialCreate`, bringing the database schema back to its initial state.

---

#### **Database Seeding**

Database seeding refers to populating your database with initial or test data automatically when migrations are applied. Seeding ensures that essential data (e.g., admin users, product categories) is always present after the database is created or updated.

**Example: Seeding Data in EF Core**

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Product>().HasData(
        new Product { Id = 1, Name = "Laptop", Price = 1200M, StockQuantity = 50 },
        new Product { Id = 2, Name = "Smartphone", Price = 800M, StockQuantity = 200 }
    );
}
```

When you run `dotnet ef database update`, EF Core checks if the database contains the seeded data. If not, it will insert the specified records into the `Products` table.

**Important Points about Seeding:**
- Seeding happens after migrations are applied.
- EF Core prevents duplicating seeded data by keeping track of previously seeded entries.

---

#### **Handling Migrations in Production**

When deploying applications to production, managing migrations carefully is crucial. You must ensure that database changes are applied safely and that any potential data loss or downtime is minimized.

**Best Practices for Managing Migrations in Production:**

1. **Back Up Your Database**: Always back up your production database before applying migrations to avoid accidental data loss.
2. **Apply Migrations During Low Traffic Periods**: To reduce downtime, apply migrations when there is minimal traffic or schedule downtime windows.
3. **Test Migrations on Staging Environment**: Always test new migrations in a staging or development environment before applying them in production.
4. **Use Transactional Migrations**: Migrations should be wrapped in transactions to ensure that they are either fully applied or fully rolled back in case of failure.

**Example: Applying Migrations in Production (ASP.NET Core Startup)**

You can configure your ASP.NET Core application to automatically apply migrations when the application starts. This is useful for CI/CD pipelines and ensuring that the database is always up to date.

```csharp
public class Startup
{
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        using (var scope = app.ApplicationServices.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            context.Database.Migrate();  // Applies all pending migrations
        }
    }
}
```

**Key Considerations:**
- `Database.Migrate()` applies all pending migrations automatically when the application starts.
- This is useful for automated deployments, but it should be used cautiously in production environments.

---

#### **Verbose Code Example: Migrations**

Here is a step-by-step breakdown of creating, applying, and managing migrations:

```bash
# Step 1: Modify your model (e.g., adding a CreatedDate column to Product)

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public DateTime CreatedDate { get; set; }  // New column
}

# Step 2: Create a new migration to reflect the changes
dotnet ef migrations add AddCreatedDateToProduct

# Step 3: Check the generated migration file (Migrations/AddCreatedDateToProduct.cs)
public partial class AddCreatedDateToProduct : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<DateTime>(
            name: "CreatedDate",
            table: "Products",
            nullable: false,
            defaultValue: DateTime.UtcNow);  // Add default value
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(name: "CreatedDate", table: "Products");
    }
}

# Step 4: Apply the migration to the database
dotnet ef database update

# Step 5: Verify the changes by checking the database schema
```

---

**Summary of Key Concepts:**
1. **Migrations**: Automatically manage database schema changes without manually altering the database.
2. **Creating Migrations**: Use `dotnet ef migrations add` to generate migration files.
3. **Applying Migrations**: Apply changes to the database using `dotnet ef database update`.
4. **Rolling Back Migrations**: Use `dotnet ef database update <migration>` to revert changes.
5. **Database Seeding**: Automatically populate the database with essential data using `HasData()` method.
6. **Production Considerations**: Safely handle migrations in production environments with best practices like backups and transactional migrations.

---

```bash
nvim 05-migrations-and-database-management.md
```

**Timestamp**: 2024-10-23 14:40:00  
**Summary**: Detailed guide on using EF Core migrations, covering creation, application, rollback, and production management. Includes code examples and best practices for database changes.  
**Lines**: 127  
**Characters**: 10353
