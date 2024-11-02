### **Chapter 9: Dependency Injection and Middleware**

---

Dependency Injection (DI) and Middleware are two fundamental concepts in ASP.NET Core. Dependency Injection helps manage object lifetimes and dependencies efficiently, while Middleware handles requests and responses as they pass through the ASP.NET Core pipeline.

This chapter will cover:
- What Dependency Injection (DI) is and why it’s important.
- How to use DI in ASP.NET Core to manage services and dependencies.
- Understanding Middleware and its role in request processing.
- Creating and configuring custom Middleware components.

---

#### **What is Dependency Injection (DI)?**

Dependency Injection is a design pattern that allows developers to create and manage dependencies (objects that a class depends on) outside of the class itself. It promotes loose coupling, making code easier to maintain and test.

ASP.NET Core has built-in support for Dependency Injection. Services (e.g., database context, logging services, etc.) are registered in a central location and then injected into controllers or other services as needed.

##### **Benefits of DI:**
- **Loose Coupling**: Classes no longer need to create instances of the services they depend on. This responsibility is delegated to the DI container.
- **Testability**: Dependencies can be easily mocked, which simplifies unit testing.
- **Flexibility**: You can replace dependencies without modifying the consuming code.

---

#### **Using Dependency Injection in ASP.NET Core**

In ASP.NET Core, services are registered in the `Startup.cs` file (or `Program.cs` in later versions). Services are added to the DI container and are then injected into the classes that need them.

##### **Step 1: Service Registration**

You register services in the `ConfigureServices` method of the `Startup` class (or `builder.Services.Add...` in `Program.cs`).

```csharp
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();

        // Register a custom service
        services.AddScoped<ICustomerService, CustomerService>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseRouting();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
```

In this example:
- `AddScoped<ICustomerService, CustomerService>()`: This registers the `CustomerService` to be injected wherever the `ICustomerService` interface is used. The service is created once per request (scoped).

##### **Service Lifetimes:**
- **Transient**: Created each time they are requested (`services.AddTransient`).
- **Scoped**: Created once per request (`services.AddScoped`).
- **Singleton**: Created once and shared throughout the application (`services.AddSingleton`).

---

#### **Step 2: Service Injection**

Once services are registered, you can inject them into controllers or other services via constructor injection.

```csharp
public class CustomersController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomersController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Customer>> GetAllCustomers()
    {
        return Ok(_customerService.GetCustomers());
    }
}
```

Here, the `ICustomerService` is injected into the `CustomersController`. The controller doesn’t need to create an instance of the service—it simply uses the injected instance.

##### **Service Example**:

```csharp
public interface ICustomerService
{
    IEnumerable<Customer> GetCustomers();
}

public class CustomerService : ICustomerService
{
    private readonly List<Customer> _customers = new List<Customer>
    {
        new Customer { Id = 1, FirstName = "John", LastName = "Doe", Email = "john@example.com" },
        new Customer { Id = 2, FirstName = "Jane", LastName = "Smith", Email = "jane@example.com" }
    };

    public IEnumerable<Customer> GetCustomers()
    {
        return _customers;
    }
}
```

---

#### **What is Middleware?**

Middleware in ASP.NET Core is software that’s assembled into the application pipeline to handle requests and responses. Each piece of middleware can either:
- Process an incoming request and pass it to the next piece of middleware.
- Process the response before it’s sent back to the client.

The middleware pipeline is configured in the `Configure` method of `Startup.cs`. Each middleware is executed in the order it is registered.

---

#### **Using Built-in Middleware**

ASP.NET Core comes with built-in middleware components for common tasks, such as routing, authentication, and error handling. Below are a few common examples of built-in middleware:

- **UseRouting**: Handles routing of requests to the appropriate controllers.
- **UseAuthentication**: Manages authentication of requests.
- **UseAuthorization**: Handles role-based or policy-based authorization.
- **UseStaticFiles**: Serves static files like images or CSS.

##### **Basic Middleware Pipeline**:

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }

    app.UseRouting();

    app.UseAuthentication();
    app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
}
```

---

#### **Creating Custom Middleware**

You can create custom middleware components to handle specific tasks such as logging, error handling, or response manipulation.

##### **Step 1: Create Middleware Class**

A middleware class must contain a `RequestDelegate` object and an `Invoke` method that processes the HTTP request.

```csharp
public class CustomMiddleware
{
    private readonly RequestDelegate _next;

    public CustomMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        // Logic before calling the next middleware in the pipeline
        Console.WriteLine("Processing request: " + context.Request.Path);

        await _next(context); // Call the next middleware in the pipeline

        // Logic after the next middleware has processed the request
        Console.WriteLine("Processing response: " + context.Response.StatusCode);
    }
}
```

##### **Step 2: Register the Middleware**

You register custom middleware in the `Configure` method using the `UseMiddleware` method.

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseMiddleware<CustomMiddleware>();

    app.UseRouting();
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
}
```

This will insert the `CustomMiddleware` into the request pipeline, and it will run for each incoming request.

---

#### **Chaining Middleware**

Middleware components are chained together, and the order of registration matters. If a middleware component does not call the `next` delegate, the request will not proceed to the next middleware, effectively stopping the chain.

Here’s an example of chaining multiple middleware components:

```csharp
app.Use(async (context, next) =>
{
    Console.WriteLine("First Middleware: Before");
    await next.Invoke();
    Console.WriteLine("First Middleware: After");
});

app.Use(async (context, next) =>
{
    Console.WriteLine("Second Middleware");
    await next.Invoke();
});

app.Run(async context =>
{
    Console.WriteLine("Terminal Middleware");
    await context.Response.WriteAsync("Hello, World!");
});
```

In this example:
- The first middleware will execute logic both before and after the second middleware.
- The second middleware will only execute once, and it passes the request to the terminal middleware.
- The `Run` middleware is terminal and does not call `next`, stopping further middleware execution.

---

#### **Summary of Key Concepts:**
1. **Dependency Injection**: A design pattern that allows classes to depend on external services without needing to create them. ASP.NET Core has a built-in DI container for managing services.
2. **Service Lifetimes**: Services can be registered as transient, scoped, or singleton, depending on how often they should be instantiated.
3. **Middleware**: Middleware components are executed in sequence for handling requests and responses. ASP.NET Core has built-in middleware and supports custom middleware creation.
4. **Chaining Middleware**: Middleware is processed in the order it’s registered. The request and response flow through each component in the pipeline.

---

```bash
nvim 09-dependency-injection-and-middleware.md
```

**Timestamp**: 2024-10-23 16:42:00  
**Summary**: Detailed explanation of Dependency Injection (DI) and Middleware in ASP.NET Core, including service lifetimes, registering services, injecting dependencies, and creating custom middleware components.  
**Lines**: 117  
**Characters**: 9128
