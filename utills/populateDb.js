const { Client } = require("pg");
require("dotenv").config();

console.log("DB_URI:", process.env.DB_URI);

const client = new Client({
  connectionString: process.env.DB_URI,
});

const SQL = `CREATE TABLE IF NOT EXISTS messages 
(id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, text VARCHAR(255), user_id INTEGER, added DATE DEFAULT CURRENT_DATE, FOREIGN KEY (user_id) REFERENCES users(id));`;

const SQL2 = `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, username VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(200) UNIQUE NOT NULL);`;

async function main() {
  console.log("populating db...");

  try {
    // Connect to the database
    await client.connect();

    // Execute SQL queries
    await client.query(SQL2); // Create users table first
    await client.query(SQL); // Then create messages table

    console.log("Database populated successfully.");
  } catch (err) {
    console.error("Error populating database:", err);
  } finally {
    // Close the connection
    await client.end();
  }
}

// Run the main function
main();
