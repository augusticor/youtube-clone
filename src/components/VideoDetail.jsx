import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { fetchFromAPI } from '../utils/fetchFromApi';
import { Videos } from '.';

export const VideoDetail = () => {
  const { id: videoId } = useParams();
  const [snippet, setSnippet] = useState({ title: '', channelId: '', channelTitle: '' });
  const [statistics, setStatistics] = useState({ viewCount: 0, likeCount: 0 });
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await fetchFromAPI(`/videos?part=snippet,statistics&id=${videoId}`);

      const { title, channelId, channelTitle } = data.items[0].snippet;
      const { viewCount, likeCount } = data.items[0].statistics;

      setSnippet({ title, channelId, channelTitle });
      setStatistics({ viewCount, likeCount });

      // fetch related videos
      const relatedVideos = await fetchFromAPI(
        `/search?part=snippet&relatedToVideoId=${videoId}&type=video`
      );

      setVideos(relatedVideos.items);
    })();
  }, [videoId]);

  return (
    <Box minHeight='95vh'>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              className='react-player'
              controls
            />

            <Typography color='#FFF' variant='h5' fontWeight='bold' p={2}>
              {snippet.title}
            </Typography>

            <Stack
              direction='row'
              justifyContent='space-between'
              sx={{ color: '#FFF' }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${snippet.channelId}`}>
                <Typography variant={{ sm: 'subtitle1', md: 'h6' }} color='#FFF'>
                  {snippet.channelTitle}
                  <CheckCircleOutlineIcon
                    sx={{ fontSize: '12px', color: 'gray', ml: '5px' }}
                  />
                </Typography>
              </Link>

              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant='body1' sx={{ opacity: '0.7' }}>
                  {parseInt(statistics.viewCount).toLocaleString()} views
                </Typography>
                <Typography variant='body1' sx={{ opacity: '0.7' }}>
                  {parseInt(statistics.likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        {/* videos */}
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent='center' alignItems='center'>
          <Videos videos={videos} direction='column' />
        </Box>
        
      </Stack>
    </Box>
  );
};
