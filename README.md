# Internal Audit App (React Native)

A professional-grade mobile app for internal auditing with advanced features. Simulates a SaaS scenario with role-based access, multi-step audit forms, persistent storage, and comprehensive audit management.

---

## 🚀 Advanced Features

- **Role-Based Login** (Admin, Auditor, Viewer)
- **Multi-Step Audit Form** with progress indicators
- **Real-time Form Validation** (cannot submit incomplete audits)
- **Persistent Audit History** (AsyncStorage with search & sort)
- **Advanced Dashboard** with audit statistics
- **Search & Filter** functionality for audit history
- **Modern, Responsive UI** with loading states
- **Professional UX** with user feedback and error handling

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
│   │   ├── StepOne.js           # Step 1: Rating (1-5 scale)
│   │   ├── StepTwo.js           # Step 2: Checklist items
│   │   └── StepThree.js         # Step 3: Comments
│   ├── LoginScreen.js           # Role selection with modern UI
│   ├── RoleHomeScreen.js        # Dashboard with statistics
│   ├── AuditFormScreen.js       # Multi-step form with progress
│   ├── AuditSummaryScreen.js    # Submission summary
│   ├── AuditHistoryScreen.js    # Searchable audit list
│   └── PolicyViewerScreen.js    # WebView for policy/manual
├── utils/
│   └── roleUtils.js             # Role-checking helpers
```

---

## 🧑‍💼 Roles & Access Control

| Role     | Submit Audits | View History | Delete Audits | View Policy | Dashboard Stats |
|----------|---------------|--------------|---------------|-------------|-----------------|
| Admin    | ❌            | ✅           | ✅            | ✅          | ✅              |
| Auditor  | ✅            | ✅           | ❌            | ✅          | ✅              |
| Viewer   | ❌            | ✅           | ❌            | ✅          | ✅              |

---

## 🎯 Key Features Explained

### **Multi-Step Form with Progress**
- Visual progress bar showing completion status
- Step-by-step validation preventing incomplete submissions
- Modern rating system (1-5 scale) with visual feedback
- Interactive checkboxes with custom styling
- Rich text input for detailed comments

### **Advanced Audit History**
- **Search functionality** across ratings, comments, and checklist items
- **Sort options** (newest/oldest first)
- **Real-time filtering** with instant results
- **Professional empty states** with helpful messaging
- **Admin-only deletion** with confirmation dialogs

### **Dashboard Statistics**
- **Total audit count** display
- **Recent activity** (last 7 days)
- **Role-specific information** cards
- **Quick access** to all features

### **Data Persistence**
- **AsyncStorage integration** for offline functionality
- **Automatic data recovery** on app restart
- **Error handling** for storage operations
- **Real-time updates** across all screens

---

## 🛠 Setup & Usage

### 1. Clone the Repository
```bash
git clone https://github.com/mehraritesh/internal-audit-app.git
cd internal-audit-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Application
```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

---

## 📱 User Experience Highlights

### **Form Experience**
- **Progress tracking** with visual indicators
- **Validation feedback** preventing user errors
- **Loading states** during submission
- **Success confirmations** with navigation

### **History Management**
- **Instant search** across all audit data
- **Smart sorting** by date
- **Responsive design** for all screen sizes
- **Professional card layouts** with shadows

### **Dashboard Insights**
- **Real-time statistics** loading
- **Role-based information** display
- **Quick action buttons** for common tasks
- **Visual hierarchy** for better navigation

---

## 🔧 Technical Implementation

### **State Management**
- React Context for role management
- Local state for form data and UI states
- AsyncStorage for persistent data storage

### **Navigation**
- React Navigation v6 with stack navigator
- Screen-specific options and headers
- Proper back navigation handling

### **UI/UX Design**
- Custom styled components (no external UI libraries)
- Consistent color scheme (#1976d2 primary)
- Responsive layouts with proper spacing
- Loading indicators and error states

### **Data Flow**
- Form validation at each step
- AsyncStorage for data persistence
- Real-time updates across screens
- Error handling for all async operations

---

## 📝 Development Decisions

- **No external UI libraries** - Custom styling for full control
- **AsyncStorage over SQLite** - Simpler for demo, easily upgradable
- **Role-based navigation** - Different flows for different user types
- **Progressive enhancement** - Basic features work, advanced features add value
- **Mobile-first design** - Optimized for touch interactions

---

## 🚀 Performance Optimizations

- **Efficient re-renders** with proper state management
- **Lazy loading** of screen components
- **Optimized list rendering** with FlatList
- **Memory management** with proper cleanup

---

## ❓ Troubleshooting

- **Metro bundler issues**: Restart with `npm start --reset-cache`
- **AsyncStorage errors**: Ensure proper permissions on device
- **Navigation problems**: Check screen registration in AppNavigator
- **UI inconsistencies**: Verify device-specific styling

---

## 📄 License
MIT License - Feel free to use and modify for your projects.

---

**Built with ❤️ using React Native and Expo**

