import React, { useState, useEffect } from "react";
import { Student } from "../../types/type";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

type Props = {
  student: Student | null;
  onSave: (student: Student) => void;
  onCancel: () => void;
  toggle: () => void;
  modal: boolean;
};

const AddEditForm = ({ student, onSave, onCancel, toggle, modal }: Props) => {
  const [formData, setFormData] = useState<Student>({
    id: student ? student.id : 0,
    name: student ? student.name : "",
    age: student ? student.age : 0,
    email: student ? student.email : "",
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
    // form data cleanup
    return () =>
      setFormData({
        name: "",
        age: 0,
        email: "",
      });
  }, [student]);
  // for Form handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age" ? Number(value) : value,
    });
  };
  // for Submit form data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {student ? "Edit Students Details" : "Add New Student"}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit} id="form">
          <div>
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="age">Age:</Label>
            <Input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" type="submit" form="form">
          Save
        </Button>{" "}
        <Button
          color="secondary"
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddEditForm;
