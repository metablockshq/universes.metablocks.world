import { Program, Provider, utils, web3 } from '@project-serum/anchor'
import { Connection, PublicKey } from '@solana/web3.js'
import { defAtom } from '@thi.ng/atom'
import useSWR from 'swr'

import {
  findUniverseAddress,
  getMetaBlocksProgram,
} from '../utils/solana'

import networkState from './network'

const universeState = defAtom({})

const createUniverse = async (
  wallet,
  name,
  description,
  websiteUrl,
) => {
  const program = getMetaBlocksProgram(wallet)
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
