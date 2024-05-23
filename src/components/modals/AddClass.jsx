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
import { db } from "../../../firebase.js";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";

/**
 * AddClass component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Determines if the modal is open or closed.
 * @param {Function} props.handleClose - Callback function to handle closing the modal.
 * @param {Array} props.teachersAutocomplete - Array of teacher options for autocomplete.
 * @param {Array} props.studentsAutocomplete - Array of student options for autocomplete.
 * @param {Object} props.values - Object containing the form values.
 * @returns {JSX.Element} - The rendered AddClass component.
 *
 * @example
 * // Example values object
 * const values = {
 *   teacher: "Noah White",
 *   grade: "Kindergarten",
 *   subject: "Homeroom",
 *   students: [
 *     { label: "Joshua Moore" },
 *     { label: "Daniel Martinez" },
 *     { label: "Mia Anderson" }
 *   ]
 * };
 *
 * // Usage
 * <AddClass
 *   open={true}
 *   handleClose={handleClose}
 *   teachersAutocomplete={teachers}
 *   studentsAutocomplete={students}
 *   values={values}
 * />
 */
const AddClass = ({
  open,
  handleClose,
  teachersAutocomplete,
  studentsAutocomplete,
  values = {},
}) => {
  // Providing default values for destructured properties of `values`
  const { teacher = "", grade = "", subject = "", students = [] } = values;

  const [selectedStudents, setSelectedStudents] = useState(students);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    formJson.students = selectedStudents.map((student) => student.label); // Assuming you want to save labels
    console.log(formJson);
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
        }}
      >
        <DialogTitle>Add Class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            * Select “Homeroom” for the Subject field if the class doesn&apos;t
            have a specific subject.
          </DialogContentText>
          <SingleSelectAutocomplete
            options={teachersAutocomplete}
            name="teacher"
            label="Teacher"
            value={teacher}
          />
          <SingleSelectAutocomplete
            options={grades}
            name="grade"
            label="Grade"
            value={grade}
          />
          <SingleSelectAutocomplete
            options={subjects}
            name="subject"
            label="Subject"
            value={subject}
          />
          <MultiSelectAutocomplete
            options={studentsAutocomplete}
            name="students"
            label="Students"
            changeState={setSelectedStudents}
            value={students}
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

export default AddClass;

const grades = [
  { label: "Kindergarten" },
  { label: "1st Grade" },
  { label: "2nd Grade" },
  { label: "3rd Grade" },
  { label: "4th Grade" },
  { label: "5th Grade" },
];

const subjects = [
  { label: "Homeroom" },
  { label: "Science" },
  { label: "Math" },
  { label: "English" },
  { label: "History" },
  { label: "Geography" },
  { label: "Art" },
  { label: "Music" },
  { label: "Physical Education" },
  { label: "Computer Science" },
];
