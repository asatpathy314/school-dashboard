import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MultiSelectAutocomplete from "./input/MultiSelectAutocomplete.jsx";
import { db } from "../../../firebase.js";
import { doc, setDoc, getDoc, deleteDoc, getDocs, query, collection, where } from "firebase/firestore"; 


const RemoveTeacher = ( { open, handleClose, teachersAutocomplete}) => {
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.classes = selectedTeachers;
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
              style: { minWidth: "400px" },
            }}
          >
            <DialogTitle>Remove Teacher</DialogTitle>
            <DialogContent>
              <MultiSelectAutocomplete 
              options={teachersAutocomplete} 
              name="teachers"
              label="Teachers"
              changeState={setSelectedTeachers}
            />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Remove</Button>
            </DialogActions>
          </Dialog>
        </>
      );
}

export default RemoveTeacher;