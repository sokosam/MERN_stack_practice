import React from "react";
import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewsProps {
  onLoginClicked: () => void;
  onSignUpClicked: () => void;
}

const NavBarLoggedOutView = ({
  onLoginClicked,
  onSignUpClicked,
}: NavBarLoggedOutViewsProps) => {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign Up</Button>
      <Button onClick={onLoginClicked}>Log in</Button>
    </>
  );
};

export default NavBarLoggedOutView;
