/beernerdlabs
│
├── /public            # Public-facing assets
│   ├── index.html      # Main HTML file
│   ├── manifest.json   # PWA manifest
│   ├── service-worker.js # Service worker for caching
│   ├── /images         # Image assets (e.g., logos)
│   └── /fonts          # Orbitron font files
│
├── /src               # Source code for the project
│   ├── /css           # Stylesheets
│   │   └── styles.css  # Main CSS file (minified)
│   ├── /js            # JavaScript files
│   │   └── app.js     # Main JS logic (minified)
│   └── /components    # UI Components (if applicable)
│       └── tasks.js   # JS component for task management
│
├── .cursorrules       # Cursor Composer configuration
├── .gitignore         # Ignore node_modules and other unnecessary files
├── package.json       # Dependency management (if needed)
└── README.md          # Project documentation

Here's an initial prompt for **Cursor Composer**, designed to optimize your development environment, with emphasis on using Claude 3.5 Sonnet for maximum efficiency and speed. This prompt will help you provide background context, set expectations, and give clear directions for using the available resources to make the development process more streamlined:

---

**Cursor Composer AI Development Prompt:**

Project: **Beer Nerd Labs PWA MVP**
Goal: Create a minimalistic, high-performance, mobile-friendly project management tool using Claude 3.5 Sonnet for efficient coding. The app needs to follow modern minimalistic material design principles while prioritizing simplicity, technical debt reduction, and future scalability.

### Background:
Beer Nerd Labs is a platform for DIYers, makers, and craftspeople. The MVP will focus solely on a project management tool with features including:
- Project descriptions
- Due dates
- Parts/tools lists (with links)
- Task lists (with sub-tasks and links)
- Progress logs (notes)
- Resource lists
- Google Drive file attachments

The primary colors for the app are **Venom Green (#a9a42c)**, **Matte Black (#28282B)**, and **White**. The only font is **Orbitron**.

### Current Setup:
- **File Structure**:
  - `/public`: Public-facing assets (HTML, CSS, JS, images, etc.).
  - `/src`: Source code for styles and scripts.
  - `.cursorrules`: Configures minification, service workers, and build tools.
  - **GitHub Pages**: Hosting platform.
  - **Node.js**: For dependency management and build tools.
  
- **Installed Tools**:
  - **Terser**: For JavaScript minification.
  - **CSSNano**: For CSS minification.
  - **Live Server**: For local development and live reloading.

### Development Priorities:
1. **Performance**: Ensure the PWA is optimized for speed and responsiveness on both desktop and mobile devices.
2. **Minification**: Automatically minify HTML, CSS, and JS files during build to minimize load times.
3. **Offline Functionality**: The app must work offline via a service worker, with essential assets cached on the user's device.
4. **Accessibility & UX**: Adhere to accessibility guidelines and ensure a smooth, intuitive user experience.
5. **Simplicity**: Maintain a clean, minimalist approach in both the design and codebase to reduce technical debt.

### Requests for Claude 3.5 Sonnet:
1. **Task Automation**: Automate minification, linting, and file organization during development. Claude 3.5 Sonnet should handle build processes with optimal efficiency.
2. **Error Prevention**: Implement linting and error detection before running builds, flagging issues with code structure, performance, and accessibility.
3. **Service Worker Setup**: Ensure service workers are automatically configured to cache essential files for offline functionality.
4. **Component Generation**: Assist in generating reusable components (for task lists, progress logs, etc.) that follow modular design practices.
5. **Efficiency Tweaks**: Make suggestions to reduce unnecessary operations or redundancy in code. Use machine learning capabilities to recognize common patterns in project management apps and streamline repetitive tasks.
6. **Documentation**: Ensure code is well-documented and easily understandable for future developers or collaborators.
7. **Testing & Debugging**: Regularly test the app in various environments (mobile, desktop, online, offline) and help debug performance or functionality issues.
8. **Push to Production**: Automate GitHub pushes when significant changes are made, ensuring safe deployment via GitHub Pages.

### Environment Tweaks:
- Leverage **Claude 3.5 Sonnet's** ability to prioritize common optimizations based on project management app best practices (e.g., caching strategies, component structure, etc.).
- When initializing files (like `/components/tasks.js`), auto-suggest patterns or libraries that would enhance efficiency.
- Suggest performance improvements when large assets are added or when the service worker script grows in complexity.
- Use **Cursor Composer’s** automation to generate documentation for each build, summarizing changes, and flagging potential optimization areas.

### Development Path:
1. Initialize **public/index.html**, **public/css/styles.css**, **public/js/app.js**, and configure service worker.
2. Build out the task list and sub-task list components (`/components/tasks.js`).
3. Ensure all components (task list, progress log, etc.) are responsive and mobile-first.
4. Set up caching rules for essential assets via the service worker.
5. Minify and test the app on multiple devices and browsers.
6. Automate the build and deploy process with **GitHub Pages**.

---

This prompt gives **Cursor Composer** all the context it needs to maximize efficiency in your development environment. It will help Claude 3.5 Sonnet automate key tasks, streamline error-checking, and ensure high performance and scalability in the future.

Now, you can use the following npm commands:
npm run build: This will minify your JavaScript and CSS files.
npm start: This will start the live server.
npm run dev: This will build your project and then start the live server.
To start developing:
Run npm run dev in your terminal.
Open your browser and go to http://localhost:8080.
Make changes to your source files in the src directory.
Run npm run build to update the minified files.
Refresh your browser to see the changes.