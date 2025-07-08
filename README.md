# Internal Audit App (React Native)

A simple, modern mobile app for internal auditing. Simulates a SaaS scenario with role-based access, a multi-step audit form, persistent audit history, and a WebView-based policy/documentation viewer.

---

## 🚀 Features

- **Role-Based Login** (Admin, Auditor, Viewer)
- **Multi-Step Audit Form** (ratings, checklist, comments)
- **Form Validation** (cannot submit incomplete audits)
- **Audit Submission Summary**
- **Persistent Audit History** (stored with AsyncStorage)
- **Delete Audits (Admin-only)**
- **WebView Policy/Manual Viewer**
- **Modern, Responsive UI**

---

## 📁 Project Structure

```
src/
├── assets/
│   └── policy.html              # Policy document loaded in WebView
├── context/
│   └── RoleContext.js           # Role context and provider
├── navigation/
│   └── AppNavigator.js          # Stack navigator for screens
├── screens/
│   ├── AuditForm/
│   │   ├── StepOne.js           # Step 1: Rating
│   │   ├── StepTwo.js           # Step 2: Checklist
│   │   └── StepThree.js         # Step 3: Comments
│   ├── LoginScreen.js           # Role selection
│   ├── RoleHomeScreen.js        # Dashboard
│   ├── AuditFormScreen.js       # Multi-step form container
│   ├── AuditSummaryScreen.js    # Submission summary
│   ├── AuditHistoryScreen.js    # List of audits
│   └── PolicyViewerScreen.js    # WebView for policy/manual
├── utils/
│   └── roleUtils.js             # Role-checking helpers
```

---

## 🧑‍💼 Roles & Access

| Role     | Can Submit Audit | View History | Delete Audits | View Policy |
|----------|------------------|--------------|---------------|-------------|
| Admin    | ❌               | ✅           | ✅            | ✅          |
| Auditor  | ✅               | ✅           | ❌            | ✅          |
| Viewer   | ❌               | ✅           | ❌            | ✅          |

---

## 🛠 Setup & Usage

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/internal-audit-app.git
cd internal-audit-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App

- For Expo:
  ```bash
  npm start
  ```
- For iOS:
  ```bash
  npm run ios
  ```
- For Android:
  ```bash
  npm run android
  ```

---

## 📝 Notes & Decisions
- **No backend required:** All data is stored locally using AsyncStorage.
- **Form validation:** Users cannot proceed or submit unless all required fields are filled.
- **Modern UI:** Uses custom-styled buttons, cards, and layouts for a clean experience.
- **WebView:** Loads a local HTML file for policy/manual viewing.
- **Role context:** Managed via React Context API.

---

## ❓ Troubleshooting
- If you see errors about missing dependencies, run `npm install` again.
- For issues with AsyncStorage, ensure you have the correct version for your React Native setup.
- If the app doesn't reload changes, restart the Metro bundler.

---

## 📄 License
MIT
