import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { fetchFromAPI } from '../utils/fetchFromApi';
import { SideBar } from './SideBar';
import { Videos } from './Videos';

export const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchFromAPI(`/search?part=snippet&q=${selectedCategory}`);
      setVideos(data.items);
    })();
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: 'column', md: 'row ' } }}>
      <Box
        sx={{
          height: { sx: 'auto', md: '100vh' },
          borderRight: '1px solid #2a0909',
          px: { sx: 0, md: 2 },
        }}
      >
        <SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </Box>

      <Box p={2} sx={{ overflowY: 'auto', height: '100vh', flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: 'white' }}
          data-cy="category-title"
        >
          {selectedCategory} <span style={{ color: '#F31503' }}>Videos</span>
        </Typography>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};
