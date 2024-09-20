# Beernerd.io PWA Development Prompt

## Project Overview
Create a slick, futuristic Progressive Web App (PWA) for Beernerd.io, focusing on crafting both beer and technology to help people and build communities. Our flagship feature will be the Home Brew Recipe Builder, complemented by custom tools for business and IT intelligence, education on emerging technologies, development, and automation/optimization.

## Mission Statement
At Beernerd.io, we blend the art of brewing with innovative tech solutions to foster connections and enhance the craft beer experience. Our goal is to use both craft beer and technology as catalysts for community building and personal growth.

## Key Objectives
1. Develop user-friendly brewing tools and apps that empower enthusiasts
2. Create an inclusive online community for beer and tech enthusiasts
3. Provide educational resources on brewing techniques, beer styles, and emerging technologies
4. Organize virtual and in-person events to strengthen community bonds
5. Collaborate with local breweries and tech startups to drive innovation

## Design Guidelines
- Use the provided color palette:
  - Background: #a9a42c
  - Foreground: #040404
  - Accent 1: #FFFFFF
  - Accent 2: #8C8787
  - Accent 3: #CACACA
- Implement a futuristic, clean design that's optimized for UI/UX
- Utilize the provided logo and adhere to the brand guidelines in brandguidelines.pdf
- Typography:
  - Headings: Use Orbitron font, normal weight
  - Subtitles: Use Maitree font, normal weight, oblique style
  - Logo: Use Molle font, normal weight, oblique style
- Logo Usage:
  - Maintain spacing of at least 1/3 of the minimal logo dimension around the full logo
  - Use the full logo when possible, and the brand icon for space-constrained applications
  - Ensure proper contrast when using the logo on different backgrounds

## Project Structure
Based on the `/beernerd` directory:
- index.html (Home page)
- about.html
- projects.html
- blog/index.html
- shop.html
- css/styles.css
- js/app.js
- js/recipe-builder.js
- images/logo.svg
- manifest.json
- service-worker.js

## Features and Pages

### 1. Home Page (index.html)
- Implement a hero section with a prominent display of the Beer Nerd logo
- Create a brief introduction to Beer Nerd LLC, emphasizing our dual focus on craft beer and technology for community building
- Add navigation to other main sections (About, Projects, Blog, Shop)
- Include a featured section for the Home Brew Recipe Builder and community initiatives

### 2. About Page (about.html)
- Provide detailed information about Beer Nerd LLC
- Highlight the company's mission and vision
- Showcase the team or key personnel

### 3. Projects Page (projects.html)
- List and describe key projects or tools developed by Beer Nerd
- Highlight the Home Brew Recipe Builder
- Include brief descriptions and links to other custom tools

### 4. Blog Page (blog/index.html)
- Set up a blog layout with featured and recent posts
- Include an introduction post about Beer Nerd and the recipe calculator
- Discuss using AI tools to develop next-generation tools, agents, and content

### 5. Shop Page (shop.html)
- Create a placeholder for the Printify T-Shirt with George Washington design
- Implement a basic e-commerce structure for future products

### 6. Home Brew Recipe Builder
- Develop a user-friendly interface for inputting recipe parameters
- Implement accurate calculations for OG, FG, ABV, IBU, SRM, and other relevant measurements
- Create a function to generate and download a well-formatted PDF of the recipe, including the Beer Nerd logo

### 7. Community Hub (new page: community.html)
- Create a space for users to connect, share brewing experiences, and discuss tech innovations
- Implement a forum or discussion board
- Showcase upcoming virtual and in-person events
- Highlight community projects and collaborations

## Technical Requirements

1. PWA Implementation:
   - Create a manifest.json file with appropriate app information
   - Implement a service worker for offline functionality and caching
   - Ensure the app is installable on supported devices

2. Responsive Design:
   - Implement a mobile-first approach
   - Ensure the design is responsive and works well on all screen sizes

3. Performance Optimization:
   - Optimize images and assets for fast loading
   - Implement lazy loading for images and non-critical content
   - Minimize and bundle CSS and JavaScript files

4. Accessibility:
   - Ensure proper semantic HTML structure
   - Implement ARIA attributes where necessary
   - Maintain sufficient color contrast as per WCAG guidelines

5. SEO:
   - Implement proper meta tags for SEO
   - Create a sitemap.xml file
   - Ensure all pages have appropriate titles and descriptions

6. Integration:
   - Include conspicuous but not overly prominent promotion of City Brew Tours Austin
   - Set up the website for hosting on GitHub Pages

7. Code Quality:
   - Follow best practices for HTML, CSS, and JavaScript
   - Implement proper error handling and input validation
   - Use ES6+ features for JavaScript
   - Document code thoroughly with clear, concise comments

8. Version Control:
   - Set up a GitHub repository for the project
   - Implement proper branching strategy for development

9. Community Features:
   - Implement user profiles and authentication
   - Develop a system for user-generated content (recipes, tech tips, etc.)
   - Create a notification system for community events and discussions

## Development Process
1. Set up the basic project structure and implement the PWA essentials
2. Develop the core layout and styling, adhering to the brand guidelines
3. Implement the Home Brew Recipe Builder functionality
4. Create content for static pages (About, Projects)
5. Develop the blog structure and initial post
6. Implement the shop page with placeholder content
7. Optimize performance, accessibility, and SEO
8. Test thoroughly across different devices and browsers
9. Deploy to GitHub Pages
10. Develop the Community Hub features
11. Integrate community aspects throughout the site

Remember to regularly update this project outline as we pivot and refine our ideas during development. Our focus on crafting both beer and technology to help people and build communities should be reflected in all aspects of the project.

