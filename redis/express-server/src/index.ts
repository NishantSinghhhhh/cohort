import express from "express";
import { createClient } from "redis";

const client = createClient();

// Connect to Redis with error handling
(async () => {
  try {
    await client.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
})();

const app = express();
app.use(express.json());

// Handle POST request
app.post("/submit", async (req, res) => {
  const { problemId, userId, code, language } = req.body;

  try {
    // Push submission to Redis list
    await client.lPush(
      "Submission",
      JSON.stringify({ problemId, userId, code, language })
    );

    res.json({ message: "Submission Received" });
  } catch (error) {
    console.error("Error adding to Redis:", error);
    res.status(500).json({ message: "Error processing submission" });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
