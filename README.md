# 🔐 VECTORLAB INJECTIONS

A hands-on web laboratory for mastering injection attack vulnerabilities. This platform provides real-world scenarios with SQL, NoSQL, LDAP, XPath, and GraphQL injection attacks, designed to build practical security knowledge through interactive experimentation in a safe, controlled sandbox environment.

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=101010)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4+-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=101010)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white&labelColor=101010)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white&labelColor=101010)](https://nodejs.org/)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6?style=for-the-badge&logo=css3&logoColor=white&labelColor=101010)](https://www.w3schools.com/css/)
[![Lucide Icons](https://img.shields.io/badge/Lucide-Icons-000000?style=for-the-badge&logo=lucide&logoColor=white&labelColor=101010)](https://lucide.dev/)

## 🎯 Features

* **Five Interactive Attack Modules** with real vulnerability patterns and practical examples
* **Embedded Authentication System** with intelligent pattern detection
* **Professional Responsive Design** optimized for all devices
* **Comprehensive Educational Resources** for each vulnerability type

## 🛠️ Technologies Used

### Development Environment

* **Node.js 18+** – JavaScript runtime providing development tooling and package management
* **npm 9+** – JavaScript package manager for dependency resolution

### Frontend Framework & Bundler

* **React 18** – Modern UI library enabling interactive components and state management
* **Vite 5.4+** – Next-generation bundler providing fast development server and optimized production builds

### Styling & Icons

* **CSS3** – Modern styling with custom properties, animations, and responsive layouts
* **Lucide React** – Beautiful, consistent icon system for UI components

## 📦 Installation and Configuration

### Requirements

* Node.js 18 or higher (LTS version recommended)
* npm 9+ or yarn
* Git for version control
* Modern web browser (Chrome, Firefox, Safari, Edge)

### 1. Clone the repository

```bash
git clone https://github.com/TerrazasJr316/VectorLab-Injections.git
cd VectorLab-Injections
```

### 2. Install dependencies

```bash
# Using npm
npm install

# Using yarn (optional)
yarn install
```

### 3. Run development server

```bash
# Using npm
npm run dev

# Using yarn (optional)
yarn dev
```

The application will be available at:
* **Local:** http://localhost:5173/
* **Network:** Check console output for network URL if needed

Port 5173 may be occupied; Vite automatically uses the next available port.

### 4. Build for production

```bash
# Using npm
npm run build

# Using yarn (optional)
yarn build
```

The compiled application will be generated in the `dist/` folder, ready for deployment to any static hosting service.

## 🎓 Security Training Workflow

### Attack Demonstration Process

1. **Select Attack Type** - Navigate to one of five injection modules using the top navigation bar
2. **Study Vulnerability** - Read detailed explanations of the attack vector and common patterns
3. **Practice Exploitation** - Use embedded login form to test injection payloads
4. **Real-Time Validation** - System detects and validates injection attempts
5. **View Results** - Successful exploits redirect to profile page with attack metadata
6. **Learn Prevention** - Understand defense strategies and secure coding practices

### Injection Detection Capabilities

Each module contains specialized pattern detection for its attack type:

* **SQL** - Comment syntax (--), logical operators (OR), UNION-based queries
* **NoSQL** - Operator syntax ($ne, $gt, $lt, $regex, $where), object manipulation
* **LDAP** - Wildcard patterns (*), filter construction ((&, (|)), boolean operators
* **XPath** - Boolean-based conditions, union-based queries, quote manipulation
* **GraphQL** - Schema introspection (__schema), query aliases, mutation injection

## 📁 Project Structure

```bash
VectorLab-Injections/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx           # Top navigation menu with attack selection
│   │   ├── Navigation.css           # Navigation styling
│   │   ├── Login.jsx                # Standalone login demonstration page
│   │   ├── Login.css                # Login component styling
│   │   ├── SimpleLogin.jsx          # Embedded login form for each module
│   │   ├── SimpleLogin.css          # Embedded login styling
│   │   ├── ProfilePage.jsx          # Post-authentication user profile display
│   │   ├── ProfilePage.css          # Profile page styling
│   │   ├── attacks/                 # Injection modules
│   │   └── attacks.css              # Shared attack module styling
│   ├── App.jsx                      # Root application component with routing
│   ├── App.css                      # Global application styling
│   ├── main.jsx                     # React application entry point
│   └── index.css                    # Global CSS styles and resets
├── index.html                       # HTML entry point
├── vite.config.js                   # Vite build configuration
└── package.json                     # Project dependencies and scripts
```

## 🐛 Troubleshooting

**Error: Port 5173 is already in use**

* Vite automatically attempts the next available port (5174, 5175, etc.)
* Monitor terminal output to identify the assigned port
* Alternatively, specify a custom port: `npm run dev -- --port 3000`

**Error: Dependencies fail to install**

* Clear npm cache and remove dependency directories: `rm -rf node_modules package-lock.json`
* Reinstall all dependencies: `npm install`
* For persistent issues, try: `npm cache clean --force` then reinstall

**Error: Build fails with module errors**

* Verify Node.js version with `node --version` (must be 18 or higher)
* Clear build artifacts: `rm -rf dist/`
* Attempt forced rebuild: `npm run build -- --force`
* Check for syntax errors in recently modified files

**Error: Application runs but page is blank**

* Check browser console for JavaScript errors (F12 Developer Tools)
* Verify all dependencies installed correctly
* Clear browser cache and hard-refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)

## ❓ FAQ

* **What exactly are injection attacks?** - Injection attacks occur when attackers insert malicious code into user input fields to manipulate application behavior, bypass security controls, or access unauthorized data. [Read OWASP's detailed guide](https://owasp.org/www-community/attacks/injection)

* **Is this a real-world security concern?** - Absolutely critical. OWASP consistently ranks injection attacks as the #1 web application vulnerability. Understand and prevent it seriously. [OWASP Top 10](https://owasp.org/www-project-top-ten/)

* **Can I use this for security testing?** - Yes, but ONLY on systems you own or have explicit written permission to test. Unauthorized access is illegal. Always get proper authorization first.

* **How do I deploy this application?** - The `dist/` folder contains production-ready files. Deploy to services like Vercel, Netlify, GitHub Pages, AWS S3, or any static file hosting.

* **Can I contribute to this project?** - Contributions welcome! Submit pull requests with improvements, keep code consistent with existing style, and ensure all tests pass before submitting.

* **Is there a live demo available?** - Check the repository's GitHub Pages link or deployment status for a live version of VectorLab.

## ✉️ Contact me & Social Media

### 💻 Computer Systems Engineering

Adaptable and flexible professional with strong critical thinking, solid problem-solving skills, and a collaborative, responsible approach. Specializing in backend development, databases, cybersecurity, and web security research.

If you find this project useful, you can support it by giving a "☆ Star" to the repository. Your support helps others discover this educational resource.

![Email](https://img.shields.io/badge/Gmail-terrazasjosue0%40gmail.com-EA4335?style=for-the-badge&logo=Gmail&logoColor=white&labelColor=101010)
[![GitHub](https://img.shields.io/badge/GitHub-%40TerrazasJr316-181717?style=for-the-badge&logo=GitHub&logoColor=white&labelColor=101010)](https://github.com/TerrazasJr316)
[![Facebook](https://img.shields.io/badge/Facebook-%40Josu%C3%A9_Terrazas-0866FF?style=for-the-badge&logo=Facebook&logoColor=white&labelColor=101010)](https://facebook.com/josue.terrazasmendoza)
[![Instagram](https://img.shields.io/badge/Instagram-%40jos__mdz316-E4405F?style=for-the-badge&logo=Instagram&logoColor=white&labelColor=101010)](https://instagram.com/jos_mdz316/)

---

**Happy hacking and learning!** 🔐
