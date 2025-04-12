'use client'
import React, { useState, useEffect } from 'react'
import { Box, Button, Stack, Theme, useMediaQuery } from '@mui/material'
import withSuspense from '~/hocs/withSuspense'
import { LoadingSkeleton } from '~/components/Common/Loading'
import NftDetail from './NftDetail'
import ListingComp from '~/components/Markets/Musics/ListingComp'
import { styled } from '@mui/material/styles'
import BuyComp from '~/components/Markets/Musics/BuyComp'


const NftDetailContainer = ({ nftAddress, listingAddress, isOwner = false }: { nftAddress: string, listingAddress?: string, isOwner: boolean }) => {
  const isMobileOnSize = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <div>
      <>
        <Stack direction={isMobileOnSize ? 'column' : 'row'} gap={5} justifyContent="center" alignItems={isMobileOnSize ? "center" : ""}>
          <Box minWidth={isMobileOnSize ? '360px' : '750px'} width={isMobileOnSize ? '100%' : '750px'} bgcolor={isMobileOnSize ? '#0f0e14' : 'transparent'} zIndex={99}>
            <NftDetail nftAddress={nftAddress} listingAddress={listingAddress} isOwner={isOwner} />
          </Box>
          <Box width={isMobileOnSize ? '100%' : '420px'} height='100%' overflow={isMobileOnSize ? 'auto' : 'hidden'} position={isMobileOnSize ? 'fixed' : 'relative'} display={isMobileOnSize ? 'flex' : 'block'} justifyContent={isMobileOnSize ? 'center' : ''} top={isMobileOnSize ? '85px' : 'inherit'} mt='24px' mb={isMobileOnSize ? '180px' : '0px'}>
            {(!isOwner && listingAddress) && <BuyComp nftAddress={nftAddress} listingAddress={listingAddress} />}
            {isOwner && <ListingComp nftAddress={nftAddress} />}
          </Box>
        </Stack>
      </>
    </div>
  )
}

export default withSuspense(NftDetailContainer, <Box mt='10px'><LoadingSkeleton /></Box>)
