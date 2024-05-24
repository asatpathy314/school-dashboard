import React from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard');
    }

    return (
        <>
            <h1>Hey, Patriot!</h1>
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
                onClick={handleClick}
            >Let's Get Started!</Button> 
        </>
    )
}

export default LandingPage