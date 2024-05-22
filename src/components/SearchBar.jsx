import React from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = ({ onSearch, hasSearched }) => {
    // const handleSearchChange = (e) => {
    //     onSearch(e.target.value);
    // };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Submit search
            onSearch(e.target.value);
            hasSearched = true;
        }
    };

    return (
        <TextField
            label="Search"
            // onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '1rem' }}
        />
    );
};

export default SearchBar;
