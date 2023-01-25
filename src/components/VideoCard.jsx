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
    <Card sx={{ width: { md: '360px', xs: '100%' }, boxShadow: 'none', borderRadius: 0 }}>
      <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
        <CardMedia image={snippet?.thumbnails?.medium?.url} sx={{ width: 358, height: 180 }} />

        <CardContent sx={{ backgroundColor: '#1e1e1e', height: '90px' }}>
          <Typography variant='subtitle1' fontWeight='bold' color='#FFF'>
            {snippet?.title.slice(0, 50) || demoVideoTitle.slice(0, 50)}
          </Typography>

          <Typography variant='subtitle2' fontWeight='bold' color='gray'>
            {snippet?.channelTitle || demoChannelTitle}

            <CheckCircleOutlineIcon sx={{ fontSize: 15, color: 'gray', ml: '5px' }} />
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};
