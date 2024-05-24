import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import tjImage from '../../public/tj mascott.webp'; // Import your tall rectangular PNG image
import '../styles/LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/dashboard');
    };

    return (
        <Grid container className='landing-page'>
            <Grid item xs={12} sm={6}>
                <img src={tjImage} alt="TJ Elementary Mascott" className="mascott" />
            </Grid>
            <Grid item xs={12} sm={6} container direction="column" alignItems="left" justifyContent="space-between">
                <Typography variant="h2" gutterBottom>
                    Hey, Patriot!
                </Typography>
                <Typography variant="body1" fontSize={25}>
                    Welcome to your very own Adiministrative Dashboard.
                </Typography>
                <br></br>
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
                            color: '#2b2c34',
                        },
                        width: '175px',
                    }}
                    style={{float: "left"}}
                    className="but"
                    variant="contained"
                    onClick={handleClick}
                >Let's Get Started!</Button> 
            </Grid>
        </Grid>
    );
};

export default LandingPage;

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