'use client'
import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { LoadingSkeleton } from '~/components/Common/Loading'
import withSuspense from '~/hocs/withSuspense'
import { CustomNoRowsOverlay } from '~/components/Common/DataGrid'
import { Grid, CellTicker } from '~/components/Common/DataGrid'
import { GridEventListener } from '@mui/x-data-grid'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { ON_USD, RootMarketsDir } from '~/utils/constants'
import { useGetAllListedNfts } from '~/hooks/useGetAllListedNfts'
import Link from 'next/link'

const MarketList = () => {
	const router = useRouter()

	const isMobileOnSize = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	const listedNfts = useGetAllListedNfts();

	const assets = listedNfts?.map((item, index) => {
		return {
			...item,
			idx: index
		}
	})


	let columns: GridColDef[] = [
		{
			field: 'address',
			headerClassName: 'super-app-theme--header',
			cellClassName: 'super-app-theme--cell',
			headerName: 'Address',
			flex: 5,
			renderCell(params: GridRenderCellParams<string>) {
				return (
					<CellTicker address={params.value} name={params.row.name} />
				)
			},
		},
		{
			field: 'price',
			headerClassName: 'super-app-theme--header right--header',
			cellClassName: 'super-app-theme--cell right--cell',
			headerName: `Price`,
			flex: 3,
			renderCell(params: GridRenderCellParams<string>) {
				return <Box textAlign={isMobileOnSize ? 'right' : 'left'}>
					<Typography variant='p_xlg'>{params.value} APT</Typography>
				</Box>
			}
		},
		{
			field: 'seller_address',
			headerClassName: 'super-app-theme--header right--header',
			cellClassName: 'super-app-theme--cell right--cell',
			headerName: 'SellerAddress',
			flex: 3,
			renderCell(params: GridRenderCellParams<string>) {
				return <Typography variant='p_xlg' sx={{ maxWidth: '200px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{params.value}</Typography>
			},
		},
		{
			field: 'view',
			headerClassName: 'super-app-theme--header right--header',
			cellClassName: 'super-app-theme--cell right--cell',
			headerName: 'View',
			flex: 3,

			renderCell(params: GridRenderCellParams<string>) {
				return <Link
					href={`https://aeneid.explorer.story.foundation/ipa/${params.address}`}
					rel="noopener noreferrer"
					target="_blank"
				><Typography variant='p_xlg' color='#c4b5fd'>View NFT</Typography></Link>
			},
		},
	]

	columns = columns.map((col) => Object.assign(col, { hideSortIcons: true, filterable: false }))

	// const handleFilterChange = (event: React.SyntheticEvent, newValue: FilterType) => {
	// 	setFilter(newValue)
	// }

	// const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const newVal = e.currentTarget.value
	// 	if (newVal) {
	// 		setSearchTerm(newVal)
	// 	} else {
	// 		setSearchTerm('')
	// 	}
	// }, [searchTerm])

	const handleRowClick: GridEventListener<'rowClick'> = useCallback((
		params
	) => {
		router.push(`${RootMarketsDir}/trade/${params.row.address}`)
	}, [])

	return (
		<Box
			sx={{
				width: '100%',
				background: '#0f0e14',
				paddingBottom: '25px',
				color: '#fff',
				borderRadius: '10px',
				'& .super-app-theme--header': { color: '#9d9d9d', fontSize: '11px' },
				'& .non-hover-row': { ':hover': { background: '#0f0e14' } }
			}}>

			<Box mb='9px'><Typography variant='p_xlg'>All clAssets on Clone Protocol</Typography></Box>
			<Grid
				headers={columns}
				rows={assets || []}
				minHeight={110}
				customNoResultsOverlay={() => CustomNoRowsOverlay('No assets')}
				onRowClick={handleRowClick}
			/>
		</Box>
	)
}



export default withSuspense(MarketList, <LoadingSkeleton />)
