import { Student } from "../types/type";

// for Creating Student
export const createStudent = async (student: Student) => {
  const url = `${process.env.REACT_APP_API_URL}/students`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error("Failed to create student");
  }

  const createdStudent = await response.json();
  return createdStudent;
};

// for Updating Student
export const updateStudent = async (student: Student) => {
  const url = `${process.env.REACT_APP_API_URL}/students/${student.id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error("Failed to update student");
  }

  const updatedStudent = await response.json();
  return updatedStudent;
};

// for Deleteing Student
export const deleteStudent = async (id: number) => {
  const url = `${process.env.REACT_APP_API_URL}/students/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete student");
  }

  const deletedStudent = await response.json();
  return deletedStudent;
};
