import { useState, useEffect } from "react";
import Name from "./input/Name"
import SingleSelectAutocomplete from "./input/SingleSelectAutocomplete.jsx";
import MultiSelectAutocomplete from "./input/MultiSelectAutocomplete.jsx";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { db } from "../../../firebase.js";
import { doc, setDoc, getDoc, deleteDoc, getDocs, query, collection, where } from "firebase/firestore"; 

const AddClass = ( { open, handleClose, teachersAutocomplete, studentsAutocomplete }) => {
    const [selectedStudents, setSelectedStudents] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.students = selectedStudents;
        console.log(formJson)
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
              <Name label="Class Name"/>
              <DialogContentText>
                * Select “Homeroom” for Class label if this class is the
                students’ main class or if the teacher will teach all subjects
              </DialogContentText>
              <SingleSelectAutocomplete options={teachersAutocomplete} name="name" label="Teacher Name" />
              <MultiSelectAutocomplete 
              options={studentsAutocomplete} 
              name="students"
              label="Students"
              changeState={setSelectedStudents}
                />
              <SingleSelectAutocomplete options={grades} name="grade" label="Grade" />
              <SingleSelectAutocomplete options={subjects} name="subject" label="Subject" />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Create</Button>
            </DialogActions>
          </Dialog>
        </>
      );
}

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
    { label: "Computer Science" }
];