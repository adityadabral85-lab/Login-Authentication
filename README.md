# Login Authentication Project

A beginner-friendly login authentication demo made with HTML, CSS, and JavaScript.

## Features

- User registration
- User login
- Password hashing with the browser Web Crypto API
- Protected dashboard page
- Logout functionality
- Demo users saved in browser local storage
- Responsive layout for mobile and desktop

## Files

- `index.html` - Authentication forms, dashboard, and page structure
- `style.css` - Styling, layout, forms, buttons, and responsive design
- `script.js` - Register, login, logout, protected view, password hashing, and storage logic

## How to Run

Open `index.html` in your browser.

If Web Crypto does not work by directly opening the file, run the project with the VS Code Live Server extension.

## Important Note

This is a frontend-only beginner demo. It is useful for learning authentication flow, but real production authentication should use a backend server, database, HTTPS, secure sessions, and stronger password handling.

## How to Push to GitHub

```bash
git init
git add .
git commit -m "Add login authentication project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace `YOUR-USERNAME` and `YOUR-REPOSITORY` with your GitHub account and repository name.
