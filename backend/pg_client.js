const { Client } = require("pg");
require("dotenv").config();

// For the Supabase Provdied Postgres
const connectionString = process.env.POSTGRES_SUPABASE_CONNECTION_STRING;
const client = new Client({
  connectionString,
});

client
  .connect()
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = { client };
