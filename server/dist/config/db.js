"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
require("dotenv").config();
const connectionString = process.env.DBURI;
exports.pool = new pg_1.Pool({
    connectionString: connectionString,
});
