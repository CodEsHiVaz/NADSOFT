import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { OperationType } from "../types/type";
type Props = {
  operation: OperationType;
  confirm: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};
const ConfirmOperation = ({
  operation,
  confirm,
  onCancel,
  onConfirm,
}: Props) => {
  const options = {
    title: "",
    text: "",
    confirmButtonText: "",
  };

  switch (operation) {
    case OperationType.create:
      options.title = "Create Student?";
      options.text = `Are you sure you want to create student ?`;
      options.confirmButtonText = "Yes, create it!";
      break;
    case OperationType.edit:
      options.title = "Edit Student?";
      options.text = `Are you sure you want to edit student ?`;
      options.confirmButtonText = "Yes, Save it!";
      break;
    case OperationType.delete:
      options.title = "Delete Student?";
      options.text = `You won't be able to revert this !`;
      options.confirmButtonText = "Yes, delete it!";
      break;
  }

  return (
    <Modal isOpen={confirm} toggle={onCancel}>
      <ModalHeader toggle={onCancel}>{options.title}</ModalHeader>
      <ModalBody>{options.text}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onConfirm}>
          {options.confirmButtonText}
        </Button>{" "}
        <Button color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmOperation;
