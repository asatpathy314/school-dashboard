import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

const Map = (props) => {
    const [columns, setColumns] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { data, ids, personNames, classNames, studentGrades, averageGrades} = props;
    const [hasSearched, setHasSearched] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const newColumns = [];

        // Conditionally add columns based on the props received
        if (ids) {
            newColumns.push({
                field: 'id',
                headerName: 'ID',
                type: 'number',
                width: 70,
            });
        }

        if (personNames) {
            newColumns.push({
                field: 'fullName',
                headerName: 'Name',
                flex: 1,
            });
        }

        if (classNames) {
            newColumns.push({ field: 'classNames', headerName: 'Class Name', width: 300});
        }
        if (studentGrades) {
            newColumns.push({ field: 'grade', headerName: 'Grade', width: 90 });
        }
        if (averageGrades) {
            newColumns.push({ field: 'averageGrade', headerName: 'Average Grade', width: 125 });
        }

        setColumns(newColumns);
    }, [ids, personNames, classNames, studentGrades, averageGrades]);

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
        </div>
    );
}

export default Map;