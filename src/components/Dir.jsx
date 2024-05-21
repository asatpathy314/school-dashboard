import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';;

import './../styles/dir.css'

const Dir = (data) => {
    return (
        <div>
            <h1>{data['type']} Directory</h1>
            <Autocomplete className="dir-search" options={['hi', 'bye']} renderInput={(params) => <TextField {...params} label={data['type']} />}/>

            <div className='list'>{data['comp']}</div>

            <div className='button-container'>
                <Button style={{float: "left"}} variant="contained">Add {data['type']}</Button>
                <Button style={{float: "right"}} classname="but" variant="contained">Remove {data['type']}</Button>
            </div>
        
        </div>
    )
}

export default Dir