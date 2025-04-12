'use client'
import { styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import MuseNftList from '~/containers/Musics/MuseNftList'

const Home = () => {

  return (
    <div>
      <StyledSection>
        <Container>
          <MuseNftList />
        </Container>
      </StyledSection>
    </div>
  )
}

export const StyledSection = styled('section')`
	max-width: 1085px;
	margin: 0 auto;
  padding-bottom: 20px;
	${(props) => props.theme.breakpoints.up('md')} {
		padding-top: 130px;
	}
	${(props) => props.theme.breakpoints.down('md')} {
		padding: 110px 0px;
	}
`

export default Home

