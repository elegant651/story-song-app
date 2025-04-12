
export const shortenAddress = (address: string, limit: number = 10, chars: number = 5) => {
	if (address.length <= limit) return address
	return `${address.slice(0, chars)}...${address.slice(-chars)}`
}
