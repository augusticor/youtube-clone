import { Box, Stack } from '@mui/material';
import { ChannelCard, VideoCard } from './';

export const Videos = ({ videos = [], direction = 'row' }) => {
  return (
    <Stack direction={direction} flexWrap='wrap' justifyContent='space-evenly' gap={2}>
      {videos.map((item, idx) => {
        return (
          <Box key={idx}>
            {item.id.videoId && <VideoCard video={item} />}
            {item.id.channelId && <ChannelCard channelDetail={item} />}
          </Box>
        );
      })}
    </Stack>
  );
};
