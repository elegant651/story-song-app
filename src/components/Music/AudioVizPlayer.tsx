
import * as React from 'react'
import WavesurferPlayer from '@wavesurfer/react'
import { styled } from '@mui/material/styles'
import { Box, Button } from '@mui/material'

const AudioVizPlayer = ({ audioSrc }: { audioSrc: string }) => {
  const [wavesurfer, setWavesurfer] = React.useState(null)
  const [isPlaying, setIsPlaying] = React.useState(false)

  const onReady = (ws) => {
    setWavesurfer(ws)
    setIsPlaying(false)
  }

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause()
  }

  // const audioSrc = 'https://cdn1.suno.ai/22b845ce-fcae-4926-aff6-6af1335b977c.mp3'

  if (!audioSrc) {
    return <>No Audio</>
  }

  return (
    <div>
      <WavesurferPlayer
        height={100}
        waveColor="violet"
        url={audioSrc}
        onReady={onReady}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <Box display='flex' justifyContent='flex-end'>
        <PlayButton onClick={onPlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </PlayButton>
      </Box>
    </div>
  )
}

const PlayButton = styled(Button)` 
  width: 200px;
  height: 22px;
	display: flex;
	align-items: center;
	color: #fff;
	border-radius: 100px;
	background-color: rgba(65, 65, 102, 0.5);
	padding: 3px 0px 3px 5px;

	&:hover {
		background-color: rgba(65, 65, 102, 0.5);
		box-shadow: 0 0 0 1px ${(props) => props.theme.basis.melrose} inset;
	}
`

export default AudioVizPlayer