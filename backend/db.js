import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    dialect: 'mysql',
    dialectOptions: {},
  }
);

export async function connectToDatabase() {
  try {
    await db.authenticate();
    console.log('Connected to the database');
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

export default db ;

// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';

// dotenv.config();
// let db;

// // MySQL Connection
// export async function connectToDatabase() {
//   try {
//     db = await mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//     });
//     console.log('Connected to the database');
//     return db;
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//     throw error;
//   }
// }

// export { db };
