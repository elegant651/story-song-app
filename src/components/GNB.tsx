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
import { useAccount } from 'wagmi'
import { ConnectButton } from "@rainbow-me/rainbowkit";

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
					<ConnectButton />
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
