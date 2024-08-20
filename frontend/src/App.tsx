import LoginModal from "./Components/LoginModal";
import NavBar from "./Components/NavBar";
import SignUpModal from "./Components/SignUpModal";

import { useEffect, useState } from "react";
import { User } from "./models/user";
import * as NotesApi from "./network/notes_api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import NotesPage from "./pages/NotesPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";
import styles from "./styles/App.module.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLogoutSuccessful={() => setLoggedInUser(null)}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLoginClicked={() => setShowLoginModal(true)}
        ></NavBar>
        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={<NotesPage loggedInUser={loggedInUser}></NotesPage>}
            ></Route>
            <Route path="/privacy" element={<PrivacyPage />}></Route>
            <Route path="/*" element={<NotFoundPage></NotFoundPage>}></Route>
          </Routes>
        </Container>

        {showSignUpModal && (
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }}
          ></SignUpModal>
        )}

        {showLoginModal && (
          <LoginModal
            onDismiss={() => setShowLoginModal(false)}
            onLogin={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false);
            }}
          ></LoginModal>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
