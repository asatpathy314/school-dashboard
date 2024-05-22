import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

const Map = (props) => {
    const [columns, setColumns] = useState([]);
    const { data, ids, personNames, classNames, studentGrades, averageGrades} = props;

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
            newColumns.push({ field: 'className', headerName: 'Class Name', width: 130});
        }
        if (studentGrades) {
            newColumns.push({ field: 'grade', headerName: 'Grade', width: 90 });
        }
        if (averageGrades) {
            newColumns.push({ field: 'averageGrade', headerName: 'Average Grade', width: 90 });
        }

        setColumns(newColumns);
    }, [ids, personNames, classNames, studentGrades, averageGrades]);

    return (
        <div style={{ width: '100%', overflowY: 'auto' }}>
            <DataGrid
                rows={data}
                columns={columns}
                autoHeight={true}
                initialState={{
                    ...data.initialState,
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                // If I add page size options, it will morph the CSS and make the div bigger than it should be
                pageSizeOptions={[10]}
                disableRowSelectionOnClick = {true}
            />
        </div>
    );
}

export default Map;