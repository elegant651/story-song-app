'use client'
import { StyledSection } from './index'
import { Container, Box, Typography, Stack } from '@mui/material'
import MintingBox from '~/containers/Markets/Mint/MintingBox'

const Mint = () => {

  return (
    <StyledSection>
      <Container>
        <Box px='20px'>
          <Box><Typography fontSize='20px' fontWeight={500}>Mint</Typography></Box>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography variant='p' color='#8988a3'>Create song and mint StorySong NFT.</Typography>
          </Stack>
          <Box mt='60px' display='flex' justifyContent='center'>
            <MintingBox />
          </Box>
        </Box>
      </Container>
    </StyledSection>
  )
}

export default Mint
