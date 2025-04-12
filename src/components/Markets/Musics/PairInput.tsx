import React from 'react';
import { FormControl, Stack, Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import { formatLocaleAmount } from '~/utils/numbers';

interface Props {
	title: string | null
	tickerIcon: string
	balance?: number
	balanceDisabled?: boolean
	value?: number
	dollarValue?: number
	valueDisabled?: boolean
	max?: number
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const PairInput: React.FC<Props> = ({ title, tickerIcon, balance, balanceDisabled, value, dollarValue, valueDisabled = false, onChange, max }) => {
	return (
		<FormControl variant="standard" sx={{ width: '100%' }}>
			<Stack direction="row" justifyContent="space-between">
				<Box><Typography variant='p_lg' color='#8988a3'>{title}</Typography></Box>
			</Stack>
			<FormStack direction="row" justifyContent="space-between" alignItems="center">
				<Box display='flex' flexDirection='column' alignItems='flex-start' pl='5px' sx={valueDisabled ? { cursor: 'not-allowed' } : { cursor: 'default' }}>
					<InputAmount id="ip-amount" type="number" sx={value && value > 0 ? { color: '#fff' } : { color: '#8988a3' }} placeholder="0.00" min={0} max={max} value={value} disabled={valueDisabled} onChange={onChange} />
				</Box>
				<TickerBox>
					{tickerIcon && <Image src={tickerIcon} width={22} height={22} alt={''} />}
					<Box mx='4px' display='flex' alignItems='center'>
						<Typography variant='h4' color='#fff'>WIP</Typography>
					</Box>
				</TickerBox>
			</FormStack>
		</FormControl>
	)
}

const FormStack = styled(Stack)`
	display: flex;
	width: 100%;
	height: 84px;
	padding: 12px;
	border-radius: 10px;
	color: ${(props) => props.theme.basis.textRaven};
	background-color: ${(props) => props.theme.basis.backInBlack};
	&:hover {
		box-shadow: 0 0 0 1px ${(props) => props.theme.basis.portGore} inset;
	}
`
const TickerBox = styled(Box)`
	display: flex;
	align-items: center;
	padding: 3px 10px 3px 5px;
	color: #fff;
`
const InputAmount = styled(`input`)`
	width: 150px;
	border: 0px;
	background-color: transparent;
	font-size: 26px;
	font-weight: 500;
	color: #757a7f;
	padding: 0;
	&::placeholder {
		color: #8988a3;
	}
`

export default PairInput
