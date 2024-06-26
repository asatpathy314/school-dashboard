import { useState, useEffect } from "react";
import {
  retrieveListByLabel,
  retrieveObjects,
} from "../lib/modal/firebase_retrieval.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, createFilterOptions } from "@mui/material";

import AddClass from "./modals/AddClass.jsx";
import AddStudent from "./modals/AddStudent.jsx";
import AddTeacher from "./modals/AddTeacher.jsx";
import RemoveClass from "./modals/RemoveClass.jsx";
import RemoveStudent from "./modals/RemoveStudent.jsx";
import RemoveTeacher from "./modals/RemoveTeacher.jsx";
import AddEvent from "./modals/AddEvent.jsx";
import RemoveEvent from "./modals/RemoveEvent.jsx";
import { Remove } from "@mui/icons-material";

/* Can be used to limit the number of options displayed in the autocomplete dropdown.
const filterOptions = createFilterOptions({
  stringify: (option) => option.label,
});

const customFilterOptions = (options, state) => {
  if (state.inputValue.length < 1) {
    return [];
  }
  return filterOptions(options, state);
};
*/

const FormModal = ({
  modalType,
  open,
  handleClickOpen,
  handleClose,
  values,
}) => {
  const [teachersAutocomplete, setTeachersAutocomplete] = useState([]);
  const [studentsAutocomplete, setStudentsAutocomplete] = useState([]);
  const [classesAutocomplete, setClassesAutocomplete] = useState([]);
  const [eventsAutocomplete, setEventsAutocomplete] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    console.log("haha");
    retrieveObjects("teachers")
      .then((res) => {
        const teachers = res;
        setTeachersAutocomplete(retrieveListByLabel("fullName", teachers));
      })
      .catch((error) => {
        console.error("Failed to retrieve teachers:", error);
      });
    retrieveObjects("classes")
      .then((res) => {
        const classes = res;
        setClassesAutocomplete(retrieveListByLabel("name", classes));
      })
      .catch((error) => {
        console.error("Failed to retrieve :", error);
      });
    retrieveObjects("students")
      .then((res) => {
        const students = res;
        setStudentsAutocomplete(retrieveListByLabel("fullName", students));
      })
      .catch((error) => {
        console.error("Failed to retrieve students:", error);
      });
    retrieveObjects("events")
      .then((res) => {
        const events = res;
        setEventsAutocomplete(retrieveListByLabel("name", events));
      })
      .catch((error) => {
        console.error("Failed to retrieve events:", error);
      });
  }, []);

  switch (modalType) {
    case "addClass": {
      return (
        <AddClass
          open={open}
          handleClose={handleClose}
          teachersAutocomplete={teachersAutocomplete}
          studentsAutocomplete={studentsAutocomplete}
          values={values}
        />
      );
    }
    case "removeClass": {
      return (
        <RemoveClass
          open={open}
          handleClose={handleClose}
          classesAutocomplete={classesAutocomplete}
          values={values}
        />
      );
    }
    case "addStudent": {
      return (
        <AddStudent
          open={open}
          handleClose={handleClose}
          classesAutocomplete={classesAutocomplete}
          values={values}
        />
      );
    }
    case "removeStudent": {
      return (
        <RemoveStudent
          open={open}
          handleClose={handleClose}
          studentsAutocomplete={studentsAutocomplete}
          values={values}
        />
      );
    }
    case "addTeacher": {
      return (
        <AddTeacher open={open} handleClose={handleClose} values={values} />
      );
    }

    case "removeTeacher": {
      return (
        <RemoveTeacher
          open={open}
          handleClose={handleClose}
          teachersAutocomplete={teachersAutocomplete}
          values={values}
        />
      );
    }
    case "addEvent": {
      return <AddEvent open={open} handleClose={handleClose} values={values} />;
    }
    case "removeEvent": { 
      return <RemoveEvent open={open} handleClose={handleClose} eventsAutocomplete={eventsAutocomplete} />;
    }
    case "editGrade": {
      const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        handleClose();
        location.reload();
      };

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
              style: { minWidth: "400px" },
            }}
          >
            <DialogTitle>Edit Grade</DialogTitle>
            <DialogContent>
              <Autocomplete
                options={exampleAutocomplete}
                //filterOptions={customFilterOptions} // Apply the custom filter options
                getOptionLabel={(option) => option.label}
                value={selectedStudent}
                onChange={(event, newValue) => setSelectedStudent(newValue)}
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
              <TextField
                autoFocus
                required
                margin="dense"
                value={studentGradeEdit}
                id="gradePercentage"
                name="gradePercentage"
                label="Grade"
                type="text"
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Edit</Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
    default: {
      // Format for any other modal type. Change in prod to an error message.
      return <p>Invalid modal type, check your data prop.</p>;
    }
  }
};

export default FormModal;

// Testing Autocomplete. Remove in prod.
const grades = [
  { label: "Kindergarten" },
  { label: "1st Grade" },
  { label: "2nd Grade" },
  { label: "3rd Grade" },
  { label: "4th Grade" },
  { label: "5th Grade" },
];

const exampleAutocomplete = [
  { label: "Mr. Moore's Math Class" },
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
  { label: "Violet Coleman" },
];
