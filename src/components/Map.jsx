import { DataGrid } from '@mui/x-data-grid';

const Map = (props) => {
    //switch statement
    const { data, ids, personNames, classNames, studentGrades, averageGrades} = props;
    const columns = [];

    // Conditionally add columns based on the props received
    if (ids) {
        columns.push({
            field: 'id',
            headerName: 'ID',
            type: 'number',
            width: 70,
        });
    }

    if (personNames) {
        columns.push({
            field: 'fullName',
            headerName: 'Name',
            flex: 1,
        });
    }

    if (classNames) {
        columns.push({ field: 'className', headerName: 'Class Name', width: 130});
    }
    if (studentGrades) {
        columns.push({ field: 'grade', headerName: 'Grade', width: 90 });
    }
    if (averageGrades) {
        columns.push({ field: 'averageGrade', headerName: 'Average Grade', width: 90 });
    }

    //fake data
    const rows = [
        { fullName: 'Snow', id: 35, gender:"female"},
        { fullName: 'Lannister', id: 42 },
        { fullName: 'Lannister', id: 45 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
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