import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, createFilterOptions } from "@mui/material";
import { db } from "../../../firebase.js";
import { doc, setDoc, getDoc, deleteDoc, getDocs, query, collection, where } from "firebase/firestore"; 


const AddClass = ( { open, handleClose }) => {
    const autocompletes = [
        { label: "John Smith"}
    ]
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
              <TextField
                autoFocus
                required
                margin="dense"
                id="schoolClassLabel"
                name="schoolClassLabel"
                label="Class label"
                type="text"
                variant="standard"
              />
              <DialogContentText>
                * Select “Homeroom” for Class label if this class is the
                students’ main class or if the teacher will teach all subjects
              </DialogContentText>
              <Autocomplete
                options={autocompletes}
                //filterOptions={customFilterOptions} // Apply the custom filter options
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    id="classTeacherLabel"
                    name="classTeacherLabel"
                    label="Teacher"
                    type="text"
                    variant="standard"
                  />
                )}
              />
              <Autocomplete
                multiple
                options={autocompletes}
                getOptionLabel={(option) => option.label}
                value={selectedStudents}
                onChange={(event, newValue) => setSelectedStudents(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    id="students"
                    name="students"
                    label="Students"
                    type="text"
                    variant="standard"
                  />
                )}
              />
              <Autocomplete
                options={grades}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    id="grade"
                    name="grade"
                    label="Grade"
                    type="text"
                    variant="standard"
                  />
                )}
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

export default AddClass;

const grades = [
    { label: "Kindergarten" },
    { label: "1st Grade" },
    { label: "2nd Grade" },
    { label: "3rd Grade" },
    { label: "4th Grade" },
    { label: "5th Grade" },
];