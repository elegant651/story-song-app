import { Box, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import MintingComp from '~/components/Markets/Mint/MintingComp'
import dynamic from 'next/dynamic'
import { StyledTabs, StyledTab } from "~/components/Common/StyledTab"
import ViewNFTComp from '~/components/Markets/Mint/ViewNFTComp'

const MintingBox: React.FC = () => {
	const [tab, setTab] = useState(0)

	const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
		setTab(newValue)
	}

	return (
		<StyledPaper>
			<Box sx={{ backgroundColor: '#1a1c28', borderRadius: '10px', marginBottom: '20px' }}>
				<StyledTabs value={tab} onChange={handleChangeTab}>
					<StyledTab value={0} label="Mint" width='180px' allBorderRadius={true} />
					<StyledTab value={1} label="Generated NFT" width='180px' allBorderRadius={true} />
				</StyledTabs>
			</Box>

			{tab === 0 && <MintingComp />}
			{tab === 1 && <ViewNFTComp />}
		</StyledPaper>
	)
}

const StyledPaper = styled(Paper)`
  position: relative;
	width: 402px;
	background: transparent;
	text-align: center;
	border: 1px solid #414e66;
	border-radius: 10px;
	padding: 20px;
`
const Divider = styled(Box)`
	width: 100%;
	height: 1px;
	background: #414e66;
	margin-top: 22px;
	margin-bottom: 22px;
`

export default MintingBox
