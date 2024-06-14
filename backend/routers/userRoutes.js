import express from 'express';
import { login, signUp } from '../controller/user.js';

const router = express.Router();


router.get('/', (req, res) => {
  res.send('Hello, world!');
});

router.post('/signup', signUp);
router.post('/login', login);

export default router;
