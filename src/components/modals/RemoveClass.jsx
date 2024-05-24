import { useState } from "react";
import MultiSelectAutocomplete from "./input/MultiSelectAutocomplete.jsx";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { removeClass } from "../../lib/class.js";

const RemoveClass = ( { open, handleClose, classesAutocomplete}) => {
    const [selectedClasses, setSelectedClasses] = useState([]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.classes = selectedClasses;
        console.log(formJson)
        await removeClass(formJson);
        window.location.reload(); ''
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
            <DialogTitle>Remove Classes</DialogTitle>
            <DialogContent>
              <MultiSelectAutocomplete 
              options={classesAutocomplete} 
              name="classes"
              label="Classses"
              changeState={setSelectedClasses}
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

export default RemoveClass;

const grades = [
    { label: "Kindergarten" },
    { label: "1st Grade" },
    { label: "2nd Grade" },
    { label: "3rd Grade" },
    { label: "4th Grade" },
    { label: "5th Grade" },
];