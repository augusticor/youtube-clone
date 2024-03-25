import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ChannelCard, Videos } from '.';
import { fetchFromAPI } from '../utils/fetchFromApi';

export const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id: channelId } = useParams();

  useEffect(() => {
    (async () => {
      const data = await fetchFromAPI(`/channels?part=snippet&id=${channelId}`);
      setChannelDetail(data?.items[0]);

      const videosData = await fetchFromAPI(
        `/search?channelId=${channelId}&part=snippet&order=date`,
      );
      setVideos(videosData?.items);
    })();
  }, [channelId]);

  return (
    <Box minHeight="100vh">
      <Box>
        <div
          style={{
            background:
              'linear-gradient(90deg, rgba(4,0,0,1) 0%, rgba(189,36,47,1) 78%, rgba(171,17,22,1) 100%)',
            zIndex: 10,
            height: '120px',
          }}
        />

        <ChannelCard channelDetail={channelDetail} marginTop="-70px" />
      </Box>

      <Box display="flex" p={2}>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};
