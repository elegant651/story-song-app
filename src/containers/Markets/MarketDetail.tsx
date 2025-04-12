import { Box, Stack, Divider, Typography, useMediaQuery, Theme } from '@mui/material'
import { styled } from '@mui/material/styles'
// import Chart from '~/components/Markets/MarketDetail/Chart'
import { MarketDetail } from '~/features/Markets/MarketDetail.query'
import { useGetNft } from '~/hooks/useGetNft'

const MarketDetail = ({ nftAddress }: { nftAddress: string }) => {
	const isMobileOnSize = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	const assetData = useGetNft(nftAddress)

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
					<Box>
						<Box display="inline-flex" alignItems="center">
							{/* <Image src={assetData.tickerIcon} width={30} height={30} alt={assetData.tickerSymbol} /> */}
							<Box ml='8px'>
								<Typography variant="h3" fontWeight={500}>{assetData.address}</Typography>
							</Box>
							<Box ml='8px'>
								<Typography variant='h3' fontWeight={500} color='#8988a3'>{assetData.name}</Typography>
							</Box>
						</Box>
					</Box>

					{/* <Chart assetIndex={assetId} pythSymbol={assetData.pythSymbol} /> */}

					<OverviewWrapper>
						<Typography variant='h3' fontWeight={500}>Market Overview</Typography>
						<Stack direction={isMobileOnSize ? "column" : "row"} justifyContent="flex-start" spacing={isMobileOnSize ? 3 : 9} mt='25px'>
							<Box width='160px'>
								<Box><Typography variant='p' color='#8988a3'>Price</Typography></Box>
								<Box mt='8px'>
									<Typography variant='h3' fontWeight={500} whiteSpace='nowrap'>{assetData.price} APT</Typography>
								</Box>
							</Box>
							<Box width='160px'>
								<Box><Typography variant='p' color='#8988a3'>Seller address</Typography></Box>
								<Box mt='8px'>
									<Typography variant='h3' fontWeight={500} whiteSpace='nowrap'>{assetData.sellerAddress}</Typography>
								</Box>
							</Box>
						</Stack>
					</OverviewWrapper>

					{/* {account && myData &&
						<Box>
							<StyledDivider />

							<Box padding='10px'>
								<Typography variant='h3' fontWeight={500}>My {assetData.tickerSymbol}</Typography>
								<Stack direction={isMobileOnSize ? "column" : "row"} justifyContent="flex-start" spacing={isMobileOnSize ? 3 : 9} mt='25px'>
									<Box width='160px'>
										<Box><Typography variant='p' color='#8988a3'>Balance</Typography></Box>
										<Box mt='8px'>
											<Typography variant='h3' fontWeight={500} whiteSpace='nowrap'>{formatLocaleAmount(myData.balance, 4)} {assetData.tickerSymbol}</Typography>
										</Box>
									</Box>
									<Box width='160px'>
										<Box><Typography variant='p' color='#8988a3'>Value</Typography></Box>
										<Box mt='8px'>
											<Typography variant='h3' fontWeight={500} whiteSpace='nowrap'>${formatLocaleAmount(myData.value)} {ON_USD}</Typography>
										</Box>
									</Box>
									<Box width='160px'>
										<Box><Typography variant='p' color='#8988a3'>Portfolio %</Typography></Box>
										<Box mt='8px'>
											<Typography variant='h3' fontWeight={500} whiteSpace='nowrap'>{myData.portfolioValue.toFixed(2)}%</Typography>
										</Box>
									</Box>
								</Stack>
							</Box>
						</Box>
					} */}

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

export default MarketDetail
