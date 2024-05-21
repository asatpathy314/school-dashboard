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
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);

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
    formJson.classTeacherLabel = selectedTeacher;
    formJson.students = selectedStudents;
    formJson.grade = selectedGrade;
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
                * Select “Homeroom” for Class label if this class is the students’ main class or if the teacher will teach all subjects
              </DialogContentText>
              <Autocomplete
                options={exampleAutocomplete}
                getOptionLabel={(option) => option.label}
                value={selectedTeacher}
                onChange={(event, newValue) => setSelectedTeacher(newValue)}
                renderInput={(params) => 
                  <TextField 
                    {...params} 
                    required
                    margin="dense"
                    id="classTeacherLabel"
                    name="classTeacherLabel"
                    label="Teacher"
                    type="text"
                    variant="standard"
                  />}
              />
              <Autocomplete
                multiple
                options={exampleAutocomplete}
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
                value={selectedGrade}
                onChange={(event, newValue) => setSelectedGrade(newValue)}
                renderInput={(params) => 
                  <TextField 
                    {...params} 
                    margin="dense"
                    id="grade"
                    name="grade"
                    label="Grade"
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
    default:
      return null;
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
const grades = [
  { label: "Kindergarten" },
  { label: "1st Grade" },
  { label: "2nd Grade" },
  { label: "3rd Grade" },
  { label: "4th Grade" },
  { label: "5th Grade" },
]

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