import { IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
  return (
    <Paper
      component='form'
      onSubmit={() => {}}
      sx={{
        borderRadius: 20,
        border: '1px solid #e3e3e3',
        pl: 2,
        boxShadow: 'none',
        mr: { sm: 5 },
      }}
    >
      <input
        className='search-bar'
        placeholder='Search a video ...'
        value=''
        onChange={() => {}}
      />

      <IconButton type='submit' sx={{ p: '10px', color: 'red' }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
