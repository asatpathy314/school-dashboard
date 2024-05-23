import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MultiSelectAutocomplete from "./input/MultiSelectAutocomplete.jsx";
import { removeStudent } from "../../lib/student.js";


const RemoveStudent = ( { open, handleClose, studentsAutocomplete}) => {
    const [selectedStudents, setSelectedStudents] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.students = selectedStudents;
        console.log(formJson)
        removeStudent(formJson);
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
            <DialogTitle>Remove Student</DialogTitle>
            <DialogContent>
              <MultiSelectAutocomplete 
              options={studentsAutocomplete} 
              name="students"
              label="Students"
              changeState={setSelectedStudents}
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

export default RemoveStudent;