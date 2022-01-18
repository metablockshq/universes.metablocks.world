import { web3 } from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js'
import { defAtom } from '@thi.ng/atom'
import useSWR from 'swr'
import { programIds } from '../config'
import {
  findAssociatedAddressForKey,
  findUniverseAddress,
  findUserNftAddress,
  findVaultAddress,
  getMetaBlocksProgram,
} from '../utils/solana'

const state = defAtom({})

const createUniverse = async (
  wallet,
  name,
  description,
  websiteUrl,
) => {
  const program = getMetaBlocksProgram(wallet)
  try {
    state.swap((current) => ({
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
    state.swap((current) => ({
      ...current,
      createdUniverseData: universeData,
    }))
  } catch (error) {
    console.log(error)
    state.swap((current) => ({
      ...current,
      createUniverseError: error,
    }))
  } finally {
    state.swap((current) => ({
      ...current,
      creatingUniverse: false,
    }))
  }
}

// TODO: convert this to useResource hook
const useUniverses = (network) => {
  return useSWR(network.universeIndexUrl)
}

// TODO: convert this to useResource hook
const useLastCrawledTime = (network) => {
  return useSWR(network.universeLastCrawledUrl)
}

const universeByPublicKey = (universes, publicKey) => {
  return universes.find((u) => u.publicKey === publicKey)
}

const depositNft = async (wallet, metadata) => {
  // TODO: deposit one at a time?
  state.resetIn('depositingNft', true)

  const { mint, updateAuthority } = metadata.data
  const mintKey = new PublicKey(mint)
  const updateAuthorityKey = new PublicKey(updateAuthority)

  console.log(1, mintKey, updateAuthorityKey)

  // userNftKey is the wrapper account for the vault where the NFT is stored rn
  // bump is needed for validation
  const [userNftKey, userNftBump] = await findUserNftAddress(
    updateAuthorityKey,
    mintKey,
  )

  console.log(2, userNftKey, userNftBump)

  // const universeKey = account of the universe in question
  const universeKey = new PublicKey(
    '6oupeGxPUSRL6V7cHejqoco2w49ZBHaq4pzVthCiyYkq',
  )

  // vaultKey is the owner of the vaultAssociatedAccount
  const [vaultKey, vaultBump] = await findVaultAddress(
    universeKey,
    userNftKey,
    mintKey,
  )

  console.log(3, vaultKey, vaultBump)

  // vaultAssociatedKey is the public key of the (escrow) account that actually stores the nft
  const [vaultAssociatedKey, vaultAssociatedBump] =
    await findAssociatedAddressForKey(vaultKey, mintKey)

  console.log(4, vaultAssociatedKey, vaultAssociatedBump)

  const program = getMetaBlocksProgram(wallet)

  program.rpc
    .depositNft(userNftBump, vaultBump, vaultAssociatedBump, {
      accounts: {
        userNft: userNftKey,
        vaultAuthority: vaultKey,
        authority: wallet.publicKey,
        universe: universeKey,
        userAssociatedNft: metadata.pubkey,
        vaultAssociatedNft: vaultAssociatedKey,
        tokenMint: mint,
        payer: wallet.publicKey,
        tokenProgram: programIds.spl,
        associatedTokenProgram: programIds.associatedToken,
        systemProgram: web3.SystemProgram.programId,
        rent: web3.SYSVAR_RENT_PUBKEY,
      },
      signers: [],
    })
    .then(console.log)
    .catch((err) => {
      console.log('depositNftError', err)
    })
    .finally(() => {
      console.log('reset depositingNft')
      state.resetIn('depositingNft', false)
    })
}

export default state
export {
  createUniverse,
  depositNft,
  useUniverses,
  useLastCrawledTime,
  universeByPublicKey,
}
