import Employee from '../models/employeeModel.js';

import { Op } from 'sequelize';


export const registerEmployee = async (req, res) => {
  const { name, email, department, typeOfStaff, paymentType } = req.body;

  // Validate required fields
  if (!name || !email || !department || !typeOfStaff || !paymentType) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Check if the email already exists
    const existingEmployee = await Employee.findOne({ where: { email } });
    if (existingEmployee) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create a new employee
    const newEmployee = await Employee.create({
      name,
      email,
      department,
      typeOfStaff,
      paymentType,
    });

    // Respond with the created employee
    res.status(201).json({ employee: newEmployee });
  } catch (error) {
    console.error('Error registering employee:', error.message);
    res.status(500).json({ error: 'An error occurred while registering the employee' });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    // Fetch all employees
    const employees = await Employee.findAll();
  
    // Respond with the list of employees
    res.status(200).json( {Message:'All employees retrieves successfully', employees });
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching the employees' });
  }
};


export const getAnEmployee = async (req, res) => {
  const { id } = req.params;  
  
  try {
    // Find the employee by ID
    const employee = await Employee.findByPk(id);
  
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
  
    // Respond with the found employee
    res.status(200).json({ employee });
  } catch (error) {
    console.error('Error fetching employee:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching the employee' });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;  
  const { name, email, department, typeOfStaff, paymentType } = req.body;

  // Validate required fields
  if (!name && !email && !department && !typeOfStaff && !paymentType) {
    return res.status(400).json({ error: 'At least one field is required to update' });
  }

  try {
    // Find the employee by ID
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Update the employee's information
    if (name) employee.name = name;
    if (email) {
      // Check if the email already exists
      const existingEmployee = await Employee.findOne({ where: { email } });
      if (existingEmployee && existingEmployee.id !== id) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      employee.email = email;
    }
    if (department) employee.department = department;
    if (typeOfStaff) employee.typeOfStaff = typeOfStaff;
    if (paymentType) employee.paymentType = paymentType;

    // Save the updated employee
    await employee.save();

    // Respond with the updated employee
    res.status(200).json({ employee });
  } catch (error) {
    console.error('Error updating employee:', error.message);
    res.status(500).json({ error: 'An error occurred while updating the employee' });
  }
};


export const deleteEmployee = async (req, res) => {
  const { id } = req.params;  
  
  try {
    // Find the employee by ID
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
  
    // Delete the employee
    await employee.destroy();
  
    // Respond with a success message
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error.message);
    res.status(500).json({ error: 'An error occurred while deleting the employee' });
  }
};




export const searchEmployees = async (req, res) => {
  const { query } = req.query; 

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const employees = await Employee.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { email: { [Op.like]: `%${query}%` } },
          { department: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    res.status(200).json(employees);
  } catch (error) {
    console.error('Error searching employees:', error.message);
    res.status(500).json({ error: 'An error occurred while searching for employees' });
  }
};




