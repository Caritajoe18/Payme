import Employee from '../models/employeeModel.js';


export const sortEmployeesByName = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      order: [['name', 'ASC']],
    });
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error sorting employees by name:', error.message);
    res.status(500).json({ error: 'An error occurred while sorting employees by name' });
  }
};

export const sortEmployeesByDepartment = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      order: [['department', 'ASC']],
    });
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error sorting employees by department:', error.message);
    res.status(500).json({ error: 'An error occurred while sorting employees by department' });
  }
};


export const sortEmployeesByTypeOfStaff = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      order: [['typeOfStaff', 'ASC']],
    });
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error sorting employees by type of staff:', error.message);
    res.status(500).json({ error: 'An error occurred while sorting employees by type of staff' });
  }
};
