Vue’s core library is modular, with various modules offering different functionalities. Here’s a breakdown of the main modules available in the Vue library:

### **1. Core Vue Modules**:

- **Vue instance (`Vue`)**: The base object used to create and manage Vue applications. It's the starting point for any Vue app.

### **2. Vue Composition API (Vue 3)**:

- **`reactive()`**: Creates a reactive data object.
- **`ref()`**: Creates a reactive reference to a value.
- **`computed()`**: Defines computed properties.
- **`watch()`**: Allows you to react to changes in data or computed properties.
- **`provide()` and `inject()`**: Provide/inject is used for dependency injection between components.
- **`onMounted()`, `onUnmounted()`, `onUpdated()`**: Lifecycle hooks specific to the Composition API.

### **3. Vue Component System**:

- **`defineComponent()`**: A helper function used to define components in Vue 3.
- **`props`**: Used to pass data from a parent component to a child component.
- **`emit()`**: Used to trigger custom events from child components to parents.

### **4. Vue Router (Optional)**:

- **`createRouter()`**: Used to create a new Vue Router instance.
- **`createWebHistory()`**: Provides history-based navigation (e.g., browser’s history API).
- **`createWebHashHistory()`**: Provides hash-based navigation (URL changes using hash `#`).
- **`RouterView` and `RouterLink`**: Components for rendering matched routes and linking between pages.

### **5. Vuex (Optional)**:

- **`createStore()`**: Initializes a Vuex store for centralized state management.
- **`state`**: The reactive data/state within the Vuex store.
- **`getters`**: Computed properties that derive state.
- **`mutations`**: Synchronous functions to modify the store's state.
- **`actions`**: Asynchronous functions that can trigger mutations.
- **`modules`**: Breaks the store into smaller, reusable modules.

### **6. Vue Directives**:

- **`v-model`**: Two-way data binding directive.
- **`v-if`, `v-else`, `v-else-if`**: Conditional rendering.
- **`v-for`**: Rendering a list of items.
- **`v-bind`**: Dynamically bind attributes or props.
- **`v-on`**: Event handling.
- **`v-show`**: Conditional visibility.
- **`v-slot`**: Scoped slots for component templates.
- **`v-html`**: Render raw HTML.

### **7. Vue Transitions/Animations**:

- **`Transition`**: Component for adding enter/leave transitions.
- **`TransitionGroup`**: Adds transitions to lists of items.

### **8. Vue Server-Side Rendering (SSR) Modules**:

- **`createSSRApp()`**: Creates a Vue application optimized for server-side rendering.
- **`renderToString()`**: Renders the Vue app to a string for SSR.
- **`renderToNodeStream()`**: Streams the SSR rendering process to the client.

### **9. Vue Utilities**:

- **`nextTick()`**: Executes a callback after the next DOM update cycle.
- **`h()`**: Creates virtual DOM nodes (used in render functions).
- **`teleport()`**: Used to render content in a different part of the DOM outside the root app.

### **10. Plugins**:

- **`Vue.use()`**: Method to install Vue plugins.
- **`createApp()`**: Used to create a Vue instance, supporting plugins, components, and directives.

---

This list covers the major available modules in the Vue ecosystem, with the ability to extend functionality using third-party libraries and plugins.

---

```bash
nvim vue_available_modules.md
```
