import User from '../models/userModel.js';
import {signUpSchema} from '../validation/user.js';

//import { validationResult } from 'express-validator';

export const signUp = async (req, res) => {
  console.log('Received sign-up request:', req.body);
  // Validate the request body
  const { error } = signUpSchema.validate(req.body, { abortEarly: false });
  if (error) {
    console.log('Validation error:', error.details); 
    return res.status(400).json({ errors: error.details.map(err => err.message) });
  }
    
  const { name, email, password } = req.body;
    
  try {
    const user = await User.create({ name, email, password });
    console.log('User created successfully:', user); 
    res.status(201).json({ user });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: error.message });
  }
};