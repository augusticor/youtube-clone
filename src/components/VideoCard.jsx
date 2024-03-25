import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link } from 'react-router-dom';

import { demoVideoUrl, demoChannelTitle, demoVideoTitle } from '../utils/constants';

export const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
}) => {
  //
  return (
    <Card
      sx={{
        width: { xs: '100%', sm: '358px', md: '320px' },
        boxShadow: 'none',
        borderRadius: 0,
      }}
    >
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia
          image={snippet?.thumbnails?.medium?.url}
          sx={{ width: { xs: '100%', sm: '358px', md: '320px' }, height: 180 }}
        />
      </Link>

      <CardContent sx={{ backgroundColor: '#1e1e1e', height: '90px' }}>
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl} data-cy="video-card-link">
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {snippet?.title.slice(0, 50) || demoVideoTitle.slice(0, 50)}
          </Typography>
        </Link>

        <Link to={`/channel/${snippet?.channelId}`} data-cy="channel-card-link">
          <Typography variant="subtitle2" fontWeight="bold" color="gray" mt="15px">
            {snippet?.channelTitle || demoChannelTitle}
            <CheckCircleOutlineIcon sx={{ fontSize: 15, color: 'gray', ml: '5px' }} />
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};
