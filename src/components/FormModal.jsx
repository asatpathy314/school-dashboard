import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete } from "@mui/material";

const FormModal = ({ modalType }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    handleClose();
  };

  switch (modalType) {
    case "addClass":
      return (
        <>
          <Button variant="outlined" onClick={handleClickOpen}>
            TestingButton
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: "form",
              onSubmit: handleSubmit,
            }}
          >
            <DialogTitle>Add Classes</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                required
                margin="dense"
                id="schoolClassLabel"
                name="schoolClassLabel" // Added name attribute
                label="Class label"
                type="text"
                variant="standard"
              />
              <DialogContentText>
                * Select “Homeroom” for Class label if this class is the students’ main class or if the teacher will teach all subjects
              </DialogContentText>
              <Autocomplete
                options={exampleAutocomplete}
                renderInput={(params) => 
                  <TextField 
                    {...params} 
                    required
                    margin="dense"
                    id="classTeacherLabel"
                    name="classTeacherLabel" // Added name attribute
                    label="Teacher"
                    type="text"
                    variant="standard"
                  />}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Subscribe</Button>
            </DialogActions>
          </Dialog>
        </>
      );
  }
};

export default FormModal;


/*
 return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        TestingButton
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="label"
            label="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
  */
 // Testing Autocomplete.
 const exampleAutocomplete = [
  { label: "John Smith" },
  { label: "Jane Doe" },
  { label: "Alice Johnson" },
  { label: "Bob Brown" },
  { label: "Charlie Davis" },
  { label: "Diana Evans" },
  { label: "Edward Harris" },
  { label: "Fiona Clark" },
  { label: "George Lewis" },
  { label: "Hannah Walker" },
  { label: "Ian Young" },
  { label: "Jack King" },
  { label: "Karen Wright" },
  { label: "Liam Scott" },
  { label: "Mia Green" },
  { label: "Noah Adams" },
  { label: "Olivia Baker" },
  { label: "Paul Carter" },
  { label: "Quinn Mitchell" },
  { label: "Rachel Perez" },
  { label: "Samuel Roberts" },
  { label: "Tina Turner" },
  { label: "Frank Murphy" },
  { label: "Grace Bailey" },
  { label: "Henry Rivera" },
  { label: "Isabella Cooper" },
  { label: "James Richardson" },
  { label: "Katherine Cox" },
  { label: "Lucas Howard" },
  { label: "Madison Ward" },
  { label: "Nathan Brooks" },
  { label: "Owen Sanders" },
  { label: "Penelope Price" },
  { label: "Quincy Bennett" },
  { label: "Ruby Wood" },
  { label: "Sebastian Barnes" },
  { label: "Taylor Ross" },
  { label: "Ulysses Henderson" },
  { label: "Violet Coleman" }
];