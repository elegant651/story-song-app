import { LoadingSkeleton } from "~/components/Common/Loading"
import withSuspense from "~/hocs/withSuspense"
import { styled } from '@mui/material/styles'
import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useSnackbar } from "notistack"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RootMarketsDir } from "~/utils/constants"
import { useWalletClient } from "wagmi"
import { WIP_TOKEN_ADDRESS } from '@story-protocol/core-sdk'
import { Address, parseEther, zeroAddress } from "viem"
import { useStory } from "~/hocs/StoryAppContext"
import { Controller, useForm } from "react-hook-form"
import PairInput from "./PairInput"

interface Props {
  nftAddress: string
  listingAddress: string
}

const BuyComp: React.FC<Props> = ({ nftAddress, listingAddress }) => {
  const { data: wallet } = useWalletClient();
  const { enqueueSnackbar } = useSnackbar()
  const { client } = useStory()
  const [txHash, setTxHash] = useState('')
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    trigger
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      amountOnusd: NaN,
    }
  })

  const onBuy = async (listing_object_address: string) => {
    if (!client) return;
    console.log(listing_object_address)
    // await buyNFT(account, listing_object_address)
    if (!wallet?.account) {
      throw new Error("Wallet not connected");
    }

    const childIpId = '0xB25609EE9A622F148A7A5e0d2a66a799C5329e41'
    const payRoyalty = await client.royalty.payRoyaltyOnBehalf({
      receiverIpId: childIpId as Address,
      payerIpId: zeroAddress,
      token: WIP_TOKEN_ADDRESS,
      amount: parseEther('2'), // 2 $WIP
      txOptions: { waitForTransaction: true },
    })
    console.log('Paid royalty:', {
      'Transaction Hash': payRoyalty.txHash,
    })

    enqueueSnackbar('Paid royalty')
    setTxHash(payRoyalty.txHash!)

    setTimeout(() => {
      router.replace(`${RootMarketsDir}/clportfolio`)
    }, 1000)
  }

  return (
    <>
      <TitleOrderDetails>
        <Box display='flex' alignItems='center'>
          {/* <Typography variant='p' color='#C4B5FD'>2 $WIP</Typography> */}
        </Box>
        {/* <Box display='flex' alignItems='center' mr='5px'>
          <Typography variant='p' color='#c5c7d9'>My Balance : </Typography>
          <Typography variant='p' color='#fff'>{myBalance.toLocaleString()} APT</Typography>
        </Box> */}
      </TitleOrderDetails>
      <Box>
        <Box>
          <Controller
            name="amountOnusd"
            control={control}
            rules={{
              validate(value) {
                if (!value || isNaN(value) || value <= 0) {
                  return 'the amount should not empty'
                }
              }
            }}
            render={({ field }) => (
              <PairInput
                title="For Royalty"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const usdiAmt = parseFloat(event.currentTarget.value)
                  field.onChange(usdiAmt)
                }}
                value={field.value}
              />
            )}
          />
        </Box>
      </Box>
      <BuyBtn onClick={() => onBuy(listingAddress)} disabled={!wallet?.account.address}>Pay Royalty</BuyBtn>
      <Link
        href={`https://aeneid.storyscan.xyz/tx/${txHash}`}
        rel="noopener noreferrer"
        target="_blank"
      ><Box mt='5px'>{txHash && <Typography variant='p_lg' color='#c4b5fd'>{txHash.slice(0, 10) + '...' + txHash.slice(txHash.length - 10)}</Typography>}</Box></Link>
    </>
  )
}

export const BuyBtn = styled(Button)`
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