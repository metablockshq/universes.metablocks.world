import { Program, Provider, utils, web3 } from '@project-serum/anchor'
import { Connection, PublicKey } from '@solana/web3.js'
import { defAtom } from '@thi.ng/atom'
import useSWR from 'swr'

import idl from './meta_blocks.json'
import networkState from './network'

const programId = new PublicKey(idl.metadata.address)

const universeState = defAtom({})

// Utils from pl, need to package these

const META_BLOCKS_ADDRESSES = {
  Universe: new web3.PublicKey(
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

const providerFactory = (wallet) => {
  const opts = {
    preflightCommitment: 'processed',
  }

  const conn = new Connection(
    networkState.deref().selectedNetwork.rpcEndpoint,
    opts.preflightCommitment,
  )
  return new Provider(conn, wallet, opts.preflightCommitment)
}

const metaBlocksProgramFactory = (wallet) => {
  const provider = providerFactory(wallet)
  const program = new Program(idl, programId, provider)
  return program
}

const createUniverse = async (
  wallet,
  name,
  description,
  websiteUrl,
) => {
  const program = metaBlocksProgramFactory(wallet)
  try {
    universeState.swap((current) => ({
      ...current,
      creatingUniverse: true,
      createUniverseError: null,
    }))

    const [universeKey, bump] = await findUniverseAddress(
      wallet.publicKey,
    )

    const tx = await program.rpc.createUniverse(
      bump,
      name,
      description,
      websiteUrl,
      {
        accounts: {
          universe: universeKey,
          payer: wallet.publicKey,
          universeAuthority: wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        },
        signers: [],
      },
    )

    const universeData = await program.account.universe.fetch(
      universeKey,
    )
    universeState.swap((current) => ({
      ...current,
      createdUniverseData: universeData,
    }))
  } catch (error) {
    console.log(error)
    universeState.swap((current) => ({
      ...current,
      createUniverseError: error,
    }))
  } finally {
    universeState.swap((current) => ({
      ...current,
      creatingUniverse: false,
    }))
  }
}

const useUniverses = (network) => {
  return useSWR(network.universeIndexUrl)
}

const useLastCrawledTime = (network) => {
  return useSWR(network.universeLastCrawledUrl)
}

const universeByPublicKey = (universes, publicKey) => {
  return universes.find((u) => u.publicKey === publicKey)
}

export {
  createUniverse,
  useUniverses,
  universeState,
  useLastCrawledTime,
  universeByPublicKey,
}
