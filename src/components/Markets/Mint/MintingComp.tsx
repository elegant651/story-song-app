import { Box, Stack, Button, IconButton, Typography, CircularProgress, FormControl } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import oneWaySwapIcon from 'public/images/oneway-swap.svg'
import { LoadingProgress } from '~/components/Common/Loading'
import withSuspense from '~/hocs/withSuspense'
import { SubmitButton } from '../../Common/CommonButtons'
import AudioVizPlayer from '~/components/Music/AudioVizPlayer'
import { useSnackbar } from 'notistack'
import Link from 'next/link'
import { useWalletClient } from 'wagmi'
import { useStory } from '~/hocs/StoryAppContext'
import { IpMetadata } from '@story-protocol/core-sdk'
import CryptoJS from "crypto-js";
import { Address } from 'viem'
import { uploadJSONToIPFS } from '~/utils/functions/uploadToIpfs'
import { SPG_NFT_CONTRACT_ADDRESS } from '~/abi/constants'

type SunoResponse = {
  id: string
  title: string
  audio_url: string
  video_url: string
  image_url: string
  lyric: string
  tags: string
  gpt_description_prompt: string
  created_at: string
}

const MAX_LENGTH_PROMPT = 120

const MintingComp: React.FC = () => {
  const [generating, setGenerating] = useState(false)
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { data: wallet } = useWalletClient()
  const [audioResult, setAudioResult] = useState<SunoResponse>()
  // const [audioResult2, setAudioResult2] = useState<SunoResponse>()
  const [prompt, setPrompt] = useState('')
  const {
    mintNFT,
    txHash,
    setTxHash,
    setTxLoading,
    setTxName,
    addTransaction,
    client,
  } = useStory();

  //https://audiopipe.suno.ai/?item_id=fc102432-9f06-44a5-841e-773baacec045
  // const prompt = 'A popular heavy metal song about war, sung by a deep-voiced male singer, slowly and melodiously. The lyrics depict the sorrow of people after the war.'

  const initData = () => {
    setPrompt('')
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value)
  }

  const onGenerate = async () => {
    try {
      setGenerating(true)
      const result: any = await fetch("/api/suno", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt
        }),
      }).then((res) => res.json())
        .catch((e) => console.log(e));;

      if (result) {
        console.log('result', result)
        setAudioResult(result.audio_data1)
        // setAudioResult2(result.audio_data2        
      }

    } catch (err) {
      console.error(err)
    } finally {
      setGenerating(false)
    }
  }

  const onConfirmMint = async () => {
    try {
      setLoading(true)
      if (!wallet?.account) {
        throw new Error("Wallet not connected");
      }
      if (!audioResult) {
        throw new Error("No audio result");
      }

      if (!client) return;
      setTxLoading(true);
      setTxName("Uploading data to IPFS...");

      /* IP data */
      const ipData: IpMetadata = client.ipAsset.generateIpMetadata({
        title: audioResult.title,
        description: audioResult.gpt_description_prompt,
        image: audioResult.image_url,
        imageHash: `0x${CryptoJS.SHA256(JSON.stringify(audioResult.image_url)).toString(
          CryptoJS.enc.Hex
        )}`,
        mediaUrl: audioResult.audio_url,
        mediaHash: `0x${CryptoJS.SHA256(JSON.stringify(audioResult.audio_url)).toString(
          CryptoJS.enc.Hex
        )}`,
        mediaType: "audio/mpeg",
        creators: [
          {
            name: "Test Creator",
            contributionPercent: 100,
            address: wallet?.account.address as Address,
          },
        ],
      });

      // Set up NFT Metadata
      const nftMetadata = {
        name: audioResult.title,
        description: audioResult.gpt_description_prompt,
        image: audioResult.image_url,
        animation_url: audioResult.audio_url,
        attributes: [
          {
            key: 'Suno Artist',
            value: 'trilemma',
          },
          {
            key: 'Song ID',
            value: audioResult.id,
          },
          {
            key: 'Source',
            value: 'Suno.com',
          },
          {
            key: 'Tags',
            value: audioResult.tags,
          }
        ],
      }

      const ipIpfsCid = await uploadJSONToIPFS(ipData);
      const ipMetadataHash = CryptoJS.SHA256(JSON.stringify(ipData)).toString(
        CryptoJS.enc.Hex
      );
      const nftIpfsCid = await uploadJSONToIPFS(nftMetadata)
      const nftMetadataHash = CryptoJS.SHA256(JSON.stringify(nftMetadata)).toString(
        CryptoJS.enc.Hex
      );

      // register IPA
      setTxName("Minting and registering an IP Asset...");
      const response = await client.ipAsset.mintAndRegisterIp({
        spgNftContract: SPG_NFT_CONTRACT_ADDRESS,
        ipMetadata: {
          ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsCid}`, // uri of IP metadata
          ipMetadataHash: `0x${ipMetadataHash}`, // hash of IP metadata
          nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsCid}`, // uri of NFT metadata
          nftMetadataHash: `0x${nftMetadataHash}`, // hash of NFT metadata
        },
        txOptions: { waitForTransaction: true },
      });
      console.log(
        `Root IPA created at tx hash ${response.txHash}, IPA ID: ${response.ipId}`
      );
      setTxLoading(false);
      setTxHash(response.txHash as string);
      addTransaction(response.txHash as string, "Register IPA", {
        ipId: response.ipId,
      });
      enqueueSnackbar(`Minted NFT`)
      initData()

    } catch (err) {
      console.error(err)
      enqueueSnackbar(`Rejected`)
    } finally {
      setLoading(false)
    }
  }

  // TODO: This is Ippy on Aeneid. The license terms specify 1 $WIP mint fee
  // and a 5% commercial rev share. You can change these.
  const PARENT_IP_ID: Address = '0x641E638e8FCA4d4844F509630B34c9D524d40BE5'
  const PARENT_LICENSE_TERMS_ID: string = '96'

  const onConfirmMintDerivative = async () => {
    try {
      setLoading(true)
      if (!wallet?.account) {
        throw new Error("Wallet not connected");
      }
      if (!audioResult) {
        throw new Error("No audio result");
      }

      if (!client) return;
      setTxLoading(true);
      setTxName("Uploading data to IPFS...");

      /* IP data */
      const ipData: IpMetadata = client.ipAsset.generateIpMetadata({
        title: audioResult.title,
        description: audioResult.gpt_description_prompt,
        image: audioResult.image_url,
        imageHash: `0x${CryptoJS.SHA256(JSON.stringify(audioResult.image_url)).toString(
          CryptoJS.enc.Hex
        )}`,
        mediaUrl: audioResult.audio_url,
        mediaHash: `0x${CryptoJS.SHA256(JSON.stringify(audioResult.audio_url)).toString(
          CryptoJS.enc.Hex
        )}`,
        mediaType: "audio/mpeg",
        creators: [
          {
            name: "Test Creator",
            contributionPercent: 100,
            address: wallet?.account.address as Address,
          },
        ],
      });

      // Set up NFT Metadata
      const nftMetadata = {
        name: audioResult.title,
        description: audioResult.gpt_description_prompt,
        image: audioResult.image_url,
        animation_url: audioResult.audio_url,
        attributes: [
          {
            key: 'Suno Artist',
            value: 'trilemma',
          },
          {
            key: 'Song ID',
            value: audioResult.id,
          },
          {
            key: 'Source',
            value: 'Suno.com',
          },
          {
            key: 'Tags',
            value: audioResult.tags,
          }
        ],
      }

      const ipIpfsCid = await uploadJSONToIPFS(ipData);
      const ipMetadataHash = CryptoJS.SHA256(JSON.stringify(ipData)).toString(
        CryptoJS.enc.Hex
      );
      const nftIpfsCid = await uploadJSONToIPFS(nftMetadata)
      const nftMetadataHash = CryptoJS.SHA256(JSON.stringify(nftMetadata)).toString(
        CryptoJS.enc.Hex
      );

      // register IPA
      setTxName("Minting and registering an IP Asset...");
      const response = await client.ipAsset.mintAndRegisterIpAndMakeDerivative({
        spgNftContract: SPG_NFT_CONTRACT_ADDRESS,
        derivData: {
          parentIpIds: [PARENT_IP_ID],
          licenseTermsIds: [PARENT_LICENSE_TERMS_ID],
        },
        // NOTE: The below metadata is not configured properly. It is just to make things simple.
        // See `simpleMintAndRegister.ts` for a proper example.
        ipMetadata: {
          ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsCid}`, // uri of IP metadata
          ipMetadataHash: `0x${ipMetadataHash}`, // hash of IP metadata
          nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsCid}`, // uri of NFT metadata
          nftMetadataHash: `0x${nftMetadataHash}`, // hash of NFT metadata
        },
        txOptions: { waitForTransaction: true },
      })
      console.log('Derivative IPA created and linked:', {
        'Transaction Hash': response.txHash,
        'IPA ID': response.ipId,
      })
      setTxLoading(false);
      setTxHash(response.txHash as string);
      addTransaction(response.txHash as string, "Register IPA", {
        ipId: response.ipId,
      });
      enqueueSnackbar(`Minted NFT`)
      initData()

    } catch (err) {
      console.error(err)
      enqueueSnackbar(`Rejected`)
    } finally {
      setLoading(false)
    }
  }


  const isValid = prompt !== '' && prompt.length < MAX_LENGTH_PROMPT

  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <Box sx={{ paddingBottom: { xs: '150px', md: '18px' } }}>
          <Box>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <Stack direction="row" justifyContent="space-between">
                <Box><Typography variant='p_lg' color='#8988a3'>Song Prompt</Typography></Box>
              </Stack>
              <FormStack direction="row" justifyContent="space-between" alignItems="center" mt='10px'>
                <Box display='flex' flexDirection='column' alignItems='flex-start' pl='5px'>
                  <InputPrompt id="ip-prompt" placeholder="A popular heavy metal song about aptos" maxLength={MAX_LENGTH_PROMPT} onChange={onChange} />
                </Box>
              </FormStack>
            </FormControl>
          </Box>

          <Box height='100%'>
            <Image src={oneWaySwapIcon} alt="swap" />

            {/* <Box><Typography variant='p'>(Noted) for test version, import music already prepared.</Typography></Box> */}
            <Box>
              <SubmitButton onClick={onGenerate} sx={loading ? { border: '1px solid #c4b5fd' } : {}} disabled={loading || !isValid || audioResult}>
                {!generating ?
                  <Typography variant='p_xlg'>Generate Song</Typography>
                  :
                  <Stack direction='row' alignItems='center' gap={2}>
                    <CircularProgress sx={{ color: '#c4b5fd' }} size={15} thickness={4} />
                    <Typography variant='p_xlg' color='#000'>Generating...</Typography>
                  </Stack>}
              </SubmitButton>
            </Box>

            <Box my='15px'>
              {audioResult && <>
                {/* <Typography variant='p_xlg' color='#fff'>{JSON.stringify(audioResult)}</Typography> */}
                <Box>{audioResult.title}</Box>
                <Stack direction='row' justifyContent='center' alignItems='center' gap={2}>
                  <AudioVizPlayer audioSrc={audioResult.audio_url} />
                  {/* <AudioVizPlayer audioSrc={audioResult2?.audio_url} /> */}
                </Stack>
              </>}
            </Box>

            <Box my='5px'>
              <SubmitButton onClick={onConfirmMintDerivative} disabled={loading || !audioResult || !isValid} sx={loading ? { border: '1px solid #c4b5fd' } : {}}>
                {!loading ?
                  <Typography variant='p_xlg'>Mint</Typography>
                  :
                  <Stack direction='row' alignItems='center' gap={2}>
                    <CircularProgress sx={{ color: '#c4b5fd' }} size={15} thickness={4} />
                    <Typography variant='p_xlg' color='#000'>Minting</Typography>
                  </Stack>}
              </SubmitButton>
              <Link
                href={`https://aeneid.explorer.story.foundation/ipa/${txHash}`}
                rel="noopener noreferrer"
                target="_blank"
              ><Box mt='5px'>{txHash && <Typography variant='p_lg' color='#c4b5fd'>{txHash.slice(0, 10) + '...' + txHash.slice(txHash.length - 10)}</Typography>}</Box></Link>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  )
}

const FormStack = styled(Stack)`
	display: flex;
	width: 100%;
	height: 84px;
	padding: 12px;
	border-radius: 10px;
	color: #fff;
	background-color: ${(props) => props.theme.basis.backInBlack};
	&:hover {
		box-shadow: 0 0 0 1px ${(props) => props.theme.basis.shadowGloom} inset;
	}
`
const InputPrompt = styled(`input`)`
	width: 320px;
	border: 0px;
	background-color: transparent;
	font-size: 16px;
	font-weight: 500;
	color: #fff;
	&::placeholder {
		color: ${(props) => props.theme.basis.slug};
	}
	padding: 0;
`
const DisableButton = styled(Button)`
  width: 100%;
  height: 52px;
	color: #fff;
  border-radius: 10px;
	margin-top: 10px;
  &:disabled {
    border: solid 1px ${(props) => props.theme.basis.plumFuzz};
    background-color: ${(props) => props.theme.basis.backInBlack};
    color: ${(props) => props.theme.basis.textRaven};
  } 
`

export default withSuspense(MintingComp, <Box mt='20px'><LoadingProgress /></Box>)
