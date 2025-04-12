import { LoadingSkeleton } from "~/components/Common/Loading"
import withSuspense from "~/hocs/withSuspense"
import { styled } from '@mui/material/styles'
import { Box, Button, Typography } from "@mui/material"
import { getMusesong } from '~/contract/contracts'
import { useEffect, useState } from "react"
import { ABI } from "~/contract/abi_marketplace"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RootMarketsDir } from "~/utils/constants"
import { useWalletClient } from "wagmi"


interface Props {
  // nftAddress: string
}

const ViewNFTComp: React.FC<Props> = () => {
  const { data: wallet } = useWalletClient();
  const [assetData, setAssetData] = useState<any>();
  const router = useRouter()

  const moveLink = (address: string) => {
    router.push(`${RootMarketsDir}/trade/${address}?isOwner=true`)
  }

  const initData = async () => {
    if (wallet) {
      const musesong = await getMusesong(wallet.account?.address);
      console.log('songNft', musesong)
      if (musesong) {
        setAssetData({
          id: musesong[0],
          title: musesong[1],
          prompt: musesong[2],
          image_url: musesong[3],
          audio_url: musesong[4],
          tags: musesong[5]
        })
      }
    }
  }

  useEffect(() => {
    initData()
  }, [wallet])


  return (wallet && assetData) ? (
    <>
      <TitleOrderDetails>
        <Box mb='16px'>
          <Box display="inline-flex" alignItems="center">
            <img src={assetData.image_url} width={100} alt={assetData.title} style={{ borderRadius: '10px' }} />
            <Box ml='16px'>
              <Typography variant='h3' fontWeight={500} color='#8988a3'>{assetData.title}</Typography>
            </Box>
          </Box>
        </Box>
      </TitleOrderDetails>
      {/* <BuyBtn onClick={() => moveLink(account.address)}>View NFT</BuyBtn> */}
    </>
  ) : <>No Data</>
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
  display: flex;
  justify-content: space-between;
  padding: 5px;
  align-items: center;
  margin-bottom: 10px;
`

export default withSuspense(ViewNFTComp, <LoadingSkeleton />)