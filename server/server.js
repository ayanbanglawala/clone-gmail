const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const connectDB = require("./db/dbConnect");
const User = require("./db/user");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Mails = require("./db/mail");


app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to the database
connectDB();

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Log the received request body
    console.log(req.body);

    // Check if any fields are missing
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user instance
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Successfully registered" });
  } catch (err) {
    console.error(err);
    // Handle unique constraint error for username/email
    if (err.code === 11000) {
      return res.status(400).json({ error: "Username or email already exists." });
    }
    res.status(500).json({ error: "Server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token, do not include password in the payload
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      "secretkey123", // Move this to an environment variable for security in production
      { expiresIn: "1h" } // Token expiration time
    );

    // Send back the response with user info and token
    res.json({ message: "Logged in successfully", user: { username: user.username, email: user.email }, userToken: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/inbox", async (req, res) => {
  try {
    const { email } = req.body;

    // Fetch all rows where reciever matches the provided email
    const inboxData = await Mails.find({ reciever: email });

    if (inboxData.length === 0) {
      return res.status(404).json({ message: "No inbox data found for this email" });
    }

    
    res.status(200).json(inboxData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.post("/sendmail", async (req,res)=>{
  try{
    const  {sender, reciever, subject, message} = req.body;
    console.log(req.body);
    if (!sender || !reciever || !subject || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const mail = new Mails({ sender, reciever, subject, message });
    await mail.save();

    res.status(201).json({ message: "Successfully registered" });
  }
  catch(err){
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }


})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
