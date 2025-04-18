'use client'
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { aeneid } from "@story-protocol/core-sdk";
import React, { FC, ReactNode, useMemo } from 'react'

const config = getDefaultConfig({
	appName: "Story-Song",
	projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
	chains: [aeneid],
	ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();
const ClientWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>{children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}
export default ClientWalletProvider
