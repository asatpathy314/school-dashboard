import { useState, useEffect } from "react";
import TextInput from "./input/TextInput.jsx"
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

const AddStudent = ( { open, handleClose, classesAutocomplete }) => {
    const [selectedClasses, setSelectedClasses] = useState([]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.classes = selectedClasses;
        console.log(formJson); // TODO: Finish
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
              <TextInput label="Student First Name" field="firstName"/>
              <TextInput label="Student Last Name" field="lastName"/>
              <TextInput label="Student ID" field="id"/>
              <MultiSelectAutocomplete 
              options={classesAutocomplete} 
              name="classes"
              label="Classes"
              changeState={setSelectedClasses}
                />
            <SingleSelectAutocomplete options={grades} name="grade" label="Grade" />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Create</Button>
            </DialogActions>
          </Dialog>
        </>
      );
}

export default AddStudent;

const grades = [
    { label: "Kindergarten" },
    { label: "1st Grade" },
    { label: "2nd Grade" },
    { label: "3rd Grade" },
    { label: "4th Grade" },
    { label: "5th Grade" },
];