import { Box, Stack } from '@mui/material';
import { ChannelCard, VideoCard } from './';

export const Videos = ({ videos = [], direction = 'row' }) => {
  return (
    <Stack direction={direction} flexWrap='wrap' justifyContent='space-evenly' gap={2} data-cy='videos-box'>
      {videos.map((item, idx) => {
        return (
          <Box key={idx} data-cy='element-card'>
            {item.id.videoId && <VideoCard video={item} />}
            {item.id.channelId && <ChannelCard channelDetail={item} />}
          </Box>
        );
      })}
    </Stack>
  );
};
