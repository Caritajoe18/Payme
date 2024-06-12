import dotenv from 'dotenv';
import app from './app.js';
import db, {connectToDatabase} from './db.js';




dotenv.config();

// Start Server
const PORT = process.env.PORT ?? 5000;

connectToDatabase()
  .then(async () => {
    console.log('MySQL connected...');
    
    // Synchronize all models
    db.sync().then(() => {
      console.log('Connected to MySql');
    });
    

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });