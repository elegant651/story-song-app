import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { LoadingSkeleton } from '~/components/Common/Loading'
import OnAssetList from './OnAssetList'
import withSuspense from '~/hocs/withSuspense'
import { useGetMuseNftsByOwner } from '~/hooks/music/useGetMuseNftsByOwner'
import { useGetListedMuseNftsBySeller } from '~/hooks/music/useGetListedMuseNftsBySeller'
import { useGetNftsByOwner } from '~/hooks/useGetNftsByOwner'
import { useGetListedNftsBySeller } from '~/hooks/useGetListedNftsBySeller'
import { useAccount, useWalletClient } from 'wagmi'

interface ResultAsset {
	id: number
	name: string
	val: number
}

const PortfolioView = () => {
	const { data: wallet } = useWalletClient()
	// const [dataPie, setDataPie] = useState<PieItem[]>([])

	const nftsInWallet = useGetMuseNftsByOwner(wallet?.account?.address);
	// const nftsInWallet = useGetNftsByOwner(wallet?.account?.address);
	const nftsListed = useGetListedMuseNftsBySeller(wallet?.account?.address);
	// const nftsListed = useGetListedNftsBySeller(wallet?.account?.address);

	return (
		<div>
			<Box display='flex' justifyContent='center'>
				{/* {balance ? <BalanceView data={dataPie} /> : <></>} */}
			</Box>
			<Box py='30px'>
				<Box>
					<OnAssetList assets={nftsInWallet} isListed={false} title='My Owned NFTs' />
				</Box>
				{/* <Box my='30px'>
					<OnAssetList assets={nftsListed} isListed={true} title='My Listed NFTs' />
				</Box> */}
			</Box>
		</div>
	)
}

export default withSuspense(PortfolioView, <LoadingSkeleton />)
