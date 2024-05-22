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
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(selectedTeachers);
        for (let i = 0; i < selectedTeachers.length; i++) { // Changed from selectedClasses to selectedTeachers
          const q = query(collection(db, "teachers"), where("name", "==", selectedTeachers[i].label));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) { // Check if the querySnapshot is not empty
            const teacherDocument = querySnapshot.docs[0];
            //await deleteDoc(doc(db, '/teachers/'+teacherDocument.id))
            console.log("Teacher document located at " + teacherDocument.id + " has been deleted.")
          } else {
            console.log("No document found for teacher: " + selectedTeachers[i].label);
          }
        }
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