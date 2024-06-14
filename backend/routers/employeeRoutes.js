import express from 'express';
import { deleteEmployee, getAllEmployees, getAnEmployee, registerEmployee, searchEmployees, updateEmployee } from '../controller/employee.js';

const router = express.Router();

router.post('/register', registerEmployee);
router.get('/get-all',getAllEmployees);
router.get('/get-one/:id', getAnEmployee);
router.patch('/update/:id', updateEmployee);
router.delete('/delete/:id', deleteEmployee);
router.get('/search', searchEmployees);

export default router;