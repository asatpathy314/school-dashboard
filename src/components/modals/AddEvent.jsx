import React from 'react'
import { useState } from "react";
import TextInput from "./input/TextInput.jsx";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

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


    const handleSubmit = async (event) => {
        //TODO: Finish
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
            value={eventDetails.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <TextInput
            label="Event Description"
            field="description"
            value={eventDetails.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Start Date & Time"
              value={eventDetails.startDate}
              onChange={(date) => handleChange("startDate", date)}
              renderInput={(params) => <TextInput {...params} />}
            />
            <DateTimePicker
              label="End Date & Time"
              value={eventDetails.endDate}
              onChange={(date) => handleChange("endDate", date)}
              renderInput={(params) => <TextInput {...params} />}
            />
          </LocalizationProvider>
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
