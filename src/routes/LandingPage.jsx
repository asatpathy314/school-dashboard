import React from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard'); // Update the path as needed
    };

    return (
        <div className="landing-page">
            <Stack
                sx={{
                    alignItems: 'center', // Align items to center
                }}
            >
                <Typography variant="h2" gutterBottom>
                    Welcome to the TJ Elementary School Administrative Dashboard
                </Typography>
                <Typography variant="body1">
                    Discover a place where students are empowered to learn, grow, and succeed.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#6246ea', // Change the button color
                        width: '300px', // Make the button less wide
                        '&:hover': {
                            backgroundColor: '#5138d9', // Darken the button on hover for better UX
                        },
                    }}
                    onClick={handleClick}
                >
                    Go to Dashboard
                </Button>
            </Stack>
        </div>
    );
};

export default LandingPage;
/*
                <Grid item xs={12} md={6}>
                    <img src={schoolImage} alt="School" />
                </Grid>
*/
// import React from 'react'
// import Button from '@mui/material/Button'
// import { useNavigate } from 'react-router-dom'
// import '../styles/LandingPage.css'

// const LandingPage = () => {
//     const navigate = useNavigate();

//     const handleClick = () => {
//         navigate('/dashboard');
//     }

//     return (
//         <>
//             <div className='landing-page'>
//                 <h1>Hey, Patriot!</h1>
//                 <Button
//                     sx={{
//                         background: '#6246EA',
//                         border: '1px solid rgb(89, 89, 89)',
//                         textTransform: 'none',
//                         boxShadow: 'none',
//                         fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
//                         fontWeight:400,
//                         '&:hover': {
//                         boxShadow: 'none',
//                         backgroundColor: '#fffffe',
//                         color: '#2b2c34'
//                         },
//                     }}
//                     style={{float: "right"}}
//                     className="but"
//                     variant="contained"
//                     onClick={handleClick}
//                 >Let's Get Started!</Button> 
//             </div>
//         </>
//     )
// }

// export default LandingPage