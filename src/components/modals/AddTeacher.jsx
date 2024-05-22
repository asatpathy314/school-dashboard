import { useState } from "react";
import TextInput from "./input/TextInput.jsx"
import SingleSelectAutocomplete from "./input/SingleSelectAutocomplete.jsx";
import MultiSelectAutocomplete from "./input/MultiSelectAutocomplete.jsx";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { db } from "../../../firebase.js";
import { doc, setDoc, getDoc, deleteDoc, getDocs, query, collection, where } from "firebase/firestore"; 

const AddTeacher = ( { open, handleClose, classesAutocomplete }) => {
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
            <DialogTitle>Add Teacher</DialogTitle>
            <DialogContent>
              <TextInput label="Teacher First Name" field="firstName"/>
              <TextInput label="Teacher Last Name" field="lastName"/>
              <TextInput label="Teacher ID" field="id"/>
              <TextInput label="Teacher Email" field="email"/>
              <SingleSelectAutocomplete options={pronouns} name="pronoun" label="Title" />
              <MultiSelectAutocomplete 
              options={classesAutocomplete} 
              name="classes"
              label="Classes"
              changeState={setSelectedClasses}
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Create</Button>
            </DialogActions>
          </Dialog>
        </>
      );
}

export default AddTeacher;

const grades = [
    { label: "Kindergarten" },
    { label: "1st Grade" },
    { label: "2nd Grade" },
    { label: "3rd Grade" },
    { label: "4th Grade" },
    { label: "5th Grade" },
];

const pronouns = [
    { label: "Mr. "},
    { label: "Mrs. "},
    { label: "Ms. "},
    { label: "Miss "},
    { label: "Dr. "},
];

/*
      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.classes = selectedClasses;
        let classList = [];
        console.log(selectedClasses)
        for (let i = 0; i < selectedClasses.length; i++) { 
          const q = query(collection(db, "classes"), where("name", "==", selectedClasses[i].label));
          const querySnapshot = await getDocs(q);
          const classDocument = querySnapshot.docs[0];
          console.log(classDocument.id + " => " + classDocument.data());
          classList.push({class: doc(db, '/classes/'+classDocument.id)});
        }
        formJson.classes = classList;
        console.log(formJson); // TODO: Finish
        handleClose();
      };
*/