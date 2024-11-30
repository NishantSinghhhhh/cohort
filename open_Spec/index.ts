import express, { Request, Response } from 'express';

// Initialize Express app
const app = express();
const port = 3000;

// Define User type
interface User {
  id: number;
  name: string;
  age: number;
}

// Sample data: Two users
const users: User[] = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
];

// Middleware to parse JSON
app.use(express.json());

// Home route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Express Server!');
});

// Get all users
app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

// Get a single user by ID
app.get('/users/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
