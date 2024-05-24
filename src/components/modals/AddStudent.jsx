import { useState, useEffect } from "react";
import TextInput from "./input/TextInput.jsx";
import SingleSelectAutocomplete from "./input/SingleSelectAutocomplete.jsx";
import MultiSelectAutocomplete from "./input/MultiSelectAutocomplete.jsx";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { addStudent } from "../../lib/student.js";

/**
 * AddStudent component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Determines if the modal is open or closed.
 * @param {function} props.handleClose - The function to handle closing the modal.
 * @param {Array} props.classesAutocomplete - The array of classes for autocomplete.
 * @param {Object} props.values - The example values object.
 * @returns {JSX.Element} The AddStudent component.
 *
 * @example
 * const values = {
 *  "firstName": "Huge",
 *  "lastName": "Man",
 *  "id": "skdxjcj9423m2",
 *  "classes": [
 *      {
 *          "label": "Mrs. Wilson's 3rd Grade Mathematics Class"
 *      }
 *  ],
 *  "grade": "3rd Grade"
 * }
 * // Note: https://stackoverflow.com/questions/42600267/autocomplete-how-can-i-set-a-default-value
 */
const AddStudent = ({
  open,
  handleClose,
  classesAutocomplete,
  values = {},
}) => {
  // Providing default values for destructured properties of `values`
  // console.log(classesAutocomplete);
  const {
    firstName = "",
    lastName = "",
    id = "",
    classes = [],
    grade = "",
  } = values;

  const [selectedClasses, setSelectedClasses] = useState(classes);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    formJson.classes = selectedClasses;
    console.log(formJson); // TODO: Finish
    await addStudent(formJson);
    window.location.reload(); 
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
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <TextInput
            label="Student First Name"
            field="firstName"
            defaultValue={firstName}
          />
          <TextInput
            label="Student Last Name"
            field="lastName"
            defaultValue={lastName}
          />
          <TextInput label="Student ID" field="id" defaultValue={id} />
          <MultiSelectAutocomplete
            options={classesAutocomplete}
            name="classes"
            label="Classes"
            changeState={setSelectedClasses}
            defaultValue={classes}
          />
          <SingleSelectAutocomplete
            options={grades}
            name="grade"
            label="Grade"
            defaultValue={grade}
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

export default AddStudent;

const grades = [
  { label: "Kindergarten" },
  { label: "1st Grade" },
  { label: "2nd Grade" },
  { label: "3rd Grade" },
  { label: "4th Grade" },
  { label: "5th Grade" },
];
