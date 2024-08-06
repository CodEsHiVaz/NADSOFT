import { Student } from "../../types/type";
import { Table } from "reactstrap";
import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { PiLineVerticalLight } from "react-icons/pi";
type Props = {
  students: Student[] | [];
  handleSetEdit: (student: Student) => void;
  handleDeleteClick: (student: Student) => void;
};
const List = ({ students, handleSetEdit, handleDeleteClick }: Props) => {
  return (
    <>
      <Table bordered striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>age</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((elem: Student, ind: number) => (
              <tr key={ind}>
                <th scope="row">{elem.id}</th>
                <td>{elem.name}</td>
                <td>{elem.age}</td>
                <td>{elem.email}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2 fs-4">
                    <BiSolidEdit
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSetEdit(elem)}
                    />{" "}
                    <PiLineVerticalLight />{" "}
                    <MdDelete
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteClick(elem)}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default List;
