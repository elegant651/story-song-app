import { Box, Button, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import { styled } from '@mui/material/styles'
import { GridColDef, GridEventListener, GridRenderCellParams } from '@mui/x-data-grid'
import { Grid, CellTicker, CustomNoOnAssetOverlay, CustomNoRowsOverlay } from '~/components/Common/DataGrid'
import { LoadingSkeleton } from '~/components/Common/Loading'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { MuseNft } from '~/hooks/music/useGetAllMuseNfts'
import { RootMarketsDir } from '~/utils/constants'
import { useAccount } from 'wagmi'

interface Props {
  assets: MuseNft[]
  isListed: boolean
  title: string
}

const OnAssetList: React.FC<Props> = ({ assets, isListed, title }) => {
  const { isConnected } = useAccount()
  const isMobileOnSize = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  const router = useRouter()
  const handleRowClick: GridEventListener<'rowClick'> = useCallback((
    params
  ) => {
    if (isListed) {
      router.push(`${RootMarketsDir}/trade/${params.row.address}?listingAddress=${params.row.listing_address}`)
    } else {
      router.push(`${RootMarketsDir}/trade/${params.row.address}?isOwner=true`)
    }
  }, [])

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
      headerName: 'Title',
      flex: 1,
      renderCell(params: GridRenderCellParams<string>) {
        return (
          <Box>
            <Typography variant='p_lg'>{params.value}</Typography>
          </Box>
        )
      },
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
      renderCell(params: GridRenderCellParams<string>) {
        return (
          <CellTicker address={params.value} name={params.row.name} />
        )
      },
    },
    {
      field: 'price',
      headerName: `Price`,
      headerClassName: 'right--header',
      cellClassName: 'right--cell',
      flex: 1,
      renderCell(params: GridRenderCellParams<string>) {
        return (
          <Box textAlign={isMobileOnSize ? 'right' : 'left'}>
            <Typography variant='p_lg'>{params.value} APT</Typography>
          </Box>
        )
      },
    },
    // {
    //   field: 'Listing',
    //   headerClassName: 'right--header',
    //   cellClassName: 'right--cell',
    //   headerName: 'actions',
    //   flex: 1,
    //   renderCell(params: GridRenderCellParams<string>) {
    //     return <ListingBtn onClick={() => onListing(params.row.address)}>{params.value}</ListingBtn>
    //   },
    // },
  ]
  columns = columns.map((col) => Object.assign(col, { hideSortIcons: true, filterable: false }))

  return (
    <>
      <TopBox>
        <Box><Typography variant='p' color='#8988a3'>{title}</Typography></Box>
      </TopBox>
      <Grid
        headers={columns}
        rows={assets || []}
        minHeight={110}
        isBorderTopRadius={false}
        noAutoHeight={!isConnected || assets?.length === 0}
        customNoResultsOverlay={() => (isConnected && assets && assets.length === 0) ? CustomNoOnAssetOverlay() : isConnected ? <LoadingSkeleton /> : CustomNoRowsOverlay('Please connect wallet.')}
        onRowClick={handleRowClick}
      />
    </>
  )
}

const TopBox = styled(Box)`
  height: 87px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-left: solid 1px rgba(196, 181, 253, 0.25);
  border-right: solid 1px rgba(196, 181, 253, 0.25);
  border-top: solid 1px rgba(196, 181, 253, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 29px;
`

// const ListingBtn = styled(Button)`
//   width: 107px;
//   height: 30px;
//   border-radius: 5px;
//   margin-top: 7px;
//   background-color: ${(props) => props.theme.basis.melrose};
//   &:hover {
//     background-color: ${(props) => props.theme.basis.melrose};
//   }
// `

export default OnAssetList
