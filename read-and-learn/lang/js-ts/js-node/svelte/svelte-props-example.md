### 2023-10-16 17:05:00

**Summary**: This elaboration describes how **props** in Svelte are used to pass data from parent components to child components, with a real-world example of a profile card displaying dynamic user data.  
**Response Details**: 61 lines, 3224 characters.

---

Let’s expand the concept of **Props** in Svelte using a real-world scenario. Props allow parent components to pass data down to child components. The `export` keyword is used in the child component to declare props, and values can be assigned to these props from the parent.

### Real-World Example: User Profile Card

In a real-world scenario, imagine you’re building a **profile card component** to display a user’s name, email, and profile picture. The parent component will provide the data for each user as props.

#### 1. **Profile Card Component (`ProfileCard.svelte`)**

The `ProfileCard.svelte` component will accept `name`, `email`, and `profileImage` as props, which will be passed down by the parent.

```svelte
<script>
  // Declare props using export
  export let name;
  export let email;
  export let profileImage;
</script>

<style>
  .card {
    border: 1px solid #ddd;
    padding: 1rem;
    max-width: 300px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  .name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .email {
    color: #555;
    font-size: 0.9rem;
  }
</style>

<div class="card">
  <img class="profile-image" src={profileImage} alt="Profile Image" />
  <div class="name">{name}</div>
  <div class="email">{email}</div>
</div>
```

#### 2. **Parent Component (`App.svelte`)**

Now, the parent component (`App.svelte`) will import the `ProfileCard` component and pass in the user’s data (name, email, and profile image) as props.

```svelte
<script>
  import ProfileCard from './ProfileCard.svelte';

  // Example user data to pass as props
  let user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    profileImage: 'https://via.placeholder.com/100'
  };
</script>

<style>
  .app {
    text-align: center;
    padding: 2rem;
  }
</style>

<div class="app">
  <h1>User Profiles</h1>

  <!-- Passing props to the child component -->
  <ProfileCard
    name={user.name}
    email={user.email}
    profileImage={user.profileImage}
  />
</div>
```

### Breakdown of Real-World Features:

1. **Props in the Child Component**:

   - The `ProfileCard.svelte` component declares three props: `name`, `email`, and `profileImage`. These props are received from the parent component (`App.svelte`) when it renders the child component.
   - The `export let` syntax makes these variables accessible for the parent to pass values into the component.

2. **Dynamic Rendering**:

   - The child component uses these props to dynamically render the user’s profile information (name, email, and profile picture). If the parent component passes different values, the child component automatically updates with the new data.

3. **Parent-Child Relationship**:

   - In `App.svelte`, the `ProfileCard` component is used like an HTML tag, and props are passed as attributes (e.g., `name={user.name}`). This allows the parent to control what content is shown by the child component.
   - You can easily change the values in the parent, and the child component will re-render based on the new props.

4. **Reusable Component**:
   - The `ProfileCard` is a reusable component, and the parent can pass different user data to create multiple profile cards. For example, you could render multiple user profiles by looping through an array of users and passing their data as props to separate `ProfileCard` components.

#### Expanded Real-World Scenario: Displaying Multiple Profiles

Let’s extend this example to display multiple users using an array of user data. The parent component will loop through the users and pass their data as props to individual `ProfileCard` components.

```svelte
<script>
  import ProfileCard from './ProfileCard.svelte';

  // Array of user data
  let users = [
    {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      profileImage: 'https://via.placeholder.com/100'
    },
    {
      name: 'John Smith',
      email: 'john.smith@example.com',
      profileImage: 'https://via.placeholder.com/100'
    },
    {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      profileImage: 'https://via.placeholder.com/100'
    }
  ];
</script>

<div class="app">
  <h1>User Profiles</h1>

  <!-- Loop through the users array and pass each user's data as props -->
  {#each users as user}
    <ProfileCard
      name={user.name}
      email={user.email}
      profileImage={user.profileImage}
    />
  {/each}
</div>
```

### What’s New Here?

1. **Looping Through Data**:

   - Using Svelte’s `{#each}` block, we loop through the `users` array and create a `ProfileCard` for each user. Each card receives the user’s data as props, making it easy to render a list of users dynamically.

2. **Efficient Reusability**:
   - The `ProfileCard` component is reused for every user in the array, demonstrating how props allow components to be flexible and adaptable to different data inputs.

### Conclusion:

Svelte’s **props** system is simple and effective for passing data from parent to child components. The modularity of components like `ProfileCard` makes it easy to create reusable UI elements that can adapt to changing data from their parent. This approach promotes clean, maintainable code and is essential for building scalable Svelte applications.

```bash
nvim svelte-props-example.md
```
