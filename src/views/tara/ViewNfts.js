import {
  useConnectedWallet,
  useSolana,
} from '@gokiprotocol/walletkit'
import { PublicKey } from '@solana/web3.js'
import { Metadata } from '@metaplex-foundation/mpl-token-metadata'

import { getConnection } from '../../utils/solana'

function ViewNfts() {
  const wallet = useConnectedWallet()
  const solana = useSolana()
  const conn = getConnection()

  console.log(conn)
  /* console.log(
   *   wallet &&
   *     conn
   *       .getBalance(wallet.publicKey)
   *       .then((a, b, c) => console.log(a, b, c)),
   * )
   */

  wallet &&
    conn
      .getParsedProgramAccounts(
        // metaplex program
        // new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'),
        // spl program
        new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
        {
          filters: [
            {
              dataSize: 165, // number of bytes
            },
            {
              memcmp: {
                offset: 32, // number of bytes
                bytes: wallet.publicKey.toString(),
              },
            },
          ],
        },
      )
      .then(console.log)
      .catch(console.log)

  /* wallet &&
   *   conn
   *     .getProgramAccounts(
   *       // new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
   *       new PublicKey('5Md7XyZEnQUgm2rVdRSmy9e5D1VnYgcJkBCrVH1baVLJ'),
   *     )
   *     .then(console.log)
   *     .catch(console.log)
   */

  if (wallet) {
    Metadata.getPDA(
      new PublicKey('5Md7XyZEnQUgm2rVdRSmy9e5D1VnYgcJkBCrVH1baVLJ'),
    ).then((metadataPDA) => {
      Metadata.load(conn, metadataPDA).then(console.log)
    })
  }
  return <div>View</div>
}

export default ViewNfts
