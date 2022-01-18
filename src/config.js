const networks = [
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

// this might need a network specific version
const programIds = {
  // TODO: rename spl to token something
  spl: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  associatedToken: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
  metaBlocks: '9pNcm4DmZJgHYynuvhSbZ3m4bqBSKeuXqZ2cCZKbcLJc',
  metaplex: 'p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98',
}

export { networks, programIds }
