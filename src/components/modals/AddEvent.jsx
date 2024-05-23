import { useState } from "react";
import TextInput from "./input/TextInput.jsx";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DateTimeInput from "./input/DateTimeInput.jsx";

/**
 * Renders a modal for adding or editing an event.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the modal is open or not.
 * @param {function} props.handleClose - The function to handle closing the modal.
 * @param {Object} [props.values={}] - The initial values for the form fields.
 * @returns {JSX.Element} The AddEvent component.
 *
 * @example
 * const values = {
 *   name: "Event Name",
 *   description: "Event Description",
 *   startDate: new Date(),
 *   endDate: new Date(),
 * };
 *
 * <AddEvent open={true} handleClose={handleClose} values={values} />
 */

const AddEvent = ({ open, handleClose, values = {} }) => {
    //TODO: Finish
    const { description = "", name = "", startDate = "", endDate = "" } = values;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson); 
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
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <TextInput
            label="Event Name"
            field="name"
            defaultValue={name}
          />
          <TextInput
            label="Event Description"
            field="description"
            defaultValue={description}
          />
          <DateTimeInput
            label="Start Date"
            field="startDate"
            defaultValue={startDate}
          />
          <DateTimeInput
            label="Start Date"
            field="startDate"
            defaultValue={endDate}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddEvent
