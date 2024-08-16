import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import Note from "./Components/Note";
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialogue from "./Components/AddEditNoteDialogue";
import { FaPlus } from "react-icons/fa";
import AddEditNoteDialogue from "./Components/AddEditNoteDialogue";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  const deleteNote = async (note: NoteModel) => {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  return (
    <Container>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add new note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note
              onDeleteNoteClicked={deleteNote}
              note={note}
              onNoteClicked={setNoteToEdit}
              className={styles.note}
            ></Note>
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialogue
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        ></AddNoteDialogue>
      )}
      {noteToEdit && (
        <AddEditNoteDialogue
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        ></AddEditNoteDialogue>
      )}
    </Container>
  );
}

export default App;
