import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, createFilterOptions } from "@mui/material";
import { db } from "../../firebase.js";
import { doc, setDoc, getDoc, deleteDoc, getDocs, query, collection, where } from "firebase/firestore"; 

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
  studentNameEdit,
  studentDBIDEdit,
  studentGradeEdit,
}) => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);

  switch (modalType) {
    case "addClass": {
      const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.students = selectedStudents;
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
                options={exampleAutocomplete}
                //filterOptions={customFilterOptions} // Apply the custom filter options
                getOptionLabel={(option) => option.label}
                value={selectedTeacher}
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
    case "removeClass": {
      const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.classes = selectedClasses;
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
            <DialogTitle>Remove Class(es)</DialogTitle>
            <DialogContent>
              <Autocomplete
                multiple
                options={exampleAutocomplete} // TODO: Replace with classes data.
                getOptionLabel={(option) => option.label}
                value={selectedClasses}
                onChange={(event, newValue) => setSelectedClasses(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    id="classes"
                    name="classes"
                    label="Classes"
                    type="text"
                    variant="standard"
                  />
                )}
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
    case "addStudent": {
      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        let classList = [];
        console.log(selectedClasses)
        for (let i = 0; i < selectedClasses.length; i++) { 
          const q = query(collection(db, "classes"), where("name", "==", selectedClasses[i].label));
          const querySnapshot = await getDocs(q);
          const classDocument = querySnapshot.docs[0];
          console.log(classDocument.id + " => " + classDocument.data());
          classList.push({class: doc(db, '/classes/'+classDocument.id), grade: 100.0});
        }
        formJson.classes = classList;
        console.log(formJson); // TODO: Finish
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
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                required
                margin="dense"
                id="studentName"
                name="name"
                label="Student Name"
                type="text"
                variant="standard"
              />
              <br />
              <TextField
                autoFocus
                required
                margin="dense"
                id="studentID"
                name="id"
                label="Student ID"
                type="text"
                variant="standard"
              />
              <Autocomplete
                options={grades}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => setSelectedGrade(newValue)}
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
              <Autocomplete
                multiple
                options={exampleAutocomplete}
                onChange={(event, newValue) => setSelectedClasses(newValue)}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    id="classes"
                    name="classes"
                    label="Classes"
                    type="text"
                    variant="standard"
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
    case "removeStudent": {
      const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.students = selectedStudents;
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
            <DialogTitle>Remove Students</DialogTitle>
            <DialogContent>
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
                    label="Students to Remove"
                    type="text"
                    variant="standard"
                  />
                )}
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
    case "addTeacher": {
      const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.classes = selectedClasses;
        let classList = [];
        console.log(selectedClasses)
        for (let i = 0; i < selectedClasses.length; i++) { 
          const q = query(collection(db, "classes"), where("name", "==", selectedClasses[i].label));
          const querySnapshot = await getDocs(q);
          const classDocument = querySnapshot.docs[0];
          console.log(classDocument.id + " => " + classDocument.data());
          classList.push({class: doc(db, '/classes/'+classDocument.id)});
        }
        formJson.classes = classList;
        console.log(formJson); // TODO: Finish
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
            <DialogTitle>Add Teacher</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                required
                margin="dense"
                id="teacherName"
                name="name"
                label="Teacher Name"
                type="text"
                variant="standard"
              />
              <br />
              <TextField
                autoFocus
                required
                margin="dense"
                id="teacherID"
                name="id"
                label="Teacher ID"
                type="text"
                variant="standard"
              />
              <Autocomplete
                multiple
                options={exampleAutocomplete}
                onChange={(event, newValue) => setSelectedClasses(newValue)}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    id="classes"
                    name="classes"
                    label="Classes"
                    type="text"
                    variant="standard"
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
    case "removeTeacher": {
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(selectedTeachers);
        for (let i = 0; i < selectedTeachers.length; i++) { // Changed from selectedClasses to selectedTeachers
          const q = query(collection(db, "teachers"), where("name", "==", selectedTeachers[i].label));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) { // Check if the querySnapshot is not empty
            const teacherDocument = querySnapshot.docs[0];
            let classArray = []
            for (let j = 0; j < teacherDocument.data().classes.length; j++) {
              console.log(teacherDocument.data().classes[j])
              const classDoc = await getDoc(db, teacherDocument.data().classes[j])
              console.log(classDoc.data())
            }
            //await deleteDoc(doc(db, '/teachers/'+teacherDocument.id))
            console.log("Teacher document located at " + teacherDocument.id + " has been deleted.")
          } else {
            console.log("No document found for teacher: " + selectedTeachers[i].label);
          }
        }
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
            <DialogTitle>Remove Teachers</DialogTitle>
            <DialogContent>
              <Autocomplete
                multiple
                options={exampleAutocomplete}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => setSelectedTeachers(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="dense"
                    id="teachers"
                    name="teachers"
                    label="Teachers to Remove"
                    type="text"
                    variant="standard"
                  />
                )}
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
    case "editGrade": {
      const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        handleClose();
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
      const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        formJson.classes = selectedClasses;
        console.log(formJson);
        handleClose();
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
            <DialogTitle>Remove Classes</DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Placeholder</Button>
            </DialogActions>
          </Dialog>
        </>
      );
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
  { label: "Mr. Moore's Math Class"},
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
