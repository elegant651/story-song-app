import { Box, Stack, Divider, Typography, useMediaQuery, Theme } from '@mui/material'
import { styled } from '@mui/material/styles'
// import Chart from '~/components/Markets/MarketDetail/Chart'
import { useGetMuseNft } from '~/hooks/music/useGetMuseNft'
import AudioVizPlayer from '~/components/Music/AudioVizPlayer'
import Link from 'next/link'
import { useAccount, useWalletClient } from 'wagmi'
import { useGetNft } from '~/hooks/useGetNft'

const NftDetail = ({ nftAddress, listingAddress, isOwner }: { nftAddress: string, listingAddress?: string, isOwner: boolean }) => {
  const isMobileOnSize = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const { data: wallet } = useWalletClient()

  const assetData = useGetMuseNft(nftAddress)


  // useEffect(() => {
  // 	const fetchData = async () => {
  // 		if (nftAddress) {
  // 			const data = await getAptogotchi(nftAddress)
  // 			console.log('d', data)
  // 			setAssetData(data)
  // 		}
  // 	}
  // 	fetchData()
  // }, [nftAddress])

  return (
    <>
      {assetData ? (
        <Stack mb={2} direction="column" pl={isMobileOnSize ? 0 : 5} pt={isMobileOnSize ? 5 : 1} pb={1} maxWidth={isMobileOnSize ? '100%' : '750px'} px={isMobileOnSize ? 3 : 0}>
          <Box mb='16px'>
            <Box display="inline-flex" alignItems="center">
              <img src={assetData.image_url} width={100} alt={assetData.title} style={{ borderRadius: '10px' }} />
              <Box ml='16px'>
                <Typography variant='h3' fontWeight={500} color='#8988a3'>{assetData.title}</Typography>
                <Link
                  href={`https://explorer.aptoslabs.com/object/${assetData.address}?network=testnet`}
                  rel="noopener noreferrer"
                  target="_blank"
                ><Typography variant="p_lg" fontWeight={300}>{assetData.address.slice(0, 10) + '...' + assetData.address.slice(-10)}</Typography></Link>
                <Box display='flex' alignItems='center' gap={1} mt='8px'>
                  {assetData.tags.split(' ').map((tag: string) => (
                    <TagBox><Typography variant='p' fontWeight={500} whiteSpace='nowrap'>{tag}</Typography></TagBox>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* <Chart assetIndex={assetId} pythSymbol={assetData.pythSymbol} /> */}

          <AudioVizPlayer audioSrc={assetData.audio_url} />

          <OverviewWrapper>
            <Typography variant='h3' fontWeight={500}>NFT Overview</Typography>
            <Stack direction={isMobileOnSize ? "column" : "row"} justifyContent="flex-start" spacing={isMobileOnSize ? 3 : 9} mt='25px'>
              {/* <Box width='160px'>
                <Box><Typography variant='p' color='#8988a3'>Price</Typography></Box>
                <Box mt='8px'>
                  <Typography variant='h3' fontWeight={500} whiteSpace='nowrap'>{assetData.price} APT</Typography>
                </Box>
              </Box> */}
              <Box width='160px'>
                <Box><Typography variant='p' color='#8988a3'>Seller address</Typography></Box>
                <Box mt='8px'>
                  <Link
                    href={`https://aeneid.storyscan.io/address/${assetData.seller_address}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  ><Typography variant='p_xlg' fontWeight={500} whiteSpace='nowrap'>{assetData.seller_address.slice(0, 10)}...{assetData.seller_address.slice(-10)}</Typography></Link>
                </Box>
              </Box>
            </Stack>
          </OverviewWrapper>

          <Box>
            <StyledDivider />

            <Box padding='10px'>
              <Stack direction={'row'} mt='15px'>
                <Box>
                  <Box><Typography variant='p' color='#8988a3'>Prompt</Typography></Box>
                  <Box mt='8px'>
                    <Typography variant='p_lg' fontWeight={500}>{assetData.prompt}</Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>

          {/* <StyledDivider />

					<Box marginBottom='40px' padding='10px'>
						<Typography variant='h3' fontWeight={500}>About {assetData.tickerSymbol}</Typography>
						<Box lineHeight={1} mt='8px'><Typography variant='p_lg'>{assetData.detailOverview}</Typography></Box>
						<a href={``} target='_blank' rel="noreferrer"><Typography variant='p_lg' color='#c4b5fd' sx={{ ':hover': { textDecoration: 'underline' } }}>...read more</Typography> <Image src={LearnMoreIcon} alt='learnMore' style={{ marginBottom: '-3px' }} /></a>
					</Box> */}
        </Stack>
      ) : (
        <></>
      )}
    </>
  )
}

const OverviewWrapper = styled(Box)`
	margin-top: 15px; 
	margin-bottom: 5px; 
	padding: 10px;
`
const StyledDivider = styled(Divider)`
	background-color: ${(props) => props.theme.basis.plumFuzz};
	margin-bottom: 12px;
	margin-top: 12px;
	height: 1px;
`
const TagBox = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  border: solid 1px rgba(196, 181, 253, 0.25);
  padding: 3px 5px;
  color: #c4b5fd;
  font-size: 12px;
  white-space: nowrap;
  &:hover {
    background-color: rgba(196, 181, 253, 0.1);
  }
`

export default NftDetail
