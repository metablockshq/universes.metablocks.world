import { Connection, PublicKey } from '@solana/web3.js'

import idl from './meta_blocks.json'
import networkState from '../domain/network.js'

const programId = new PublicKey(idl.metadata.address)

// get a solana/web3.js connection object with the network selected in networkState
const getConnection = () => {
  const opts = {
    preflightCommitment: 'processed',
  }

  return new Connection(
    networkState.deref().selectedNetwork.rpcEndpoint,
    opts.preflightCommitment,
  )
}

const getProvider = (wallet) => {
  const conn = getConnection()
  return new Provider(conn, wallet, opts.preflightCommitment)
}

const getMetaBlocksProgram = (wallet) => {
  const provider = getProvider(wallet)
  const program = new Program(idl, programId, provider)
  return program
}

// Utils from pl, need to package these

const META_BLOCKS_ADDRESSES = {
  Universe: new PublicKey(
    '9pNcm4DmZJgHYynuvhSbZ3m4bqBSKeuXqZ2cCZKbcLJc',
  ),
}

const findUniverseAddress = async (universeAuthority) => {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from(utils.bytes.utf8.encode('Universe')),
      universeAuthority.toBytes(),
    ],
    META_BLOCKS_ADDRESSES.Universe,
  )
}

export {
  findUniverseAddress,
  getConnection,
  getProvider,
  getMetaBlocksProgram,
}
