import User from '../models/userModel.js';
import { signUpSchema, loginSchema } from '../validation/user.js';

export const signUp = async (req, res) => {
  console.log('Received sign-up request:', req.body);
    
  // Validate the request body
  const { error } = signUpSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((err) => err.message) });
  }
  
  const { name, email, password } = req.body;
  
  try {
    // Check if the user with the provided email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
  
    // Create the new user
    const user = await User.create({ name, email, password });
    console.log('User created successfully:', user);
    res.status(201).json({ user });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: error.message });
  }
};


export const login = async (req, res) => {
  console.log('Received login request:', req.body);
  
  // Validate the request body (email and password)
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    console.log('Validation error:', error.details);
    return res
      .status(400)
      .json({ errors: error.details.map((err) => err.message) });
  }
  
  const { email, password } = req.body;
  
  try {
    // Find the user by email
    const user = await User.findOne({ email });
  
    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  
    // Compare password hashes (assuming password is hashed during signup)
    const isMatch = await user.comparePassword(password);
  
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  
    // Login successful, send user data (without password)
    res.status(200).json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error('Error logging in user:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
  