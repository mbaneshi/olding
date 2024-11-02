From your output, it looks like you have multiple JDK versions installed, and your current active JDK is located at:

```
/Users/macbookair/Library/Java/JavaVirtualMachines/openjdk-21.0.1/Contents/Home
```

### Setting `JAVA_HOME`:
You can set `JAVA_HOME` to point to the OpenJDK 21 installation in your Fish shell configuration. Add this to your `config.fish` or run it directly:

```bash
set -x JAVA_HOME /Users/macbookair/Library/Java/JavaVirtualMachines/openjdk-21.0.1/Contents/Home
```

### Maven and Gradle:
Since the `mvn` and `gradle` commands aren't recognized, Maven and Gradle are not installed globally. It's likely Android Studio has them internally, but they aren't available system-wide.

### Avoiding Redundancy with Android Studio:
You can still benefit from the versions of **Gradle** and **Maven** bundled with **Android Studio**. However, for CLI convenience and avoiding manual setup each time, you might want to install them globally via **brew**. This way, you get easy management of versions and direct CLI access.

### Installing Maven and Gradle via Brew:
To avoid any further "unknown command" issues, you can install both via **brew**:

- Install **Maven**:
  ```bash
  brew install maven
  ```

- Install **Gradle**:
  ```bash
  brew install gradle
  ```

After installation, you can confirm their availability by running:
```bash
mvn -version
gradle -version
```

This setup ensures you avoid redundancy while having access to these tools both in Android Studio and through the terminal.

---

```bash
nvim set_java_home_maven_gradle_install.md
```

*Timestamp: 2024-10-20*  
*Summary: Setting `JAVA_HOME` and installing Maven and Gradle globally while avoiding redundancy with Android Studio.*  
*Lines: 43, Characters: 2689*
