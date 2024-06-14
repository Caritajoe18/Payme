import { DataTypes, Model } from 'sequelize';
import db from '../db.js';  

class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    typeOfStaff: {
      type: DataTypes.ENUM('full-time', 'part-time'),
      allowNull: false,
    },
    paymentType: {
      type: DataTypes.ENUM('hourly', 'monthly'),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'employee',
    
  }
);

export default Employee;
