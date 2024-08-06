"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = require("express");
const students_1 = require("../controller/students");
exports.studentRouter = (0, express_1.Router)();
// Create student
exports.studentRouter.post("/", students_1.createStudent);
// Get students
exports.studentRouter.get("/", students_1.getStudents);
// Get studentByid
exports.studentRouter.get("/:id", students_1.getStudentById);
// Update students
exports.studentRouter.put("/:id", students_1.updateStudentById);
// Delete students
exports.studentRouter.delete("/:id", students_1.deleteStudent);
