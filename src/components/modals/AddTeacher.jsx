import { useState } from "react";
import TextInput from "./input/TextInput.jsx";
import SingleSelectAutocomplete from "./input/SingleSelectAutocomplete.jsx";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { addTeacher } from "../../lib/teacher.js";

/**
 * Renders a modal for adding a teacher.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the modal is open or not.
 * @param {function} props.handleClose - The function to handle closing the modal.
 * @param {Object} [props.values={}] - The initial values for the form fields.
 * @returns {JSX.Element} The AddTeacher component.
 *
 * @example
 * // Example usage of AddTeacher component
 * const values = {
 *   firstName: "John",
 *   lastName: "Doe",
 *   id: "12345",
 *   email: "johndoe@example.com",
 *   title: "Teacher",
 * };
 *
 * <AddTeacher open={true} handleClose={handleClose} values={values} />
 */

const AddTeacher = ({ open, handleClose, values = {} }) => {
  const {
    firstName = "",
    lastName = "",
    id = "",
    email = "",
    title = "",
  } = values;

  // console.log('in add teacher', values)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson); // TODO: Finish
    addTeacher(formJson)
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
          style: { minWidth: "400px" },
        }}
      >
        <DialogTitle>Add Teacher</DialogTitle>
        <DialogContent>
          <TextInput
            label="Teacher First Name"
            field="firstName"
            defaultValue={firstName}
          />
          <TextInput
            label="Teacher Last Name"
            field="lastName"
            defaultValue={lastName}
          />
          <TextInput label="Teacher ID" field="id" defaultValue={id} />
          <TextInput label="Teacher Email" field="email" defaultValue={email} />
          <SingleSelectAutocomplete
            options={pronouns}
            name="title"
            label="Title"
            defaultValue={title}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTeacher;

const pronouns = [
  { label: "Mr." },
  { label: "Mrs." },
  { label: "Ms." },
  { label: "Miss" },
  { label: "Dr." },
];
