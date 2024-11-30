import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from './openSpec.yaml'; // If your spec is in YAML format

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

// Load OpenAPI spec
const swaggerDocument = YAML.load('./openapi.yaml'); // Path to your OpenAPI YAML file

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Home route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Express Server! Visit /api-docs for API documentation.');
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
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});
