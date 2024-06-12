import express from 'express';
import { signUp } from '../controller/user.js';

const router = express.Router();

// Routes
router.get('/', (req, res) => {
  res.send('Hello, world!');
});

router.post('/signup', signUp);

export default router;
