### Project Documentation

---

## Project Name: **MERN BOILERPLATE**

### Overview
This project is a simple frontend web application built using Node.js, Express, HTML, CSS, and JavaScript. The application serves static files and provides a basic structure for expanding the app with new pages and features.

### Table of Contents
1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Running the Application](#running-the-application)
4. [Adding New Pages](#adding-new-pages)
5. [Environment Variables](#environment-variables)
6. [Deployment](#deployment)
7. [Additional Notes](#additional-notes)

---

### Getting Started

#### Prerequisites
- [Node.js](https://nodejs.org/) (v12.x or higher)
- [npm](https://www.npmjs.com/)

#### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/BabaScience/mern-boilerplate
   cd mern-boilerplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

### Project Structure

```plaintext
root/
├── public/
│   ├── css/
│   │   └── styles.css          # Global styles
│   ├── js/
│   │   └── scripts.js          # Global scripts
│   └── images/                 # Image assets
├── routes/
│   └── index.js                # Main route file
├── views/
│   ├── index.html              # Main page template
│   └── about.html              # Example of an additional page
├── .env                        # Environment variables (ignored by git)
├── .gitignore                  # Git ignore file
├── app.js                      # Main server file
└── package.json                # Project metadata and dependencies
```

---

### Running the Application

#### Development Mode
To start the server with auto-reloading (using `nodemon`):
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

#### Production Mode
To start the server in production mode:
```bash
npm start
```

---

### Adding New Pages

To add a new page to the application, follow these steps:

1. **Create the HTML file**:
   - Create a new HTML file in the `views/` directory.
   - Example: `views/about.html`.

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <link rel="stylesheet" href="/css/styles.css">
       <title>About Us</title>
   </head>
   <body>
       <h1>About Us</h1>
       <p>This is the about page.</p>
       <script src="/js/scripts.js"></script>
   </body>
   </html>
   ```

2. **Add a new route**:
   - Open `routes/index.js`.
   - Add a new route to serve the newly created HTML file.

   ```javascript
   const express = require('express');
   const router = express.Router();
   const path = require('path');

   // Existing route for the home page
   router.get('/', (req, res) => {
       res.sendFile(path.join(__dirname, '../views/index.html'));
   });

   // New route for the About page
   router.get('/about', (req, res) => {
       res.sendFile(path.join(__dirname, '../views/about.html'));
   });

   module.exports = router;
   ```

3. **Link the new page**:
   - Update the navigation links in `views/index.html` (or any other pages) to include the new page.
   
   ```html
   <nav>
       <a href="/">Home</a>
       <a href="/about">About</a>
   </nav>
   ```

4. **Add CSS/JS (Optional)**:
   - If you need specific styles or scripts for the new page, you can either:
     - Add them to the global files (`styles.css` or `scripts.js`), or
     - Create new CSS/JS files in the `public/css/` or `public/js/` directories and link them in your new HTML file.

---

### Environment Variables

The application uses environment variables stored in a `.env` file to manage configuration. This file should be created in the root of the project and should not be committed to version control.

Example `.env` file:
```plaintext
PORT=3000
```

- **PORT**: The port on which the server will run. Default is `3000`.

---

### Deployment

1. **Prepare for Deployment**:
   - Ensure all your environment variables are set correctly in the production environment.
   - Make sure your code is committed and pushed to a remote repository (e.g., GitHub).

2. **Deploy to Heroku** (or another platform):
   - Log in to Heroku:
     ```bash
     heroku login
     ```
   - Create a new Heroku app:
     ```bash
     heroku create
     ```
   - Push your code to Heroku:
     ```bash
     git push heroku main
     ```
   - Open your deployed app:
     ```bash
     heroku open
     ```

3. **Environment Configuration**:
   - Set environment variables on Heroku:
     ```bash
     heroku config:set PORT=80
     ```

---

### Additional Notes

- **Static Files**: Place all static assets (CSS, JS, images) inside the `public/` directory. These files are served directly by Express.
- **Testing**: While this basic setup does not include testing, consider adding unit tests for your routes and functions as the project grows.
- **Security**: Use environment variables to store sensitive information, and ensure that your `.env` file is included in your `.gitignore`.

---

This documentation provides the essential information needed to understand, extend, and deploy this frontend application. As the project grows, make sure to update the documentation accordingly.