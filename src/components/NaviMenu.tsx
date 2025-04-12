import { usePathname } from 'next/navigation'
import { List, ListItemButton, Box, Fade, Typography, Stack, useMediaQuery, Theme } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import PortfolioIconOn from 'public/images/menu/portfolio-on.svg'

import SwapIconOn from 'public/images/menu/swap-on.svg'
import WrapperIconOn from 'public/images/menu/wrapper-on.svg'

import PortfolioIconOff from 'public/images/menu/portfolio-off.svg'
import SwapIconOff from 'public/images/menu/swap-off.svg'
import WrapperIconOff from 'public/images/menu/wrapper-off.svg'
import Image from 'next/image'
import { RootMarketsDir, RouteDir } from '~/utils/constants'

const CommonMenu = () => {
  const pathname = usePathname()
  const isMobileOnSize = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <List component="nav" sx={{ display: 'flex', padding: 0, gap: '3px' }}>
      <Link href={RootMarketsDir}>
        <NaviButton sx={{ width: { xs: '48px', sm: '69px' }, height: { xs: '30px', sm: '36px' } }} className={pathname?.startsWith(RootMarketsDir) ? 'selected' : ''}>
          <Typography variant={isMobileOnSize ? 'p' : 'p_lg'}>NFT</Typography>
        </NaviButton>
      </Link>
    </List>
  )
}

const NaviButton = styled(ListItemButton)`
  height: 30px;
  border-radius: 5px;
  padding: 0;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.basis.textRaven};
  &:hover {
    border-radius: 5px;
    background-color: rgba(196, 181, 253, 0.1);
  }
  &.selected {
    color: ${(props) => props.theme.basis.melrose};
    background: ${(props) => props.theme.basis.raisinBlack};
    // padding: 10px 15px;
    border-radius: 10px;
    transition: all 0.3s ease 0.2s;
  }
`


export const NaviMenu = () => {
  return (
    <CommonMenu />
  )
}

export const MobileNaviMenu = () => {
  return (
    <Fade in timeout={1500}>
      <Box display='flex' height='38px' mx='7px' justifyContent='center' bgcolor="#000" borderRadius='20px' border='solid 1px #343441' mb='10px'>
        <CommonMenu />
      </Box>
    </Fade>
  )
}

const StyledListItemButton = styled(ListItemButton)`
  height: 54px;
  color: ${(props) => props.theme.basis.textRaven};
  &:hover {
    border-radius: 5px;
    background-color: rgba(196, 181, 253, 0.1);
  }
  &.selected {
    color: ${(props) => props.theme.basis.melrose};
    background: #000;
    border-bottom: 1px solid ${(props) => props.theme.basis.melrose};
    transition: all 0.3s ease 0.2s;
  }
  @media screen and (max-width: 768px) {
    height: 36px;
  }
`

export const SubNaviMenu = () => {
  const pathname = usePathname()
  const isMobileOnSize = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  return (
    <List component="nav" sx={{
      display: 'flex', justifyContent: 'center', padding: 0, height: { xs: '36px', sm: '54px' }, background: '#0f0e14', borderBottom: '1px solid #201c27'
    }}>
      {pathname?.startsWith(RootMarketsDir) &&
        <Stack direction='row' alignItems='center' justifyContent='center'>
          <Link href={RouteDir.TRADE_LIST}>
            <StyledListItemButton className={pathname === RouteDir.TRADE_LIST || pathname?.startsWith(RouteDir.TRADE) ? 'selected' : ''}>
              {!isMobileOnSize && <>
                {pathname === RouteDir.TRADE_LIST || pathname?.startsWith(RouteDir.TRADE) ? <Image src={SwapIconOn} alt='swap' /> : <Image src={SwapIconOff} alt='swap' />}
              </>}
              <Typography variant='p_lg' ml='2px'>Marketplace</Typography>
            </StyledListItemButton>
          </Link>
          <Link href={RouteDir.PORTFOLIO}>
            <StyledListItemButton className={pathname?.startsWith(RouteDir.PORTFOLIO) ? 'selected' : ''}>
              {!isMobileOnSize && <>
                {pathname?.startsWith(RouteDir.PORTFOLIO) ? <Image src={PortfolioIconOn} alt='portfolio' /> : <Image src={PortfolioIconOff} alt='portfolio' />}
              </>}
              <Typography variant='p_lg' ml='2px'>Portfolio</Typography>
            </StyledListItemButton>
          </Link>
          <Link href={RouteDir.MINT}>
            <StyledListItemButton className={pathname?.startsWith(RouteDir.MINT) ? 'selected' : ''}>
              {!isMobileOnSize && <>
                {pathname?.startsWith(RouteDir.MINT) ? <Image src={WrapperIconOn} alt='mint' /> : <Image src={WrapperIconOff} alt='mint' />}
              </>}
              <Typography variant='p_lg' ml='2px'>Mint</Typography>
            </StyledListItemButton>
          </Link>
        </Stack>
      }
    </List >
  )
}


