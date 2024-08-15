import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Note as NoteModel } from "./models/note";
import Note from "./Components/Note";
import styles from "./styles/NotesPage.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialogue from "./Components/AddNoteDialogue";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

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

  return (
    <Container>
      <Button onClick={() => setShowAddNoteDialog(true)}>Add new note</Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note}></Note>
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialogue
          onDismiss={() => setShowAddNoteDialog(false)}
        ></AddNoteDialogue>
      )}
    </Container>
  );
}

export default App;
