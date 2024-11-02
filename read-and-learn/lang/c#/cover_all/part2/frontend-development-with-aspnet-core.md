### **Chapter 12: Frontend Development with ASP.NET Core**

This chapter will cover how ASP.NET Core supports frontend development. ASP.NET Core can serve static files, views, and integrates with modern JavaScript frameworks. We'll explore Razor Pages, Blazor, and using AJAX for dynamic frontend behavior. 

---

#### **1. Serving Static Files**

ASP.NET Core can serve static assets such as CSS, JavaScript, and images directly from the `wwwroot` folder.

##### **1.1. Configuration for Static Files**
The `wwwroot` directory is the default folder for static files in an ASP.NET Core application. To serve files from this directory, the `UseStaticFiles` middleware is added to the pipeline.

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }

    app.UseStaticFiles(); // Enables static file serving from wwwroot
    app.UseRouting();
    app.UseEndpoints(endpoints => {
        endpoints.MapControllers();
    });
}
```

By default, all files in `wwwroot` are publicly accessible. The typical folder structure for static files might look like this:

```bash
/wwwroot
    /css
    /js
    /images
```

Static files can be referenced in HTML views or Razor Pages like this:

```html
<link rel="stylesheet" href="/css/style.css" />
<script src="/js/app.js"></script>
```

#### **2. Using Razor Pages**

Razor Pages is a simpler alternative to MVC for page-focused development in ASP.NET Core. It provides a page-based programming model, where the logic and UI are grouped into `.cshtml` files.

##### **2.1. Creating Razor Pages**

A Razor Page is essentially a combination of a `.cshtml` file and its associated page model (a `.cs` class). Here’s a basic example:

1. Razor Page (`Index.cshtml`):
    ```html
    @page
    @model IndexModel
    <h1>Welcome, @Model.Name!</h1>
    ```

2. Page Model (`Index.cshtml.cs`):
    ```csharp
    public class IndexModel : PageModel
    {
        public string Name { get; set; }

        public void OnGet()
        {
            Name = "User";
        }
    }
    ```

This setup uses the `OnGet()` method to handle GET requests, setting the `Name` property, which is then displayed on the page. The `@page` directive makes the `.cshtml` file a Razor Page.

##### **2.2. Razor Syntax**
Razor syntax allows for embedding C# code directly in the HTML of a `.cshtml` file:

- **Variables**: `@variableName`
- **Conditional Statements**: 
    ```csharp
    @if(Model.Condition) 
    {
        <p>Condition is true!</p>
    }
    ```
- **Loops**: 
    ```csharp
    @foreach(var item in Model.Items) 
    {
        <li>@item</li>
    }
    ```

---

#### **3. Blazor for Building Interactive Web UIs**

Blazor is a framework for building interactive web UIs using C# instead of JavaScript. Blazor comes in two hosting models:
- **Blazor Server**: The application runs on the server, and UI updates are sent over a SignalR connection.
- **Blazor WebAssembly**: The entire application runs client-side in the browser using WebAssembly.

##### **3.1. Creating a Blazor Component**
Blazor components are reusable pieces of UI that encapsulate logic and markup. Here’s an example of a simple Blazor component:

1. **Counter.razor**:
    ```razor
    @page "/counter"
    <h3>Counter</h3>
    <p>Current count: @count</p>
    <button class="btn btn-primary" @onclick="IncrementCount">Increment</button>

    @code {
        private int count = 0;

        private void IncrementCount()
        {
            count++;
        }
    }
    ```

The `@page "/counter"` directive makes this component accessible at `/counter` in the browser. The `@onclick` directive binds the button’s click event to the `IncrementCount` method, which updates the UI without reloading the page.

##### **3.2. Two-Way Data Binding**
Blazor supports two-way data binding, which keeps the UI and data model in sync. Here’s a simple example:

```razor
<input @bind="userName" />
<p>Hello, @userName!</p>

@code {
    private string userName;
}
```

Any changes made in the input field are immediately reflected in the `userName` variable and updated in the UI.

##### **3.3. Blazor Server vs. Blazor WebAssembly**
- **Blazor Server**: Runs on the server, with only UI updates sent to the client. It’s more suitable for applications requiring secure environments or large amounts of server-side processing.
- **Blazor WebAssembly**: The entire app runs in the browser, making it ideal for highly interactive applications with minimal server interaction.

---

#### **4. Implementing AJAX with JavaScript**

ASP.NET Core makes it easy to integrate AJAX for updating the frontend dynamically without refreshing the entire page. You can use libraries like **jQuery** or **Fetch API** to send asynchronous requests.

##### **4.1. Using Fetch API to Make AJAX Calls**

1. Create an API endpoint in ASP.NET Core:
   ```csharp
   [ApiController]
   [Route("api/[controller]")]
   public class UserController : ControllerBase
   {
       [HttpGet]
       public IActionResult GetUser()
       {
           var user = new { Name = "John Doe", Age = 25 };
           return Ok(user);
       }
   }
   ```

2. Use JavaScript to make an asynchronous request using the Fetch API:
   ```html
   <button onclick="fetchUser()">Get User</button>
   <p id="userInfo"></p>

   <script>
       async function fetchUser() {
           const response = await fetch('/api/user');
           const user = await response.json();
           document.getElementById('userInfo').innerHTML = 
               `Name: ${user.name}, Age: ${user.age}`;
       }
   </script>
   ```

The Fetch API sends a `GET` request to `/api/user`, retrieves the user data in JSON format, and displays it on the page without a full reload.

##### **4.2. Using jQuery for AJAX**
If you prefer using **jQuery**, you can make an AJAX request like this:

```html
<button onclick="getUser()">Get User</button>
<p id="userData"></p>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
    function getUser() {
        $.ajax({
            url: '/api/user',
            method: 'GET',
            success: function(data) {
                $('#userData').html(`Name: ${data.name}, Age: ${data.age}`);
            }
        });
    }
</script>
```

---

#### **5. Combining ASP.NET Core with Modern Frontend Frameworks**

While Razor Pages and Blazor provide robust server-side rendering solutions, ASP.NET Core can also work seamlessly with modern client-side frameworks like **React**, **Angular**, and **Vue.js**. You can serve these applications from the same ASP.NET Core project or host them separately.

##### **5.1. Serving React or Angular Apps with ASP.NET Core**

ASP.NET Core provides templates for React and Angular. You can use the `dotnet` CLI to create a new project:

```bash
dotnet new react
dotnet new angular
```

This will scaffold a project that integrates ASP.NET Core with React or Angular, providing a starting point for building single-page applications (SPAs).

---

### **Summary**

In this chapter, we covered:
- How to serve static files and utilize Razor Pages for server-side rendering.
- Blazor’s powerful C#-based frontend model and how it integrates into ASP.NET Core.
- Using AJAX with the Fetch API and jQuery to make asynchronous HTTP requests.
- Integration of modern frontend frameworks like React and Angular with ASP.NET Core.

These tools and techniques allow you to build full-featured web applications that are dynamic, responsive, and maintainable.

---

```bash
nvim frontend-development-with-aspnet-core.md
```

Timestamp: 2024-10-23  
Lines: 101  
Characters: 8,408  
