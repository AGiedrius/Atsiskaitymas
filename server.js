//viskas, kas susiję su serveriu yra viename faile
const app = require('./app');
require('dotenv').config(); // Load environment variables from .env file to process.env
const { sql, testConnection } = require('./dbConnection');

const port = process.env.PORT || 3000;

(async () => {
  try {
    // Test the database connection
    await testConnection();

    // Start the server
    app.listen(port, () => {
      console.log(`🚀 App running on port ${port}...`);
    });
  } catch (error) {
    process.exit(1); // terminame running application if the database connection fails, 1 means error
  }

  // This code listens for the SIGINT signal (often sent when a user presses Ctrl+C in the terminal to terminate a Node.js application) and closes the database connection and then exits the process - terminate application.
  process.on('SIGINT', async () => {
    console.log('Closing database connections...');
    await sql.end(); // Closes all connections in the pool
    process.exit(0);
  });
})();
