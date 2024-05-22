import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormModal from './FormModal';

import './../styles/dir.css'

const Dir = (data) => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openRemove, setOpenRemove] = useState(false);
    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };
    
    const handleCloseAdd = () => {
        setOpenAdd(false);
    };
    const handleClickOpenRemove = () => {
        setOpenRemove(true);
    };
    
    const handleCloseRemove = () => {
        setOpenRemove(false);
    };

    return (
        <div>
            <h2 className='h2'>{data['type']} Directory</h2>
            <div className='list'>{data['comp']}</div>
            <div className='button-container'>
                <Button style={{float: "left"}} variant="contained" onClick={handleClickOpenAdd}>Add {data['type']}</Button>
                <FormModal modalType={"add" + data['type']} open={openAdd} handleClose={handleCloseAdd} handleClickOpen={handleClickOpenAdd}/>
                <Button style={{float: "right"}} className="but" variant="contained" onClick={handleClickOpenRemove}>Remove {data['type']}</Button>
                <FormModal modalType={"remove" + data['type']} open={openRemove} handleClose={handleCloseRemove} handleClickOpen={handleClickOpenRemove}/>
            </div>
        
        </div>
    )
}

export default Dir