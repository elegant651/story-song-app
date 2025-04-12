'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import logoIcon from 'public/images/musesong_icon.png'
import logoMIcon from 'public/images/musesong_icon.png'
import walletIcon from 'public/images/gnb-wallet.svg'
import { Button, Toolbar, Container, Box, AppBar, Typography, Theme, useMediaQuery, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { withCsrOnly } from '~/hocs/CsrOnly'
import { shortenAddress } from '~/utils/address'
import { useWalletDialog } from '~/hooks/useWalletDialog'
import { NaviMenu, SubNaviMenu } from './NaviMenu'
import SettingDialog from './Common/SettingDialog'
import { useWalletClient, useAccount } from 'wagmi'

const GNB: React.FC = () => {
	const isMobileOnSize = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

	return (
		<>
			<NavPlaceholder />
			<StyledAppBar position="static">
				<StyledContainer maxWidth={false}>
					<Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mx: '24px' }}>
						<Stack direction='row' alignItems='center'>

							{/* <a href="/"><Image src={logoIcon} width={110} height={55} alt="clone" /></a> */}
							<a href="/">StorySong</a>
							<div style={{ width: '1px', height: '31px', marginLeft: isMobileOnSize ? '4px' : '23px', marginRight: isMobileOnSize ? '6px' : '23px', backgroundColor: '#201c27' }} />
							<NaviMenu />
						</Stack>
						<Box>
							<RightMenu />
						</Box>
					</Toolbar>
					<SubNaviMenu />
				</StyledContainer>
			</StyledAppBar>
		</>
	)
}

export default withCsrOnly(GNB)

const RightMenu: React.FC = () => {
	const isMobileOnSize = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
	const { isConnected, isConnecting, address } = useAccount();
	const { setOpen } = useWalletDialog()
	const [showWalletSelectPopup, setShowWalletSelectPopup] = useState(false)

	const handleWalletClick = async () => {
		try {
			if (!isConnected) {
				setOpen(true)
				setShowWalletSelectPopup(false)
			} else {
				setShowWalletSelectPopup(!showWalletSelectPopup)
			}
		} catch (error) {
			console.log('Error connecting to the wallet: ', error)
		}
	}

	return (
		<>
			<Box display="flex" alignItems='center'>
				<Box>
					{!isConnected ?
						<ConnectButton
							sx={{ height: { xs: '30px', sm: '34px' } }}
							onClick={handleWalletClick}
						>
							<Typography variant='p_lg'>{isConnecting ? 'Connecting...' : isMobileOnSize ? 'Connect' : 'Connect Wallet'}</Typography>
						</ConnectButton>
						:
						<ConnectedButton sx={{ width: { xs: '90px', sm: '120px' }, height: { xs: '30px', sm: '34px' } }} onClick={handleWalletClick} startIcon={address ? <Image src={walletIcon} alt="wallet" /> : <></>}>
							<Typography variant='p'>{isMobileOnSize ? address!.toString().slice(0, 4) + '...' : shortenAddress(address!.toString(), 10, 4)}</Typography>
						</ConnectedButton>
					}
					{/* <WalletSelectBox show={showWalletSelectPopup} onHide={() => setShowWalletSelectPopup(false)} /> */}
				</Box>
			</Box>
		</>
	)
}
const StyledContainer = styled(Container)`
	padding-left: 0px !important;
	padding-right: 0px !important;
`

const StyledAppBar = styled(AppBar)`
	z-index: 900;
	background-color: #000;
	position: fixed;
	top: 0px;
	left: 0px;
	.MuiContainer-root,
	.MuiTabs-flexContainer {
		${(props) => props.theme.breakpoints.up('md')} {
			height: 80px;
		}
		${(props) => props.theme.breakpoints.down('md')} {
			height: 65px;
		}
	}
	&.mobile-on .MuiContainer-root {
		background-color: #3a3a3a;
		border-radius: 0px 0px 20px 20px;
	}
	&.scrolled:not(.mobile-on) {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20px);
		border-radius: 20px;
	}
`
const NavPlaceholder = styled('div')`
	${(props) => props.theme.breakpoints.up('md')} {
		height: 80px;
	}
	${(props) => props.theme.breakpoints.down('md')} {
		height: 65px;
	}
`
const HeaderButton = styled(Button)`
	min-width: 36px;
	height: 34px;
	padding: 8px;
	background: ${(props) => props.theme.basis.backInBlack};
	color: ${(props) => props.theme.basis.textRaven};
	margin-left: 10px;
	border-radius: 10px;
	&:hover {
  	background-color: rgba(196, 181, 253, 0.1);
	}
`
const ConnectButton = styled(Button)`
	padding: 9px;
	margin-left: 10px;
	color: #c5c7d9;
	width: 142px;
	height: 34px;
	border-radius: 10px;
	border: 1px solid ${(props) => props.theme.basis.melrose};
	&:hover {
		background-color: transparent;
		border-color: ${(props) => props.theme.basis.lightSlateBlue};
  }
`
const ConnectedButton = styled(Button)`
	height: 34px;
	padding: 9px;
	margin-left: 10px;
	color: #fff;
	border-radius: 10px;
	border: solid 1px ${(props) => props.theme.basis.portGore};
  background: ${(props) => props.theme.basis.royalPurple};
	&:hover {
		background: ${(props) => props.theme.basis.royalPurple};
    border: solid 1px ${(props) => props.theme.basis.melrose};
  }
`
