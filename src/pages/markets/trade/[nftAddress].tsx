'use client'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import NftDetailContainer from '~/containers/Musics/NftDetailContainer';

const AssetPage = () => {
  const router = useRouter()
  const { nftAddress, isOwner, listingAddress } = router.query

  return (
    <StyledSection
      sx={{
        backgroundColor: '#0f0e14',
      }}>
      <NftDetailContainer nftAddress={nftAddress} listingAddress={listingAddress} isOwner={isOwner} />
    </StyledSection>
  )
}

const StyledSection = styled('section')`
	${(props) => props.theme.breakpoints.up('md')} {
		padding-top: 120px;
	}
	${(props) => props.theme.breakpoints.down('md')} {
		padding: 70px 0px 110px 0px;
	}
`

export default AssetPage
