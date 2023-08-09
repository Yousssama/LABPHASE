const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors"); // Import the cors package

const app = express();

// Connect to database
connectDB();
// Init middleware
app.use(express.json({ extended: true }));

// Use the cors middleware
app.use(cors());

// Define a basic route for testing purposes
app.use((req, res) => {
  res.send("API is running...");
});

// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started on port:", PORT));

