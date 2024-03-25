import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
        `/search?part=snippet&relatedToVideoId=${videoId}&type=video`,
      );

      setVideos(relatedVideos.items);
    })();
  }, [videoId]);

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }} pl={2}>
        <Box flex={1}>
          <Box sx={{ width: '100%', top: '50px' }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              className="react-player"
              controls
              data-cy="react-player"
            />

            <Typography color="#FFF" variant="h5" fontWeight="bold" p={2}>
              {snippet.title}
            </Typography>

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: '#FFF' }}
              py={1}
              px={2}
              data-cy="video-info"
            >
              <Link to={`/channel/${snippet.channelId}`} data-cy="channel-link">
                <Typography sx={{ variant: { sm: 'subtitle1', md: 'h6' } }} color="#FFF">
                  {snippet.channelTitle}
                  <CheckCircleOutlineIcon sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
                </Typography>
              </Link>

              <Stack direction="row" gap="20px" alignItems="center">
                <VisibilityIcon fontSize="small" />
                <Typography variant="body1" sx={{ opacity: '0.7' }}>
                  {parseInt(statistics.viewCount).toLocaleString()} views
                </Typography>

                <ThumbUpIcon fontSize="small" />
                <Typography variant="body1" sx={{ opacity: '0.7' }}>
                  {parseInt(statistics.likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        {/* videos */}
        <Box
          px={2}
          py={{ md: 0, xs: 5 }}
          justifyContent="center"
          alignItems="center"
          sx={{ overflowY: 'auto', height: '95vh' }}
        >
          <Videos videos={videos} direction={{ xs: 'row', md: 'column' }} />
        </Box>
      </Stack>
    </Box>
  );
};
