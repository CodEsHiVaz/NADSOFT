import { Pool } from "pg";
require("dotenv").config();
const connectionString = process.env.DBURI;
export const pool = new Pool({
  connectionString: connectionString,
});
