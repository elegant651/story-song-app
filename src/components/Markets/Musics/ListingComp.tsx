import { Box, Stack, Button, IconButton, Typography, CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useState, useEffect } from 'react'
import PairInput from './PairInput'
import { useForm, Controller } from 'react-hook-form
import { APT, APT_UNIT, aptos, getAptBalance } from "~/aptos/contracts";
import { ON_USD } from '~/utils/constants'
import { LoadingSkeleton } from '~/components/Common/Loading'
import withSuspense from '~/hocs/withSuspense'
import { useSnackbar } from 'notistack'
import { ABI } from '~/aptos/abi_marketplace'
import Link from 'next/link'
import { useWalletClient } from 'wagmi'


interface Props {
  nftAddress: string
}

const ListingComp: React.FC<Props> = ({ nftAddress }) => {
  const [loading, setLoading] = useState(false)
  const { data: wallet } = useWalletClient()
  const snackbar = useSnackbar()
  const [openOrderDetails, setOpenOrderDetails] = useState(false)
  const [myBalance, setMyBalance] = useState(0)
  const [txHash, setTxHash] = useState('')
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

  const onListing = async (nftTokenObjectAddr: string, price: number) => {
    if (!wallet?.account) {
      throw new Error("Wallet not connected");
    }
    if (!price) {
      throw new Error("Price not set");
    }
    // const response = await signAndSubmitTransaction({
    //   sender: wallet?.account?.address,
    //   data: {
    //     function: `${ABI.address}::marketplace::list_with_fixed_price`,
    //     typeArguments: [APT],
    //     functionArguments: [nftTokenObjectAddr, price * APT_UNIT],
    //   },
    // });
    // await aptos
    //   .waitForTransaction({
    //     transactionHash: response.hash,
    //   })
    //   .then(() => {
    //     console.log("Listed");
    //     setLoading(false)
    //   });

    // setTxHash(response.hash)
    snackbar.enqueueSnackbar('Listed')
  };

  const onConfirm = async () => {
    try {
      setLoading(true)

      // console.log('nftAddress', nftAddress)
      await onListing(nftAddress, amountOnusd)
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
                    balanceDisabled={!connected}
                    max={myBalance}
                  />
                )}
              />
            </Box>
          </Box>

          <Box height='100%'>

            <Box mt='15px' mb='5px'>
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
            </Box>

            <TitleOrderDetails onClick={() => setOpenOrderDetails(!openOrderDetails)} style={openOrderDetails ? { color: '#fff' } : { color: '#868686' }}>
              <Box display='flex' alignItems='center'>
                <Typography variant='p' color='#C4B5FD'>1 APT ≈ ${dollarPrice} {ON_USD}</Typography>
              </Box>
              {/* <Box display='flex' alignItems='center' mr='5px'><Typography variant='p' color='#c5c7d9'>Price Detail</Typography> <ArrowIcon>{openOrderDetails ? <KeyboardArrowUpSharpIcon /> : <KeyboardArrowDownSharpIcon />}</ArrowIcon></Box> */}
            </TitleOrderDetails>

            <Link
              href={`https://explorer.aptoslabs.com/txn/${txHash}?network=testnet`}
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
