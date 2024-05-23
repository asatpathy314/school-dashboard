import { DataGrid } from '@mui/x-data-grid';
import { React, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FormModal from './FormModal';
import { removeStudent } from "../lib/student.js";
import { Link } from 'react-router-dom';
import AddClass from './modals/AddClass.jsx';
import AddStudent from './modals/AddStudent.jsx';
import AddTeacher from './modals/AddTeacher.jsx';

const Map = (props) => {
    const [columns, setColumns] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { data, ids, personNames, classNames, studentGrades, classGrade, averageGrades, email, dataType, forDashboard } = props;
    const [hasSearched, setHasSearched] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [rowSelected, setRowSelected] = useState(false);
    const [values, setValues] = useState({})

    console.log(data);

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };
    
    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    useEffect(() => {
        const newColumns = [];

        // Conditionally add columns based on the props received
        if (!forDashboard && ids && dataType !== "Class") {
            newColumns.push({
                field: 'id',
                headerName: 'ID',
                type: 'number',
                flex: 0.7,
            });
        }

        if (dataType === "Class" && ids) {
            newColumns.push({
                field: 'id',
                headerName: 'ID',
                type: 'number',
                flex: 2.3,
                renderCell: (params) => <Link to={"/class/" + params['id']}>{params['id']}</Link>
            });
        }

        if (personNames) {
            if (forDashboard) {
                newColumns.push({
                    field: 'fullName',
                    headerName: 'Name',
                    width: 125,
                })
            } else {
                newColumns.push({
                    field: 'fullName',
                    headerName: 'Name',
                    flex: 2,
                });
            }
        }

        if (classNames) {
            newColumns.push({ 
                field: 'className', 
                headerName: 'Class Name', 
                width: 500 });
        }
        if (studentGrades) {
            if (forDashboard) {
                newColumns.push({ field: 'grade', 
                headerName: 'Grade', 
                width: 120, });
            } else {
                newColumns.push({ field: 'grade', 
                headerName: 'Grade', 
                flex: 1.4, });
            }
        }
        if (classGrade) {
            newColumns.push({ field: 'classGrade', 
            headerName: 'Class Grade', 
            flex: 1.4, editable: true});
        }
        if (!forDashboard && averageGrades) {
            newColumns.push({ field: 'averageGrade', 
            headerName: 'Average Grade', 
            flex: 2, 
            valueFormatter: (value) => value !== 'N/A' ? `${value}%` : value })
        }
        
        // if (averageGrades) {
        //     if (forDashboard) {
        //         newColumns.push({ field: 'averageGrade', 
        //         headerName: 'Avg Grade', 
        //         width: 80, 
        //         valueFormatter: (value) => value !== 'N/A' ? `${value}%` : value })
        //     } else {
        //         newColumns.push({ field: 'averageGrade', 
        //         headerName: 'Average Grade', 
        //         flex: 2, 
        //         valueFormatter: (value) => value !== 'N/A' ? `${value}%` : value })
        //     }
        // }
        if (email) {
            if (forDashboard) {
                newColumns.push({ field: 'email', 
                    headerName: 'Email', 
                    width: 150 
                });
            } else {
                newColumns.push({ field: 'email', 
                    headerName: 'Email', 
                    width: 320 
                });
            }
        }
        if (dataType) {
            newColumns.push({
                field: 'edit',
                headerName: 'Edit',
                renderCell: (params) => <EditRoundedIcon onClick={() => {
                    setValues(params);
                    handleClickOpenAdd()
                }} />,
                flex: 2,
                headerAlign: 'right',
                align: 'right',
            });
        }
        

        setColumns(newColumns);
    }, [ids, personNames, classNames, studentGrades, averageGrades, email]);

    useEffect(() => { 
        if (hasSearched) {
            setFilteredData(data.filter((row) =>
                Object.values(row).some(
                    (value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
                )
            ));
        } else {
            // Reset filteredData if searchQuery is empty
            setFilteredData(data);
        }
    }, [searchQuery, hasSearched, data]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setHasSearched(true);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setSearchQuery(e.target.value);
            setHasSearched(true);
        }
    };

    const handleRowSelection = (newSelection) => {
        setRowSelectionModel(newSelection);
        const selectedRowIds = new Set(newSelection);
        const newlySelectedRows = filteredData.filter((row) => selectedRowIds.has(row.id));
        setSelectedRows(newlySelectedRows);
        setRowSelected(true);
    }

    const handleDelete = () => {
        if (dataType == 'Student') {
            let toDelete = {
                'students': []
            }
            selectedRows.forEach((row) => {
                toDelete.students.push({
                    'label': row.fullName
                })
            })
        // console.log(toDelete);
            removeStudent(toDelete);
        } else if (dataType == 'Teacher') {
            let toDelete = {
                'teachers': []
            }
            selectedRows.forEach((row) => {
                toDelete.teachers.push({
                    'label': row.fullName
                })
            })

        }
        
        const updatedData = filteredData.filter((row) => {
            return !toDelete.students.some((deleteRow) => deleteRow.label == row.fullName);
        })
        setFilteredData(updatedData);
    }

    if (forDashboard) {
        return (
            <div style={{ height: '100%', width: '100%', overflowY: 'auto' }}>
                <TextField
                    label="Search"
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyPress}
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: '1rem' }}
                />
                <DataGrid
                    rows={filteredData}
                    columns={columns}
                    autoHeight={true}
                    initialState={{
                        ...data.initialState,
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    disableRowSelectionOnClick = {true}
                />
                <FormModal modalType={"add" + dataType} open={openAdd} handleClose={handleCloseAdd} handleClickOpen={handleClickOpenAdd}/>
            </div>
        );
    } else {
        return (
            <div style={{ height: '100%', width: '100%', overflowY: 'auto' }}>
                <TextField
                    label="Search"
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyPress}
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: '1rem' }}
                />
                <DataGrid
                    rows={filteredData}
                    columns={columns}
                    autoHeight={true}
                    initialState={{
                        ...data.initialState,
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    checkboxSelection
                    keepNonExistentRowsSelected
                    disableRowSelectionOnClick = {true}
                    rowSelectionModel={rowSelectionModel}
                    onRowSelectionModelChange={handleRowSelection}
                />
                {
                    {
                    'Teacher': <AddTeacher handleClose={handleCloseAdd} open={openAdd} values={values['row']}/>,
                    'Class': <AddStudent handleClose={handleCloseAdd} open={openAdd} values={values['row']}/>,
                    'Student': <AddClass handleClose={handleCloseAdd} open={openAdd} values={values['row']}/>
                    }[dataType]
                }
                {/* <FormModal modalType={"add" + dataType} open={openAdd} handleClose={handleCloseAdd} handleClickOpen={handleClickOpenAdd}/> */}
                <div>{rowSelected ? <button onClick={handleDelete}>Test</button> : ''}</div>
            </div>
        );
    }
}

export default Map;