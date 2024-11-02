### **Chapter 15: Introduction to MAUI**

In this chapter, we will explore the .NET Multi-platform App UI (MAUI), which is the evolution of Xamarin.Forms. MAUI allows developers to build cross-platform applications for Android, iOS, macOS, and Windows with a single codebase. We will discuss its architecture, major differences from Xamarin, and walk through setting up a MAUI project.

---

#### **1. What is .NET MAUI?**

**.NET MAUI** stands for **Multi-platform App UI**, and it enables developers to build applications that run on multiple platforms using the .NET framework. It’s designed to unify Xamarin.Forms, allowing a single project structure and consistent UI development for mobile and desktop.

##### **1.1. Key Features of MAUI**
- **Single Project**: Unlike Xamarin, where separate platform-specific projects exist for iOS, Android, etc., MAUI provides a unified project structure.
- **Cross-Platform**: It supports Android, iOS, macOS, and Windows.
- **Improved Performance**: MAUI offers better performance through improved rendering engines and .NET 6 optimization.
- **Single UI Codebase**: Write your UI once using XAML and C# and deploy it to multiple platforms.
- **Platform-Specific Code**: MAUI allows embedding platform-specific code where necessary but encourages the use of common code for most of the logic.

##### **1.2. MAUI vs. Xamarin.Forms**
- **Unified Project**: MAUI combines platform-specific projects into a single project, whereas Xamarin.Forms has separate projects for Android, iOS, etc.
- **Platform Integration**: MAUI simplifies integration with platform-specific features and resources.
- **Performance**: MAUI is built on top of .NET 6, which introduces performance improvements over Xamarin’s implementation.
- **UI Customization**: MAUI has better support for customizing UI components using platform-specific styling, giving more flexibility.

---

#### **2. Setting Up a MAUI Project**

To begin building applications with .NET MAUI, you need to have the following installed:
- **.NET SDK 6.0+** (MAUI is built on top of .NET 6).
- **Visual Studio 2022** (with MAUI workloads installed).

##### **2.1. Installing MAUI Workloads**

In **Visual Studio 2022**:
1. Go to **Tools > Get Tools and Features**.
2. In the installer, select **.NET Multi-platform App UI development** under the **Mobile Development** section.
3. Click **Modify** to install the required workloads.

##### **2.2. Creating a New MAUI Project**

Once the setup is complete:
1. Open **Visual Studio 2022**.
2. Select **Create a new project**.
3. Search for **MAUI** and choose the **.NET MAUI App (Preview)** template.
4. Name your project and click **Create**.

This will generate a basic MAUI project with the following structure:

```plaintext
/MyMAUIApp
  - Platforms (folder containing platform-specific code for Android, iOS, macOS, Windows)
  - Resources (folder for shared resources like fonts, images, etc.)
  - App.xaml (entry point for UI definition)
  - MainPage.xaml (the main page of the application)
  - Program.cs (application startup logic)
```

##### **2.3. Understanding MAUI Project Structure**

A MAUI project has a unified structure with key folders and files for both shared and platform-specific code:

- **App.xaml**: This file defines the root resources and styles used across the app.
- **MainPage.xaml**: The main user interface page that is displayed when the app starts.
- **Platforms folder**: Contains platform-specific code (like Android-specific `MainActivity.cs` or iOS-specific `AppDelegate.cs`).
- **Resources folder**: Contains shared resources like images, fonts, and styles that can be used across all platforms.

---

#### **3. Building a Simple MAUI App**

Now, let's create a simple MAUI application that displays a welcome message and has a button that shows an alert when clicked.

##### **3.1. Defining UI in XAML**

Here’s an example of `MainPage.xaml`:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://schemas.microsoft.com/dotnet/2021/maui"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             x:Class="MyMAUIApp.MainPage">

    <VerticalStackLayout Spacing="25" Padding="30" VerticalOptions="Center">
        <!-- Welcome Text -->
        <Label Text="Welcome to MAUI!"
               FontSize="32"
               HorizontalOptions="Center" />

        <!-- Button to Trigger Alert -->
        <Button Text="Click Me"
                FontSize="18"
                Clicked="OnButtonClicked" />
    </VerticalStackLayout>
</ContentPage>
```

- The **Label** displays a welcome message.
- The **Button** triggers an action when clicked.

##### **3.2. Handling Button Click Event in Code-Behind**

In the `MainPage.xaml.cs` file, you handle the button’s click event:

```csharp
using Microsoft.Maui.Controls;

