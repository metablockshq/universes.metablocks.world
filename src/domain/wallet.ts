import { defAtom } from '@thi.ng/atom'
import { PublicKey, Connection } from '@solana/web3.js'
import { utils, Program, Provider, web3 } from '@project-serum/anchor'

import config from '../config.ts'
import idl from './meta_blocks.json'

const programId = new PublicKey(idl.metadata.address)

const walletState = defAtom({})

// Utils from pl, need to package these

const META_BLOCKS_ADDRESSES = {
  Universe: new web3.PublicKey('EizZV5DZRxwUwfqtRj8hFgx5eayxA6VDMXyWtkNDmKM9')
}

const findUniverseAddress = async (
  universeAuthority: PublicKey,
  programID: PublicKey = META_BLOCKS_ADDRESSES.Universe
): Promise<[PublicKey, number]> => {
  return await PublicKey.findProgramAddress(
    [
      Buffer.from(utils.bytes.utf8.encode('Universe')),
      universeAuthority.toBytes()
    ],
    programID
  )
}

const providerFactory = (wallet) => {
  const opts = {
    preflightCommitment: 'processed'
  }

  const conn = new Connection(
    config.solanaRpcEndpoint,
    opts.preflightCommitment
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
  name: string,
  description: string,
  websiteUrl: string
) => {
  const program = metaBlocksProgramFactory(wallet)
  try {
    walletState.swap((current) => ({
      ...current,
      creatingUniverse: true,
      createUniverseError: null
    }))

    const [universeKey, bump] = await findUniverseAddress(
      wallet.publicKey,
      programId
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
          systemProgram: web3.SystemProgram.programId
        },
        signers: []
      }
    )
    await tx.confirm()
    const universeData = await program.account.universe.fetch(universeKey)
    walletState.swap((current) => ({
      ...current,
      createdUniverseData: universeData
    }))
  } catch (error) {
    console.log(error)
    walletState.swap((current) => ({
      ...current,
      createUniverseError: error
    }))
  } finally {
    walletState.swap((current) => ({
      ...current,
      creatingUniverse: false
    }))
  }
}

export { createUniverse, walletState }
