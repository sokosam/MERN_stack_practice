import React, { useState } from "react";
import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { SignUpCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import TextinputField from "./form/TextInputField";
import styeUtils from "../styles/utils.module.css";
import { ConflictError } from "../errors/http_errors";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.log(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextinputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOption={{ required: "Required" }}
            error={errors.username}
          ></TextinputField>
          <TextinputField
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOption={{ required: "Required" }}
            error={errors.email}
          ></TextinputField>
          <TextinputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOption={{ required: "Required" }}
            error={errors.password}
          ></TextinputField>
          <Button
            type="submit"
            disabled={isSubmitting}
            className={styeUtils.width100}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
