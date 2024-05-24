import { useState } from 'react';
import Button from '@mui/material/Button';
import FormModal from './FormModal';
import AddEvent from './modals/AddEvent';
import { useNavigate } from 'react-router-dom';
import './../styles/dir.css'

const Dir = (data) => {
    const [openAdd, setOpenAdd] = useState(false);
    const [openRemove, setOpenRemove] = useState(false);
    const navigate = useNavigate();

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

    const handleBack = () => {
        navigate('/');
    }

    return (
        <>
            <div className='container'>
                <Button
                    sx={{
                        background: '#6246EA',
                        border: '1px solid rgb(89, 89, 89)',
                        textTransform: 'none',
                        boxShadow: 'none',
                        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                        fontWeight:400,
                        '&:hover': {
                        boxShadow: 'none',
                        backgroundColor: '#fffffe',
                        color: '#2b2c34'
                        },
                    }}
                    style={{float: "right"}}
                    className="but"
                    variant="contained"
                    onClick={handleBack}
                >Home</Button> 
                <h2 className='h2'>{data['type'] === 'indClass' ? data['name'] : data['type'] + ' Directory'}</h2>
                <div className='overall'>
                    <div className='list'>
                        <div className='comp'>{data['comp']}</div>
                    </div>
                    {data['type'] == 'indClass' ? '' :
                        <div className='button-container'>
                            <Button
                                sx={{
                                    background: '#6246EA',
                                    border: '1px solid rgb(89, 89, 89)',
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                                    fontWeight:400,
                                    '&:hover': {
                                      boxShadow: 'none',
                                      backgroundColor: '#fffffe',
                                      color: '#2b2c34'
                                  },
                                   }}
                                style={{float: "left"}}
                                variant="contained"
                                onClick={handleClickOpenAdd}
                            >
                                Add {data['type']}
                            </Button>
                            <FormModal modalType={"add" + data['type']} open={openAdd} handleClose={handleCloseAdd} handleClickOpen={handleClickOpenAdd}/>
                            <Button
                                sx={{
                                    background: '#6246EA',
                                    border: '1px solid rgb(89, 89, 89)',
                                    textTransform: 'none',
                                    boxShadow: 'none',
                                    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                                    fontWeight:400,
                                    '&:hover': {
                                      boxShadow: 'none',
                                      backgroundColor: '#fffffe',
                                      color: '#2b2c34'
                                  },
                                   }}
                                style={{float: "right"}}
                                className="but"
                                variant="contained"
                                onClick={handleClickOpenRemove}
                            >
                                Remove {data['type']}
                            </Button>
                            <FormModal modalType={"remove" + data['type']} open={openRemove} handleClose={handleCloseRemove} handleClickOpen={handleClickOpenRemove}/>
                        </div>
                    }
                </div>
        </div>
        </>
    )
}

export default Dir