namespace MyMAUIApp
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        private async void OnButtonClicked(object sender, EventArgs e)
        {
            // Display an alert when the button is clicked
            await DisplayAlert("Alert", "Button clicked!", "OK");
        }
    }
}
```

Here’s what happens:
- When the button is clicked, it invokes the `OnButtonClicked` method.
- The method uses `DisplayAlert` to show an alert dialog.

---

#### **4. Deploying and Running MAUI Apps**

MAUI allows you to target different platforms from a single project. To run your app, select the target platform (Android, iOS, Windows, etc.) from the toolbar in Visual Studio.

##### **4.1. Running on Android**

1. Connect an Android device or use an emulator.
2. Select **Android Emulator** or **Android Device** as the target.
3. Press **F5** to build and deploy the app.

##### **4.2. Running on iOS**

1. Connect an iOS device or use the iOS Simulator (requires a macOS system).
2. Select **iOS Simulator** or **iOS Device** as the target.
3. Press **F5** to build and deploy the app.

##### **4.3. Running on Windows**

1. Select **Windows Machine** as the target from the toolbar.
2. Press **F5** to run the app on your local machine.

---

#### **5. Cross-Platform Capabilities in MAUI**

MAUI is designed for maximum code reuse across platforms. You can write platform-specific code where necessary using conditional compilation or platform services.

##### **5.1. Platform-Specific Code**

MAUI allows you to inject platform-specific code using **partial classes** or **dependency services**. Here's an example of using platform-specific code for accessing device vibration:

```csharp
// Shared Code
public interface IDeviceService
{
    void Vibrate();
}

// Platform-Specific Implementation (Android)
[assembly: Dependency(typeof(DeviceService))]
namespace MyMAUIApp.Platforms.Android
{
    public class DeviceService : IDeviceService
    {
        public void Vibrate()
        {
            // Android-specific vibration logic
            Android.OS.Vibrator vibrator = 
                (Android.OS.Vibrator)Android.App.Application.Context.GetSystemService(Android.Content.Context.VibratorService);
            vibrator.Vibrate(500); // Vibrate for 500ms
        }
    }
}

// Platform-Specific Implementation (iOS)
[assembly: Dependency(typeof(DeviceService))]
namespace MyMAUIApp.Platforms.iOS
{
    public class DeviceService : IDeviceService
    {
        public void Vibrate()
        {
            // iOS-specific vibration logic
            var generator = new UIKit.UIImpactFeedbackGenerator(UIKit.UIImpactFeedbackStyle.Heavy);
            generator.Prepare();
            generator.ImpactOccurred();
        }
    }
}
```

This pattern allows you to maintain a common interface (`IDeviceService`) while implementing platform-specific behavior using platform-dependent code.

---

#### **6. Resources and Styles in MAUI**

MAUI allows you to define shared styles and resources for consistent UI design across platforms.

##### **6.1. Defining Resources in App.xaml**

You can define global styles in `App.xaml`:

```xml
<Application.Resources>
    <ResourceDictionary>
        <Style TargetType="Button">
            <Setter Property="BackgroundColor" Value="LightGray" />
            <Setter Property="TextColor" Value="Black" />
        </Style>
    </ResourceDictionary>
</Application.Resources>
```

All `Button` elements in the app will now have the same style applied unless otherwise overridden.

---

#### **7. Data Binding in MAUI**

MAUI continues to support **data binding**, making it easier to bind data to UI components.

##### **7.1. Simple Data Binding Example**

Here’s how to bind a `Label` to a property:

- **MainPage.xaml**:

```xml
<Label Text="{Binding WelcomeMessage}" FontSize="24" HorizontalOptions="Center" />
```

- **MainPage.xaml.cs**:

```csharp
public class MainPageViewModel
{
    public string WelcomeMessage { get; set; } = "Hello from MAUI!";
}

public MainPage()
{
    InitializeComponent();
    BindingContext = new MainPageViewModel();
}
```

Data binding allows for a cleaner separation between UI logic and business logic

.

---

#### **8. Summary**

MAUI simplifies the process of building cross-platform apps by unifying the project structure and leveraging the latest features in .NET 6. With a single codebase, developers can target Android, iOS, macOS, and Windows. MAUI provides performance enhancements, better resource management, and more flexibility for building modern apps across different platforms.

---

This concludes the introduction to MAUI. In the next chapter, we will dive deeper into handling platform-specific features and integrating native device services in MAUI apps.

---

```bash
nvim chapter15_maui_intro.md
```

**Timestamp**: 2024-10-23  
**Summary**: Introduction to .NET MAUI, its architecture, project setup, and building a basic cross-platform app.  
**Lines**: 157  
**Characters**: 10,026
