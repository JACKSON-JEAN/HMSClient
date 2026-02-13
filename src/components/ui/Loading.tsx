import { CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-2">
        <CircularProgress enableTrackSlot size="30px" />
    </div>
  )
}

export default Loading