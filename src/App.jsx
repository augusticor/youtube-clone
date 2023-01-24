import { Box } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ChannelDetail, Feed, NavBar, SearchFeed, VideoDetail } from './components';

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ backgroundColor: '#000' }}>
        <NavBar />

        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/video/:id' element={<VideoDetail />} />
          <Route path='/channel/:id' element={<ChannelDetail />} />
          <Route path='/search/:searchTerm' element={<SearchFeed />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
