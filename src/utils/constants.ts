import { IS_DEV } from "~/data/networks"

export const RootMarketsDir = "/markets"

export const RouteDir = {
	TRADE_LIST: `${RootMarketsDir}`,
	TRADE: `${RootMarketsDir}/trade`,
	MINT: `${RootMarketsDir}/mint`,
	PORTFOLIO: `${RootMarketsDir}/clportfolio`,
}

export const NETWORK_NAME = IS_DEV ? "Devnet" : ""

export const ON_USD = IS_DEV ? "devUSD" : "USDC"

export const ON_USD_NAME = IS_DEV ? "Devnet USD" : "USDC"
