import { useParams } from 'react-router-dom'

import Nav from '../components/Nav'
import Placard from '../components/Placard'
import networkState from '../domain/network'
import { useAtom } from '../utils/hooks'
import { useUniverses, universeByPublicKey } from '../domain/universe'

function KVView({ universe }) {
  return (
    <div>
      {Object.keys(universe)
        .filter((k) => k !== 'metadata')
        .map((k) => {
          const v = universe[k]
          return (
            <div key={k} className="mb-4">
              <div className="text-gray-500">{k}</div>
              <div className="text-lg">{v}</div>
            </div>
          )
        })}
    </div>
  )
}

function ViewUniverse() {
  const { publicKey } = useParams()
  const { selectedNetwork } = useAtom(networkState)
  const { data: universes, error } = useUniverses(selectedNetwork)
  const universe =
    universes && !error && universeByPublicKey(universes, publicKey)

  return (
    <>
      <Nav />
      {universe && (
        <div className="mt-10 w-1/2 mx-auto">
          <KVView universe={universe} />
        </div>
      )}
      {!universe && <Placard />}
    </>
  )
}

export default ViewUniverse
