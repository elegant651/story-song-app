import { aeneid, StoryClient, StoryConfig } from '@story-protocol/core-sdk'
import { createPublicClient, createWalletClient, http, WalletClient } from 'viem'
import { privateKeyToAccount, Address, Account } from 'viem/accounts'
import dotenv from 'dotenv'

dotenv.config()

// Network configuration types
type NetworkType = 'aeneid' | 'mainnet'

interface NetworkConfig {
    rpcProviderUrl: string
    protocolExplorer: string
    defaultNFTContractAddress: Address | null
    defaultSPGNFTContractAddress: Address | null
}

// Network configurations
const networkConfigs: Record<NetworkType, NetworkConfig> = {
    aeneid: {
        rpcProviderUrl: 'https://aeneid.storyrpc.io',
        protocolExplorer: 'https://aeneid.explorer.story.foundation',
        defaultNFTContractAddress: '0x937bef10ba6fb941ed84b8d249abc76031429a9a' as Address,
        defaultSPGNFTContractAddress: '0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc' as Address,
    },
    mainnet: {
        rpcProviderUrl: 'https://mainnet.storyrpc.io',
        protocolExplorer: 'https://explorer.story.foundation',
        defaultNFTContractAddress: null,
        defaultSPGNFTContractAddress: null,
    },
} as const

// Helper functions
const validateEnvironmentVars = () => {
    if (!process.env.WALLET_PRIVATE_KEY) {
        throw new Error('WALLET_PRIVATE_KEY is required in .env file')
    }
}

const getNetwork = (): NetworkType => {
    const network = process.env.STORY_NETWORK as NetworkType
    if (network && !(network in networkConfigs)) {
        throw new Error(`Invalid network: ${network}. Must be one of: ${Object.keys(networkConfigs).join(', ')}`)
    }
    return network || 'aeneid'
}

// Initialize client configuration
export const network = getNetwork()
validateEnvironmentVars()

export const networkInfo = {
    ...networkConfigs[network],
    rpcProviderUrl: process.env.RPC_PROVIDER_URL || networkConfigs[network].rpcProviderUrl,
}

export const account: Account = privateKeyToAccount(`0x${process.env.WALLET_PRIVATE_KEY}` as Address)

const config: StoryConfig = {
    account,
    transport: http(networkInfo.rpcProviderUrl),
    chainId: network,
}

export const client = StoryClient.newClient(config)

// Export additional useful constants
export const PROTOCOL_EXPLORER = networkInfo.protocolExplorer

const baseConfig = {
    chain: aeneid,
    transport: http(networkInfo.rpcProviderUrl),
} as const
export const publicClient = createPublicClient(baseConfig)
export const walletClient = createWalletClient({
    ...baseConfig,
    account,
}) as WalletClient
