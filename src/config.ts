interface INetwork {
  rpcEndpoint: string
  id: 'devnet' | 'mainnet' | 'localnet' | 'testnet'
  label: 'Devnet' | 'Mainnet' | 'Localnet' | 'Testnet'
}

export const networks: INetwork[] = [
  {
    id: 'devnet',
    rpcEndpoint: 'https://api.devnet.solana.com',
    label: 'Devnet',
  },
  {
    id: 'mainnet',
    rpcEndpoint: 'https://api.solana.com',
    label: 'Mainnet',
  },
]

const dev = {
  solanaRpcEndpoint: 'https://api.devnet.solana.com',
}

export default dev
