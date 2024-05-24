import React from 'react'
import Button from '@mui/material/Button'

const DashButton = ({ onClickMethod, buttonText }) => {
  return (
    <>
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
            onClick={onClickMethod}
          >{buttonText}</Button> 
    </>
  )
}

export default DashButton