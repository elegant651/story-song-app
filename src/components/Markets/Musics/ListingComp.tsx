import { Box, Stack, Button, IconButton, Typography, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useState, useEffect } from 'react'
import PairInput from './PairInput'
import { useForm, Controller } from 'react-hook-form'
import { getAptBalance } from "~/contract/contracts";
import { ON_USD } from '~/utils/constants'
import { LoadingSkeleton } from '~/components/Common/Loading'
import withSuspense from '~/hocs/withSuspense'
import { enqueueSnackbar, useSnackbar } from 'notistack'
import { ABI } from '~/contract/abi_marketplace'
import Link from 'next/link'
import { useWalletClient, useAccount } from 'wagmi'
import { BuyBtn } from './BuyComp'
import { useStory } from '~/hocs/StoryAppContext'
import { Address } from 'viem'
import { WIP_TOKEN_ADDRESS } from '@story-protocol/core-sdk'

interface Props {
  nftAddress: string
}

const ListingComp: React.FC<Props> = ({ nftAddress }) => {
  const [loading, setLoading] = useState(false)
  const { data: wallet } = useWalletClient()
  const { isConnected } = useAccount()
  const snackbar = useSnackbar()
  const [openOrderDetails, setOpenOrderDetails] = useState(false)
  const [myBalance, setMyBalance] = useState(0)
  const [txHash, setTxHash] = useState('')
  const { client } = useStory()
  const dollarPrice = 8.1
  // const { data: myBalance, refetch } = useMyBalanceQuery({
  //   userPubKey: account,
  //   index: assetIndex,
  //   refetchOnMount: 'always',
  //   enabled: account != null
  // })

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

  const [amountOnusd] = watch([
    'amountOnusd'
  ])

  const initData = async () => {
    setValue('amountOnusd', NaN)

    if (wallet?.account) {
      const balance = await getAptBalance(wallet?.account?.address)
      setMyBalance(balance)
    }
  }

  useEffect(() => {
    setOpenOrderDetails(false)
    initData()
    trigger()
  }, [wallet?.account])

  const onConfirm = async () => {
    try {
      setLoading(true)

      // console.log('nftAddress', nftAddress)
      // await onListing(nftAddress, amountOnusd)
      // await listNFT(account, nftAddress, amountOnusd)

      // if (data.result) {
      //   console.log('data', data)
      //   initData()
      // }
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const onClaim = async () => {
    if (!client) return;
    if (!wallet?.account) {
      throw new Error("Wallet not connected");
    }

    try {
      setLoading(true)

      const childIpId = '0xB25609EE9A622F148A7A5e0d2a66a799C5329e41'
      const childClaimRevenue = await client.royalty.claimAllRevenue({
        ancestorIpId: childIpId as Address,
        claimer: childIpId as Address,
        childIpIds: [],
        royaltyPolicies: [],
        currencyTokens: [WIP_TOKEN_ADDRESS],
      })
      console.log('Child claimed revenue:', childClaimRevenue.claimedTokens)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const onClaimParent = async () => {
    if (!client) return;
    if (!wallet?.account) {
      throw new Error("Wallet not connected");
    }

    try {
      setLoading(true)

      const RoyaltyPolicyLAP: Address = '0xBe54FB168b3c982b7AaE60dB6CF75Bd8447b390E'
      const parentIpId = '0x55e733c020A74bF7e2544DDCa5475c3d2c844EE7'
      const childIpId = '0xB25609EE9A622F148A7A5e0d2a66a799C5329e41'
      const childClaimRevenue = await client.royalty.claimAllRevenue({
        ancestorIpId: parentIpId as Address,
        claimer: parentIpId as Address,
        childIpIds: [childIpId as Address],
        royaltyPolicies: [RoyaltyPolicyLAP],
        currencyTokens: [WIP_TOKEN_ADDRESS],
      })
      console.log('Parent claimed revenue receipt::', childClaimRevenue.claimedTokens)
      setLoading(false)
      enqueueSnackbar('Parent claimed revenue receipt', { variant: 'success' })
    } catch (err) {
      console.error(err)
      setLoading(false)
      enqueueSnackbar('Failed to claim parent revenue', { variant: 'error' })
    }
  }

  const invalidMsg = () => {
    if (amountOnusd == 0 || isNaN(amountOnusd) || !amountOnusd) {
      return 'Enter Amount'
    }
    // else if (amountOnusd > myBalance) {
    //   return `Insufficient ${ON_USD}`
    // } 
    else {
      return ''
    }
  }

  const isValid = invalidMsg() === ''

  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <Box px='24px' height='100%' sx={{ paddingBottom: '18px', background: '#0a080f', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
          {/* <Box>
            <Box>
              <Controller
                name="amountOnusd"
                control={control}
                rules={{
                  validate(value) {
                    if (!value || isNaN(value) || value <= 0) {
                      return 'the amount should not empty'
                    }
                    // else if (value > myBalance) {
                    //   return 'The amount cannot exceed the balance.'
                    // }
                  }
                }}
                render={({ field }) => (
                  <PairInput
                    title="For Listing"
                    tickerIcon={'/images/assets/on-apt.svg'}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const usdiAmt = parseFloat(event.currentTarget.value)
                      field.onChange(usdiAmt)
                    }}
                    value={field.value}
                    dollarValue={field.value * dollarPrice}
                    balance={myBalance}
                    balanceDisabled={!isConnected}
                    max={myBalance}
                  />
                )}
              />
            </Box>
          </Box> */}

          <Box height='100%'>

            {/* <Box mt='15px' mb='5px'>
              {isValid ? <ActionButton onClick={handleSubmit(onConfirm)} disabled={loading} sx={loading ? { border: '1px solid #c4b5fd' } : {}}>
                {!loading ?
                  <Typography variant='p_xlg'>Listing</Typography>
                  :
                  <Stack direction='row' alignItems='center' gap={2}>
                    <CircularProgress sx={{ color: '#c4b5fd' }} size={15} thickness={4} />
                    <Typography variant='p_xlg' color='#fff'>Progressing</Typography>
                  </Stack>}
              </ActionButton> :
                <DisableButton disabled={true}>
                  <Typography variant='p_xlg'>{invalidMsg()}</Typography>
                </DisableButton>
              }
            </Box> */}
            <BuyBtn onClick={() => onClaimParent()} disabled={!wallet?.account.address}>
              {!loading ?
                <Typography variant='p_xlg'>Claim Revenue</Typography>
                :
                <Stack direction='row' alignItems='center' gap={2}>
                  <CircularProgress sx={{ color: '#c4b5fd' }} size={15} thickness={4} />
                  <Typography variant='p_xlg' color='#fff'>Progressing</Typography>
                </Stack>}
            </BuyBtn>

            <Link
              href={`https://aeneid.storyscan.xyz/tx/${txHash}`}
              rel="noopener noreferrer"
              target="_blank"
            ><Box mt='5px'>{txHash && <Typography variant='p_lg' color='#c4b5fd'>{txHash.slice(0, 10) + '...' + txHash.slice(-10)}</Typography>}</Box></Link>
          </Box>
        </Box>
      </div>
    </>
  )
}

const ActionButton = styled(Button)`
	width: 100%;
  height: 52px;
	color: #000;
	margin-bottom: 10px;
  border-radius: 10px;
  background: ${(props) => props.theme.basis.melrose};
  &:hover {
    background: ${(props) => props.theme.basis.lightSlateBlue};
  }
  &:disabled {
    opacity: 0.4;
  } 
`
const DisableButton = styled(Button)`
  width: 100%;
  height: 52px;
	color: #fff;
  border-radius: 10px;
	margin-bottom: 10px;
  &:disabled {
    border: solid 1px ${(props) => props.theme.basis.portGore};
    background: transparent;
    color: ${(props) => props.theme.basis.textRaven};
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
const ArrowIcon = styled('div')`
  width: 9px;
  height: 6px;
  margin-top: -20px;
  font-weight: 500;
  color: #c5c7d9;
`

export default withSuspense(ListingComp, <LoadingSkeleton />)
