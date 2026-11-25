# MobileWright

MobileWright is a mobile test automation framework with a Playwright-like API for writing and running tests on Android and iOS devices.

---

## 1. Requirements

| Tool | Requirement |
|---|---|
| Node.js | 22.12 or newer |
| Java JDK | 11 or newer |
| Android SDK | Installed |
| ADB | Available in PATH |
| Android device | Emulator or real device |

### Download & Verify

- **Node.js** — https://nodejs.org
- **Java JDK** — https://adoptium.net
- **Android SDK** — Install via [Android Studio](https://developer.android.com/studio) or the command-line tools
- **ADB** — Included with Android SDK platform-tools; add `platform-tools` to your system PATH

Verify installations:

```bash
node --version
java --version
adb --version
```

---

## 2. Check MobileWright Environment

Run the built-in doctor command to verify all dependencies are installed and configured correctly:

```bash
npx mobilewright doctor
```

This checks all required tools and reports any missing or misconfigured dependencies.

---

## 3. Create Your First MobileWright Project

```bash
npm init mobilewright@latest
```

The setup wizard will prompt you to select:

- **Programming language** — TypeScript or JavaScript
- **Platform** — Android or iOS
- **App bundle ID** — e.g. `asia.ifarmer.supplier.dev`
- **Test directory** — e.g. `tests`

---

## 4. Project Structure

After initialization, your project will look like this:

```
my-first-mobilewright/
│
├── mobilewright.config.ts
│
├── package.json
│
├── package-lock.json
│
└── tests/
    │
    └── example.spec.ts
```

- **`mobilewright.config.ts`** — Main config file (platform, bundleId, testDir, reporter)
- **`tests/example.spec.ts`** — Your test files go here

---

## 5. Open Project in VS Code

```bash
code .
```

---

## 6. Check Your Config File

Open `mobilewright.config.ts` and verify the settings match your app and device:

```ts
import { defineConfig } from 'mobilewright';

export default defineConfig({
  testDir: './tests',
  platform: 'android',
  bundleId: 'com.your.app',
  reporter: [['html', { open: 'never' }]],
});
```

Make sure:
- `platform` matches your target device (`android` or `ios`)
- `bundleId` matches your app's package name
- `testDir` points to the folder containing your test files

---

## 7. Run Your Tests

```bash
npx mobilewright test
```

Or use the npm script:

```bash
npm test
```

To run a specific test file:

```bash
npx mobilewright test tests/signup.spec.ts
```

---

## 8. MobileWright Codegen

Codegen lets you record interactions on your device and automatically generate locators and test code:

```bash
npx mobilewright codegen
```

This opens a recorder that:
- Captures every tap, swipe, and type action on your device
- Generates the corresponding MobileWright test code
- Lets you inspect element locators in real time

---

## 9. Generate HTML Test Report

Run tests with the HTML reporter:

```bash
npx mobilewright test --reporter html
```

View the report in your browser:

```bash
npx playwright show-report mobilewright-report
```

The report includes test results, screenshots, and step-by-step traces for each test run.
