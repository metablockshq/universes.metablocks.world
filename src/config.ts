export const networks = [
  {
    id: 'devnet',
    rpcEndpoint: 'https://api.devnet.solana.com',
    label: 'Devnet',
    universeIndexUrl:
      'https://universe-index.metablocks.world/universe.devnet.json',
    universeLastCrawledUrl:
      'https://universe-index.metablocks.world/last.crawled.devnet.json',
  },
  {
    id: 'mainnet',
    rpcEndpoint: 'https://api.solana.com',
    label: 'Mainnet',
    universeIndexUrl:
      'https://universe-index.metablocks.world/universe.mainnet.json',
    universeLastCrawledUrl:
      'https://universe-index.metablocks.world/last.crawled.mainnet.json',
  },
]
