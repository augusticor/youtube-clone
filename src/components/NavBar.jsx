import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { logo } from '../utils/constants';
import { SearchBar } from './SearchBar';

export const NavBar = () => {
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      sx={{ position: 'sticky', background: '#000', top: 0, p: 1}}
    >
      <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt='app logo' height={45} />
      </Link>

      <SearchBar />
    </Stack>
  );
};
