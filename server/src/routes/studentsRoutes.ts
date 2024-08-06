import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  updateStudentById,
} from "../controller/students";

export const studentRouter = Router();
// Create student
studentRouter.post("/", createStudent);
// Get students
studentRouter.get("/", getStudents);
// Get studentByid
studentRouter.get("/:id", getStudentById);
// Update students
studentRouter.put("/:id", updateStudentById);
// Delete students
studentRouter.delete("/:id", deleteStudent);
