import { Suspense, useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "reactstrap";
import {
  FetchStudentsResponse,
  OperationType,
  Student,
} from "../../types/type";
import List from "./List";
import AddEditForm from "./AddEditForm";
import {
  createStudent,
  deleteStudent,
  updateStudent,
} from "../../services/studentService";
import ConfirmOperation from "../../util/AlertComp";

export const Students = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [limit] = useState<number>(5);
  const [students, setStudents] = useState<Student[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const toggle = () => setModal(!modal);
  const [confirm, setConfirm] = useState<boolean>(false);
  const toggleConfirm = () => setConfirm(!confirm);
  const [visible, setVisible] = useState<boolean>(false);
  const onDismiss = () => setVisible(false);
  const [operation, setOperation] = useState<OperationType>(
    OperationType.delete
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = `${process.env.REACT_APP_API_URL}/students?limit=${limit}&page=${page}`;
      const response = await fetch(url);
      const data = (await response.json()) as unknown as FetchStudentsResponse;
      console.log("🚀 ~ fetchData ~ data:", data);
      setStudents(data.students);
      setTotal(data.metadata.total);
      setLoading(false);
    } catch (error) {
      console.log("🚀 ~ fetchData ~ error:", error);
      setStudents([]);
      setTotal(0);
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(total / limit);

  const handlePrev = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleSetEdit = (student: Student) => {
    setEditingStudent(student);
    setModal(true);
  };

  const handleSetAdd = () => {
    setEditingStudent(null);
    setModal(true);
  };

  const handleCancel = () => {
    setEditingStudent(null);
    setModal(false);
  };

  const handleSave = (student: Student) => {
    setEditingStudent(student);
    if (editingStudent) {
      // const updatedStudent = await updateStudent(student);
      // setStudents(
      //   students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
      // );
      setOperation(OperationType.edit);
      toggleConfirm();
    } else {
      // const createdStudent = await createStudent(student);
      // setStudents([...students, createdStudent]);
      // setTotal(total + 1);
      setOperation(OperationType.create);
      toggleConfirm();
    }
  };

  const handleCreate = async (student: Student) => {
    try {
      const createdStudent = await createStudent(student);
      setStudents([...students, createdStudent]);
      setTotal(total + 1);
      setEditingStudent(null);
      toggle();
      toggleConfirm();
    } catch (error) {
      console.log("🚀 ~ handleCreate ~ error:", error);
      setEditingStudent(null);
      setVisible(true);
      toggle();
      toggleConfirm();
      setTimeout(() => setVisible(false), 5000);
    }
  };

  const handleEdit = async (student: Student) => {
    try {
      const updatedStudent = await updateStudent(student);
      setStudents(
        students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
      );
      setEditingStudent(null);
      toggle();
      toggleConfirm();
    } catch (error) {
      console.log("🚀 ~ handleCreate ~ error:", error);
      toggle();
      setVisible(true);
      toggleConfirm();
      setTimeout(() => setVisible(false), 5000);
    }
  };

  const handleDeleteClick = (student: Student) => {
    setEditingStudent(student);
    setOperation(OperationType.delete);
    toggleConfirm();
  };

  const handleDelete = async (id: number) => {
    try {
      const deletedStudent = await deleteStudent(id);
      setStudents(students.filter((s) => s.id !== deletedStudent.id));
      setTotal(total - 1);
      toggleConfirm();
    } catch (error) {
      console.error("Failed to delete student:", error);
      toggleConfirm();
    }
  };

  const handleConfirm = async () => {
    switch (operation) {
      case OperationType.create:
        handleCreate(editingStudent!);
        break;
      case OperationType.edit:
        handleEdit(editingStudent!);
        break;
      case OperationType.delete:
        handleDelete(editingStudent?.id!);
        break;
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, limit]);

  return (
    <>
      <Container>
        <Row md={12}>
          <Col className="">
            <div className="d-flex justify-content-between  py-2 me-4">
              <h3>Students Data</h3>
              <Button color="success" size="sm" onClick={handleSetAdd}>
                Add new student !
              </Button>
            </div>
          </Col>

          <Row md={12}>
            <Col className="">
              {loading ? (
                <Spinner className="m-5" color="primary">
                  Loading...
                </Spinner>
              ) : (
                <List
                  students={students}
                  handleSetEdit={handleSetEdit}
                  handleDeleteClick={handleDeleteClick}
                />
              )}
            </Col>
          </Row>
          <Row md={12}>
            <Col className="">
              <div className="pagination-controls d-flex justify-content-end ">
                <Button
                  color="primary"
                  size="sm"
                  style={{ cursor: "pointer" }}
                  onClick={handlePrev}
                  disabled={page === 1}
                >
                  Prev
                </Button>
                <span className="border px-2">{page}</span>
                <Button
                  color="primary"
                  size="sm"
                  style={{ cursor: "pointer" }}
                  onClick={handleNext}
                  disabled={page >= totalPages}
                >
                  Next
                </Button>
              </div>
            </Col>

            <AddEditForm
              student={editingStudent}
              onSave={handleSave}
              onCancel={handleCancel}
              toggle={toggle}
              modal={modal}
            />
            <ConfirmOperation
              operation={operation}
              confirm={confirm}
              onCancel={() => setConfirm(false)}
              onConfirm={handleConfirm}
            />
          </Row>
        </Row>
      </Container>
      <Alert
        color="danger"
        className="fixed-bottom"
        isOpen={visible}
        toggle={onDismiss}
      >
        Somthing Went Wrong While Proccesing Your Request !
        <div className=""></div>
      </Alert>
    </>
  );
};
