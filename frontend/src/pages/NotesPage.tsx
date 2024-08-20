import React from "react";
import { Container } from "react-bootstrap";
import NotesPageLoggedInView from "../Components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../Components/NotesPageLoggedOutView";
import styles from "../styles/NotesPage.module.css";
import { User } from "../models/user";

interface NotesPageProps {
  loggedInUser: User | null;
}

const NotesPage = ({ loggedInUser }: NotesPageProps) => {
  return (
    <>
      {" "}
      <Container className={styles.notesPage}>
        <>
          {loggedInUser ? (
            <NotesPageLoggedInView></NotesPageLoggedInView>
          ) : (
            <NotesPageLoggedOutView></NotesPageLoggedOutView>
          )}
        </>
      </Container>
    </>
  );
};

export default NotesPage;
