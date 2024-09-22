const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.DB_URI,
});
console.log(process.env.DB_URI);

async function testConnection() {
  try {
    await client.connect();
    const result = await client.query("SELECT current_user;");
    console.log("Current user:", result.rows[0].current_user);
  } catch (err) {
    console.error("Connection error:", err);
  } finally {
    await client.end();
  }
}

testConnection();
