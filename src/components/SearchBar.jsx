import { useState } from 'react';
import { IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();

    if (searchTerm.length < 3) return;

    navigate(`/search/${searchTerm}`);
    setSearchTerm('');
  };

  return (
    <Paper
      component='form'
      onSubmit={onSearch}
      sx={{
        borderRadius: 20,
        border: '1px solid #e3e3e3',
        pl: 2,
        boxShadow: 'none',
        mr: { sm: 5 },
      }}
      data-cy='search-bar'
    >
      <input
        className='search-bar'
        placeholder='Search a video ...'
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <IconButton type='submit' sx={{ p: '10px', color: 'red' }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
