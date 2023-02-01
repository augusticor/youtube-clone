import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromApi';
import { Videos } from './Videos';
import { useParams } from 'react-router-dom';

export const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();

  useEffect(() => {
    (async () => {
      const data = await fetchFromAPI(`/search?part=snippet&q=${searchTerm}`);
      setVideos(data.items);
    })();
  }, [searchTerm]);

  return (
    <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
      <Typography variant='h4' fontWeight='bold' mb={2} sx={{ color: 'white' }} data-cy='search-string'>
        Search results for: <span style={{ color: '#F31503' }}>{searchTerm}</span>
      </Typography>

      <Videos videos={videos} />
    </Box>
  );
};
