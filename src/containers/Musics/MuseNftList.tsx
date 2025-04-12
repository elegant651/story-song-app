'use client'
import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { FilterType } from '~/data/filter'
import { LoadingSkeleton } from '~/components/Common/Loading'
import withSuspense from '~/hocs/withSuspense'
import { CustomNoRowsOverlay } from '~/components/Common/DataGrid'
import { Grid, CellTicker } from '~/components/Common/DataGrid'
import { GridEventListener } from '@mui/x-data-grid'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { ON_USD, RootMarketsDir } from '~/utils/constants'
import Link from 'next/link'
import { useGetAllListedNfts } from '~/hooks/useGetAllListedNfts'

const MuseNftList = () => {
	const router = useRouter()

	const isMobileOnSize = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	const listedNfts = useGetAllListedNfts() //useGetAllMuseNfts();

	const assets = listedNfts?.map((item, index) => {
		return {
			...item,
			idx: index
		}
	})

	let columns: GridColDef[] = [
		{
			field: 'image_url',
			headerName: 'Image',
			flex: 0,
			renderCell(params: GridRenderCellParams<string>) {
				return (
					<Box>
						<img src={params.value} height={60} alt={params.row.title} style={{ borderRadius: '10px' }} />
					</Box>
				)
			},
		},
		{
			field: 'title',
			headerClassName: 'super-app-theme--header',
			cellClassName: 'super-app-theme--cell',
			headerName: 'Title',
			flex: 5,
			renderCell(params: GridRenderCellParams<string>) {
				return (
					<Typography variant='p_lg'>{params.value}</Typography>
				)
			},
		},
		// {
		// 	field: 'price',
		// 	headerClassName: 'super-app-theme--header right--header',
		// 	cellClassName: 'super-app-theme--cell right--cell',
		// 	headerName: `price`,
		// 	flex: 3,
		// 	renderCell(params: GridRenderCellParams<string>) {
		// 		return <Box textAlign={isMobileOnSize ? 'right' : 'left'}>
		// 			<Typography variant='p_lg'>{params.value} APT</Typography>
		// 		</Box>
		// 	}
		// },
		{
			field: 'tags',
			headerClassName: 'super-app-theme--header right--header',
			cellClassName: 'super-app-theme--cell right--cell',
			headerName: 'Tags',
			flex: 3,
			renderCell(params: GridRenderCellParams<string>) {
				return <Typography variant='p' sx={{ color: '#8988a3', maxWidth: '300px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{params.value}</Typography>
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

	const handleRowClick: GridEventListener<'rowClick'> = useCallback((
		params
	) => {
		router.push(`${RootMarketsDir}/trade/${params.row.address}?listingAddress=${params.row.listing_address}`)
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

			<Box mb='9px'><Typography variant='p_xlg'>All StorySong NFTs</Typography></Box>
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



export default withSuspense(MuseNftList, <LoadingSkeleton />)
