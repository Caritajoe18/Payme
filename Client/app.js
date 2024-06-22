import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// ES6 way to handle __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'Client/Public' directory
app.use(express.static(path.join(__dirname, '../Client/Public')));

// Define a route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for the signup page
app.get('/signup', (req, res) => {
  const signupPath = path.join(__dirname, 'Client/Views/signup.html');
  console.log(`Serving signup page from: ${signupPath}`);
  res.sendFile(signupPath);
});

// Route for the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'Client/Views/login.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
