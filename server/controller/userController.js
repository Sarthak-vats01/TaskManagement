import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || "Sarthak8022@@@"; // Use environment variable for security

// Sign-up controller
async function signUp(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .send("All fields are required: name, email, and password.");
  }

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send(`User ${email} already exists`);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      throw new Error("Error hashing the password");
    }

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const userId = newUser._id;

    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).send({ token, userId, token });
  } catch (error) {
    res.status(500).send(`Error in signup: ${error.message}`);
  }
}

// Sign-in controller
async function signIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Both email and password are required.");
  }

  try {
    // Find the user by email
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .send(`Invalid credentials - user ${email} does not exist`);
    }

    // Compare the password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid credentials - Password incorrect");
    }

    const userId = existingUser._id;

    // Generate JWT
    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({ token, userId, token });
  } catch (error) {
    res.status(500).send(`Server error: ${error.message}`);
  }
}

export { signUp, signIn };
