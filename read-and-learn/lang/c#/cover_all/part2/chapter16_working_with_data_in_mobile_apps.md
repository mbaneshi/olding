### **Chapter 16: Working with Data in Mobile Apps**

In this chapter, we will explore how to integrate databases into mobile applications using .NET MAUI or Xamarin. Data handling is crucial for any mobile app, whether for local storage or remote synchronization with a backend. This chapter covers local database management using SQLite, integration of Entity Framework Core (EF Core) in mobile apps, and strategies for syncing data between local and remote databases.

---

#### **1. Local Database Management in MAUI and Xamarin**

For local data storage in mobile apps, **SQLite** is a widely-used solution. It’s lightweight and works well in offline scenarios, allowing apps to store user data directly on the device.

##### **1.1. Setting Up SQLite in MAUI or Xamarin**

To use SQLite in a MAUI or Xamarin project, the **SQLite.NET-PCL** library is commonly employed. This library provides an ORM-like interface for interacting with SQLite databases.

###### **Steps to Set Up SQLite in MAUI**:

1. Install the **SQLite.NET-PCL** package in your project:

```bash
dotnet add package sqlite-net-pcl
```

2. Create a **data model** that represents the database table. For example, consider a `TodoItem` class:

```csharp
using SQLite;

public class TodoItem
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }

    public string Name { get; set; }
    public bool IsComplete { get; set; }
}
```

3. Initialize the SQLite database and perform **CRUD** (Create, Read, Update, Delete) operations in a service class:

```csharp
public class TodoItemDatabase
{
    readonly SQLiteAsyncConnection _database;

    public TodoItemDatabase(string dbPath)
    {
        _database = new SQLiteAsyncConnection(dbPath);
        _database.CreateTableAsync<TodoItem>().Wait();
    }

    public Task<List<TodoItem>> GetTodoItemsAsync()
    {
        return _database.Table<TodoItem>().ToListAsync();
    }

    public Task<int> SaveTodoItemAsync(TodoItem item)
    {
        if (item.Id != 0)
        {
            return _database.UpdateAsync(item);
        }
        else
        {
            return _database.InsertAsync(item);
        }
    }

    public Task<int> DeleteTodoItemAsync(TodoItem item)
    {
        return _database.DeleteAsync(item);
    }
}
```

4. To use the database in the application, initialize it in the **App.xaml.cs** file:

```csharp
public partial class App : Application
{
    static TodoItemDatabase _database;

    public App()
    {
        InitializeComponent();
        MainPage = new MainPage();
    }

    public static TodoItemDatabase Database
    {
        get
        {
            if (_database == null)
            {
                var dbPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "TodoSQLite.db3");
                _database = new TodoItemDatabase(dbPath);
            }
            return _database;
        }
    }
}
```

##### **1.2. Accessing SQLite Data in Your UI**

To display the data stored in SQLite in your UI, bind it to a collection, like in this example of a **ListView**:

```xml
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MyApp.MainPage">

    <StackLayout Padding="10">
        <ListView x:Name="TodoListView"
                  ItemsSource="{Binding TodoItems}">
            <ListView.ItemTemplate>
                <DataTemplate>
                    <TextCell Text="{Binding Name}"
                              Detail="{Binding IsComplete, StringFormat='Completed: {0}'}" />
                </DataTemplate>
            </ListView.ItemTemplate>
        </ListView>

        <Button Text="Add New Todo" Clicked="OnAddTodoClicked" />
    </StackLayout>
</ContentPage>
```

In the code-behind (`MainPage.xaml.cs`), bind the data to the `ListView`:

```csharp
public partial class MainPage : ContentPage
{
    public List<TodoItem> TodoItems { get; set; }

    public MainPage()
    {
        InitializeComponent();
        LoadTodoItems();
    }

    async void LoadTodoItems()
    {
        TodoItems = await App.Database.GetTodoItemsAsync();
        TodoListView.ItemsSource = TodoItems;
    }

    async void OnAddTodoClicked(object sender, EventArgs e)
    {
        var newItem = new TodoItem { Name = "New Todo", IsComplete = false };
        await App.Database.SaveTodoItemAsync(newItem);
        LoadTodoItems();
    }
}
```

---

#### **2. Integrating EF Core with MAUI/Xamarin**

Although SQLite provides a lightweight solution for local data, you can integrate **Entity Framework Core (EF Core)** in your mobile app for more advanced features like LINQ queries, migrations, and database synchronization. This is useful when you need a consistent data access strategy across mobile and backend services.

##### **2.1. EF Core Setup in MAUI**

EF Core can be used with mobile apps for managing local SQLite databases as well as remote databases. Here's how you can integrate it:

1. Install the necessary EF Core packages:

```bash
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

2. Define your entity classes and a **DbContext**:

```csharp
public class TodoItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsComplete { get; set; }
}

public class AppDbContext : DbContext
{
    public DbSet<TodoItem> TodoItems { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var dbPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "TodoSQLite.db");
        optionsBuilder.UseSqlite($"Filename={dbPath}");
    }
}
```

3. Perform CRUD operations using the **DbContext**:

```csharp
public async Task AddTodoItemAsync(TodoItem item)
{
    using (var context = new AppDbContext())
    {
        context.TodoItems.Add(item);
        await context.SaveChangesAsync();
    }
}

public async Task<List<TodoItem>> GetTodoItemsAsync()
{
    using (var context = new AppDbContext())
    {
        return await context.TodoItems.ToListAsync();
    }
}
```

EF Core provides a richer set of features compared to SQLite.NET-PCL, including migrations, complex queries, and relationships.

##### **2.2. Managing Migrations**

Migrations allow you to version your database schema and apply changes automatically. While managing migrations on mobile devices is not typical, it can still be useful for complex scenarios.

To create a migration, run the following command in your project directory:

```bash
dotnet ef migrations add InitialCreate
```

Apply the migration using:

```bash
dotnet ef database update
```

---

#### **3. Data Synchronization with Remote Databases**

In scenarios where mobile applications need to sync data with a remote server, various strategies can be employed. Common patterns include:

##### **3.1. REST APIs and Remote Synchronization**

You can implement data synchronization by making periodic calls to a remote API using **HttpClient**. The local data stored in SQLite can be synced with the remote database by sending and receiving data in **JSON** format.

Example of using HttpClient to fetch data from a REST API:

```csharp
public async Task<List<TodoItem>> FetchTodosFromServerAsync()
{
    using (var client = new HttpClient())
    {
        var response = await client.GetStringAsync("https://example.com/api/todos");
        return JsonConvert.DeserializeObject<List<TodoItem>>(response);
    }
}
```

##### **3.2. Offline Data Synchronization**

For offline-first applications, data should be stored locally in SQLite and synced with the server whenever a network connection is available. A **background service** can be used to handle this:

1. Store all data changes locally.
2. Once the network is available, sync the local data to the server.
3. Handle conflicts by implementing merge strategies on the server.

---

#### **4. Summary**

Working with data in mobile apps using MAUI or Xamarin is highly flexible. For local data, SQLite provides a lightweight and efficient solution. When more advanced features are needed, EF Core can be integrated. Syncing local data with remote databases involves making HTTP calls and managing synchronization logic for offline capabilities.

In the next chapter, we will cover best practices in user interface design for mobile applications using Xamarin and MAUI.

---

```bash
nvim chapter16_working_with_data_in_mobile_apps.md
```

**Timestamp**: 2024-10-23  
**Summary**: This chapter explains how to manage local databases in MAUI using SQLite and EF Core, as well as strategies for syncing local data with remote databases.  
**Lines**: 141  
**Characters**: 9,019
