import { Modal } from "react-bootstrap";

interface AddNoteDialogProps {
  onDismiss: () => void;
}

const AddNoteDialogue = ({ onDismiss }: AddNoteDialogProps) => {
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Add Note</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default AddNoteDialogue;
