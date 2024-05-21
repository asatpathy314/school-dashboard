import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

const Map = (props) => {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const { data, ids, personNames, classNames, studentGrades, averageGrades} = props;

    useEffect(() => {
        setRows(data);
    }, [data]);

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
        <div style={{ height: '100%', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    ...data.initialState,
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 25]}
                disableRowSelectionOnClick = {true}
            />
        </div>
    );
}

export default Map;