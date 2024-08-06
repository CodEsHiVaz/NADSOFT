"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudentById = exports.getStudentById = exports.getStudents = exports.createStudent = void 0;
const db_1 = require("../config/db");
/**
 * The function `createStudent` is an asynchronous function that inserts a new student record into a
 * database table and returns the inserted record.
 */
const createStudent = async (req, res) => {
    const { name, age, email } = req.body;
    try {
        const result = await db_1.pool.query("INSERT INTO students (name, age, email) VALUES ($1, $2, $3) RETURNING *", [name, age, email]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
};
exports.createStudent = createStudent;
/**
 * This function retrieves a paginated list of students from a database table and returns
 * the results along with metadata such as total count, limit, and page number.
 */
const getStudents = async (req, res) => {
    const limit = +req.query.limit;
    const page = +req.query.page;
    if (isNaN(limit) || isNaN(page) || limit <= 0 || page <= 0) {
        return res.status(400).json({ error: "Invalid limit or page value" });
    }
    const offset = (page - 1) * limit;
    try {
        const totalResult = await db_1.pool.query("SELECT COUNT(*) FROM students");
        const total = parseInt(totalResult.rows[0].count);
        const result = await db_1.pool.query("SELECT * FROM students ORDER BY id LIMIT $1 OFFSET $2", [limit, offset]);
        res.status(200).json({
            metadata: {
                total: total,
                limit,
                page,
            },
            students: result.rows,
        });
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
};
exports.getStudents = getStudents;
/**
 * This function retrieves a student by their ID from a database and returns the student's information.
 */
const getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const studentResult = await db_1.pool.query("SELECT * FROM students WHERE id = $1", [id]);
        if (studentResult.rows.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }
        // const marksResult = await pool.query(
        //   "SELECT * FROM marks WHERE student_id = $1",
        //   [id]
        // );
        const student = studentResult.rows[0];
        // student.marks = marksResult.rows;
        res.status(200).json(student);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
};
exports.getStudentById = getStudentById;
/**
 * The function `updateStudentById` updates a student record in a database based on the provided ID,
 * name, age, and email..
 */
const updateStudentById = async (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    try {
        const result = await db_1.pool.query("UPDATE students SET name = $1, age = $2, email = $3 WHERE id = $4 RETURNING *", [name, age, email, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
};
exports.updateStudentById = updateStudentById;
/**
 * The function `deleteStudent` deletes a student record from a database table based on the provided ID
 * and returns the deleted record.
 */
const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db_1.pool.query("DELETE FROM students WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        res.status(400).json({ error: err });
    }
};
exports.deleteStudent = deleteStudent;
