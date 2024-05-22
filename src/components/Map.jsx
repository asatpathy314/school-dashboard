import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FormModal from './FormModal';

const Map = (props) => {
    const [columns, setColumns] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { data, ids, personNames, classNames, studentGrades, averageGrades, email } = props;
    const [hasSearched, setHasSearched] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };
    
    const handleCloseAdd = () => {
        setOpenAdd(false);
    };

    useEffect(() => {
        const newColumns = [];

        // Conditionally add columns based on the props received
        if (ids) {
            newColumns.push({
                field: 'id',
                headerName: 'ID',
                type: 'number',
                flex: 0.7,
            });
        }

        if (personNames) {
            newColumns.push({
                field: 'fullName',
                headerName: 'Name',
                flex: 1.4,
            });
        }

        if (classNames) {
            newColumns.push({ 
                field: 'className', 
                headerName: 'Class Name', 
                flex: 1 });
        }
        if (studentGrades) {
            newColumns.push({ field: 'grade', 
            headerName: 'Grade', 
            flex: 1.4, });
        }
        if (averageGrades) {
            newColumns.push({ field: 'averageGrade', 
            headerName: 'Average Grade', 
            flex: 2, 
            valueFormatter: (value) => `${value}%` });
        }
        if (email) {
            newColumns.push({ field: 'email', headerName: 'Email', width: 320 });
        }
        newColumns.push({
            field: 'edit',
            headerName: 'Edit',
            renderCell: () => <EditRoundedIcon onClick={handleClickOpenAdd} />,
            flex: 2,
            headerAlign: 'right',
            align: 'right',
        });

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
                // If I add page size options, it will morph the CSS and make the div bigger than it should be
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick = {true}
            />
            <FormModal modalType={"add" + data['type']} open={openAdd} handleClose={handleCloseAdd} handleClickOpen={handleClickOpenAdd}/>
        </div>
    );
}

export default Map;