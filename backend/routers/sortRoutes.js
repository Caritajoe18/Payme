import express from 'express';
import { sortEmployeesByDepartment, sortEmployeesByName, sortEmployeesByTypeOfStaff } from '../controller/sortStaff.js';

const router = express.Router();

router.get('/name', sortEmployeesByName);
router.get('/department', sortEmployeesByDepartment);
router.get('/staff-type', sortEmployeesByTypeOfStaff);

export default router;