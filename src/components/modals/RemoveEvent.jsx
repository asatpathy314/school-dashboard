import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MultiSelectAutocomplete from "./input/MultiSelectAutocomplete.jsx";


const RemoveEvent = ( { open, handleClose, eventsAutocomplete}) => {
    const [selectedEvents, setSelectedEvents] = useState([]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.eventData = selectedEvents;
        console.log(formJson)
        //removeEvent(formJson); TODO: complete
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
            <DialogTitle>Remove Event</DialogTitle>
            <DialogContent>
              <MultiSelectAutocomplete 
              options={eventsAutocomplete} 
              name="eventData"
              label="Events"
              changeState={setSelectedEvents}
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

export default RemoveEvent;