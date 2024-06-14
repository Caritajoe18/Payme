import express  from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routers/userRoutes.js';
import employeeRoutes from './routers/employeeRoutes.js';
import sortRoutes from './routers/sortRoutes.js';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Logging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
  

app.use('/user', userRoutes);
app.use('/employee', employeeRoutes);
app.use('/sort', sortRoutes);



export default app;
