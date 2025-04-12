import { LoadingSkeleton } from "~/components/Common/Loading"
import withSuspense from "~/hocs/withSuspense"
import { styled } from '@mui/material/styles'
import { Box, Button, Typography } from "@mui/material"
import { APT, aptos, getAptBalance } from '~/aptos/contracts'
import { useEffect, useState } from "react"
import { ABI } from "~/aptos/abi_marketplace"
import { useSnackbar } from "notistack"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RootMarketsDir } from "~/utils/constants"
import { useWalletClient } from "wagmi"


interface Props {
  nftAddress: string
  listingAddress: string
}

const BuyComp: React.FC<Props> = ({ nftAddress, listingAddress }) => {
  const { data: wallet } = useWalletClient();
  const { enqueueSnackbar } = useSnackbar()
  const [myBalance, setMyBalance] = useState(0)
  const [txHash, setTxHash] = useState('')
  const router = useRouter()

  const initData = async () => {
    if (wallet?.account) {
      const balance = await getAptBalance(wallet?.account?.address)
      setMyBalance(balance)
    }
  }

  useEffect(() => {
    initData()
  }, [wallet?.account])

  const onBuy = async (listing_object_address: string) => {
    console.log(listing_object_address)
    // await buyNFT(account, listing_object_address)
    if (!wallet?.account) {
      throw new Error("Wallet not connected");
    }
    // const response = await signAndSubmitTransaction({
    //   sender: wallet?.account?.address,
    //   data: {
    //     function: `${ABI.address}::marketplace::purchase`,
    //     typeArguments: [APT],
    //     functionArguments: [listing_object_address],
    //   },
    // });
    // await aptos
    //   .waitForTransaction({
    //     transactionHash: response.hash,
    //   })
    //   .then(() => {
    //     console.log("Bought");
    //   });

    enqueueSnackbar('Congratulations! Bought this NFT')
    // setTxHash(response.hash)

    setTimeout(() => {
      router.replace(`${RootMarketsDir}/clportfolio`)
    }, 1000)
  }

  return (
    <>
      <TitleOrderDetails>
        <Box display='flex' alignItems='center'>
          <Typography variant='p' color='#C4B5FD'>1 APT ≈ $8.1</Typography>
        </Box>
        <Box display='flex' alignItems='center' mr='5px'>
          <Typography variant='p' color='#c5c7d9'>My Balance : </Typography>
          <Typography variant='p' color='#fff'>{myBalance.toLocaleString()} APT</Typography>
        </Box>
      </TitleOrderDetails>
      <BuyBtn onClick={() => onBuy(listingAddress)} disabled={!wallet?.account.address}>Buy</BuyBtn>
      <Link
        href={`https://explorer.aptoslabs.com/txn/${txHash}?network=testnet`}
        rel="noopener noreferrer"
        target="_blank"
      ><Box mt='5px'>{txHash && <Typography variant='p_lg' color='#c4b5fd'>{txHash.slice(0, 10) + '...' + txHash.slice(txHash.length - 10)}</Typography>}</Box></Link>
    </>
  )
}

const BuyBtn = styled(Button)`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  margin-top: 7px;
  margin-bottom: 7px;
  background-color: ${(props) => props.theme.basis.melrose};
  &:hover {
    background-color: ${(props) => props.theme.basis.melrose};
  }
`
const TitleOrderDetails = styled(Box)`
  cursor: pointer; 
  display: flex;
  justify-content: space-between;
  padding: 5px;
  align-items: center;
  margin-bottom: 10px;
`

export default withSuspense(BuyComp, <LoadingSkeleton />)