import { DataTypes, Model } from 'sequelize';
import db from '../db.js';
import Employee from './employeeModel.js';

class Payment extends Model {}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Employee,
        key: 'id',
      },
    },
    employeeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hoursWorked: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    wagePerHour: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    bonus: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    deduction: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    lastPaid: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    totalPayment: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'payments',
    hooks: {
      beforeCreate: async (payment) => {
        // Fetch the employee name
        const employee = await Employee.findByPk(payment.employeeId);
        if (employee) {
          payment.employeeName = employee.name;

          // Calculate totalPayment based on type of worker
          if (payment.hoursWorked !== null && payment.wagePerHour !== null) {
            // Hourly worker
            payment.totalPayment =
              payment.hoursWorked * payment.wagePerHour + (payment.bonus || 0) - (payment.deduction || 0);
          } else if (payment.salary !== null) {
            // Monthly worker
            payment.totalPayment =
              payment.salary + (payment.bonus || 0) - (payment.deduction || 0);
          } else {
            throw new Error('Invalid payment data');
          }
        } else {
          throw new Error('Employee not found');
        }
      },
      beforeUpdate: async (payment) => {
        // Fetch the employee name
        const employee = await Employee.findByPk(payment.employeeId);
        if (employee) {
          payment.employeeName = employee.name;

          // Recalculate totalPayment based on type of worker
          if (payment.hoursWorked !== null && payment.wagePerHour !== null) {
            // Hourly worker
            payment.totalPayment =
              payment.hoursWorked * payment.wagePerHour + (payment.bonus || 0) - (payment.deduction || 0);
          } else if (payment.salary !== null) {
            // Monthly worker
            payment.totalPayment =
              payment.salary + (payment.bonus || 0) - (payment.deduction || 0);
          } else {
            throw new Error('Invalid payment data');
          }

          // Update lastPaid date
          payment.lastPaid = new Date();
        } else {
          throw new Error('Employee not found');
        }
      },
    },
  }
);

Employee.hasMany(Payment, { foreignKey: 'employeeId' });
Payment.belongsTo(Employee, { foreignKey: 'employeeId' });

export default Payment;

