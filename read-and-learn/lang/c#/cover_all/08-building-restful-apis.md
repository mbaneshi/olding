### **Chapter 8: Building RESTful APIs**

---

In modern web development, RESTful APIs play a critical role in enabling communication between different software systems. ASP.NET Core is well-suited for building RESTful APIs due to its lightweight, high-performance nature and its built-in support for HTTP, JSON, and other essential protocols and formats. This chapter will focus on creating APIs that adhere to REST principles, allowing for clear and scalable interactions between the client and server.

In this chapter, we will cover:
- Understanding REST principles and their importance.
- Creating controllers and routes for handling HTTP requests.
- Using Data Transfer Objects (DTOs) for structured data communication between the client and the server.

---

#### **What is REST?**

REST (Representational State Transfer) is an architectural style for designing networked applications. It is commonly used in web services development for enabling clients to interact with server-side resources using standard HTTP methods such as GET, POST, PUT, and DELETE.

##### **Core REST Principles**:
1. **Stateless**: Each API call from the client must contain all the information necessary for the server to understand and process the request. The server does not store any state between requests.
2. **Client-Server Architecture**: The client (e.g., web app, mobile app) interacts with the server through well-defined APIs, separating concerns between UI and data handling.
3. **Resource Identification**: Resources are identified using URIs (Uniform Resource Identifiers) such as `/api/customers/1` to represent the customer with an ID of 1.
4. **Representation of Resources**: Resources can have multiple representations (e.g., JSON, XML). The client requests a specific format via headers.
5. **HTTP Methods**: REST APIs use HTTP methods to perform actions on resources:
   - `GET`: Retrieve data from the server.
   - `POST`: Create new resources on the server.
   - `PUT`: Update existing resources.
   - `DELETE`: Remove resources from the server.

---

#### **Creating a RESTful API in ASP.NET Core**

Let’s walk through building a simple RESTful API that performs CRUD (Create, Read, Update, Delete) operations on a resource such as `Customer`.

##### **Step 1: Create a New ASP.NET Core API Project**

To start, create a new API project using the following command:

```bash
dotnet new webapi -o MyFirstApi
cd MyFirstApi
```

The template will generate an ASP.NET Core project that is pre-configured for building APIs. Unlike the `webapp` template, this one is optimized for building RESTful services with no UI.

##### **Step 2: Define the Customer Model**

A model represents the structure of the data your API will manage. Let’s create a simple `Customer` class:

```csharp
public class Customer
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
}
```

This model will be used as the resource that the API will expose.

##### **Step 3: Create the CustomersController**

In ASP.NET Core, controllers handle incoming HTTP requests and route them to appropriate actions. The controller will contain action methods to perform CRUD operations on the `Customer` resource.

Create a new file named `CustomersController.cs` in the `Controllers` folder:

```csharp
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private static List<Customer> Customers = new List<Customer>();

    [HttpGet]
    public ActionResult<IEnumerable<Customer>> GetAllCustomers()
    {
        return Ok(Customers);
    }

    [HttpGet("{id}")]
    public ActionResult<Customer> GetCustomerById(int id)
    {
        var customer = Customers.Find(c => c.Id == id);
        if (customer == null)
        {
            return NotFound();
        }
        return Ok(customer);
    }

    [HttpPost]
    public ActionResult CreateCustomer(Customer newCustomer)
    {
        newCustomer.Id = Customers.Count + 1;
        Customers.Add(newCustomer);
        return CreatedAtAction(nameof(GetCustomerById), new { id = newCustomer.Id }, newCustomer);
    }

    [HttpPut("{id}")]
    public ActionResult UpdateCustomer(int id, Customer updatedCustomer)
    {
        var customer = Customers.Find(c => c.Id == id);
        if (customer == null)
        {
            return NotFound();
        }
        customer.FirstName = updatedCustomer.FirstName;
        customer.LastName = updatedCustomer.LastName;
        customer.Email = updatedCustomer.Email;
        return NoContent();
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteCustomer(int id)
    {
        var customer = Customers.Find(c => c.Id == id);
        if (customer == null)
        {
            return NotFound();
        }
        Customers.Remove(customer);
        return NoContent();
    }
}
```

This `CustomersController` class defines the following API endpoints:
- **GET** `/api/customers`: Retrieves all customers.
- **GET** `/api/customers/{id}`: Retrieves a single customer by their ID.
- **POST** `/api/customers`: Creates a new customer.
- **PUT** `/api/customers/{id}`: Updates an existing customer.
- **DELETE** `/api/customers/{id}`: Deletes a customer.

##### **Step 4: Run the API**

Run the API with the following command:

```bash
dotnet run
```

The API will now be available at `https://localhost:5001/api/customers`. You can use tools like `Postman` or `curl` to test the endpoints.

For example, to add a new customer using `curl`:

```bash
curl -X POST https://localhost:5001/api/customers -H "Content-Type: application/json" -d '{"firstName":"John","lastName":"Doe","email":"john.doe@example.com"}'
```

To fetch the list of all customers:

```bash
curl https://localhost:5001/api/customers
```

---

#### **Data Transfer Objects (DTOs)**

In a RESTful API, it's common to use Data Transfer Objects (DTOs) to represent the data sent to or received from the API. DTOs help to decouple the internal data structure from the external representation and improve security by exposing only the necessary fields.

Let’s create a `CustomerDTO` class to use as a DTO:

```csharp
public class CustomerDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
}
```

Now, update the `CustomersController` to use the `CustomerDTO` for input and output instead of the `Customer` entity directly:

```csharp
[HttpPost]
public ActionResult CreateCustomer(CustomerDTO newCustomerDto)
{
    var newCustomer = new Customer
    {
        Id = Customers.Count + 1,
        FirstName = newCustomerDto.FirstName,
        LastName = newCustomerDto.LastName,
        Email = newCustomerDto.Email
    };
    Customers.Add(newCustomer);
    return CreatedAtAction(nameof(GetCustomerById), new { id = newCustomer.Id }, newCustomer);
}
```

The use of DTOs improves flexibility by allowing you to change your internal data structures without affecting the API contract.

---

#### **Routing in ASP.NET Core**

Routing is essential in REST APIs to map incoming HTTP requests to appropriate controller actions. In the `CustomersController`, the `[Route("api/[controller]")]` attribute maps the controller to the `/api/customers` endpoint.

Routing can be customized to match specific patterns, such as:

```csharp
[HttpGet("email/{email}")]
public ActionResult<Customer> GetCustomerByEmail(string email)
{
    var customer = Customers.Find(c => c.Email == email);
    if (customer == null)
    {
        return NotFound();
    }
    return Ok(customer);
}
```

This route allows users to retrieve customers by email via the endpoint `/api/customers/email/{email}`.

---

#### **Summary of Key Concepts:**
1. **RESTful API Design**: Follows stateless, resource-based architecture using standard HTTP methods for CRUD operations.
2. **Controllers**: Handle incoming requests and map them to appropriate actions using routing.
3. **DTOs**: Decouple the internal model from the external API representation, ensuring security and flexibility.
4. **Routing**: Configures URL patterns to map requests to specific controller actions, providing flexibility in defining API endpoints.

---

```bash
nvim 08-building-restful-apis.md
```

**Timestamp**: 2024-10-23 16:08:00  
**Summary**: Overview of REST principles and a step-by-step guide to building RESTful APIs in ASP.NET Core. Covers defining models, creating controllers, and using Data Transfer Objects (DTOs).  
**Lines**: 121  
**Characters**: 9770
