import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MultiSelectAutocomplete from "./input/MultiSelectAutocomplete.jsx";
import { removeTeacher } from "../../lib/teacher.js";

const RemoveTeacher = ( { open, handleClose, teachersAutocomplete}) => {
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(selectedTeachers);
        removeTeacher(selectedTeachers);
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