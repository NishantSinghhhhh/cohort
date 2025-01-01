const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Define methods
const methods = {
  add: ({ a, b }) => a + b,
  subtract: ({ a, b }) => a - b,
};

// JSON-RPC handler
app.post("/", (req, res) => {
  const { jsonrpc, method, params, id } = req.body;

  if (jsonrpc !== "2.0") {
    return res.status(400).json({ error: "Invalid JSON-RPC version" });
  }

  if (!methods[method]) {
    return res.status(400).json({ error: `Method ${method} not found` });
  }

  try {
    const result = methods[method](params);
    res.json({ jsonrpc: "2.0", result, id });
  } catch (error) {
    res.status(500).json({ jsonrpc: "2.0", error: error.message, id });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`JSON-RPC Server is running on http://localhost:${PORT}`);
});
