import { useConnectedWallet } from '@gokiprotocol/walletkit'
import { useEffect, useState } from 'react'
import {
  Intent,
  Button,
  ProgressBar,
  Card,
  Tag,
} from '@blueprintjs/core'

import { useAtom, useResource } from '../../utils/hooks'
import { scale } from '../../utils/number'
import { getConnection } from '../../utils/solana'

import tokenState, {
  getMetadataFromMint,
  getParsedProgramAccounts,
  filterEmptyProgramAccounts,
} from '../../domain/token'

const computeLoadingState = ({
  positiveBalanceProgramAccounts,
  gettingMetadataFromMint,
  gettingParsedProgramAccounts,
  metadataFromMint,
}) => {
  // just got started
  if (gettingParsedProgramAccounts)
    return { message: 'Parsing tokens in your wallet', progress: 10 }

  // have program accounts
  if (positiveBalanceProgramAccounts && !metadataFromMint)
    return {
      message: `Fetching metadata for ${positiveBalanceProgramAccounts.length} tokens`,
      progress: 20,
    }

  // if all gettingMetadataFromMint are false, but no metadataFromMints, it means we didn't start
  // if all gettingMetadataFromMint are false, but some metadataFromMints ewe are fetching
  if (
    positiveBalanceProgramAccounts &&
    gettingMetadataFromMint &&
    metadataFromMint &&
    // have got metadata for some
    Object.values(metadataFromMint).length > 0 &&
    // some are loading
    Object.values(gettingMetadataFromMint).some(Boolean)
  ) {
    // this returns between 20 and 70
    const totalMetadataToFetch = positiveBalanceProgramAccounts.length
    const fetched = Object.values(metadataFromMint).length
    const completePercentage = fetched / totalMetadataToFetch
    return {
      message: `Fetching metadata for ${positiveBalanceProgramAccounts.length} tokens`,
      progress: scale(completePercentage, 0, 1, 20, 70),
    }
  }

  if (
    positiveBalanceProgramAccounts &&
    gettingMetadataFromMint &&
    metadataFromMint &&
    // fetched for all
    Object.values(metadataFromMint).length ===
      positiveBalanceProgramAccounts.length &&
    Object.values(gettingMetadataFromMint).every((x) => !x) // all are false
  )
    return {
      message: 'Fetched all metadata.',
      progress: 100,
    }

  return { message: 'Setting up the arc reactor', progress: 8 }
}

const Progress = ({ positiveBalanceProgramAccounts }) => {
  const [loadingState, setLoadingState] = useState({
    progress: 0,
    message: '',
  })
  const {
    gettingMetadataFromMint,
    gettingParsedProgramAccounts,
    metadataFromMint,
  } = useAtom(tokenState)

  useEffect(() => {
    setLoadingState(
      computeLoadingState({
        positiveBalanceProgramAccounts,
        gettingMetadataFromMint,
        gettingParsedProgramAccounts,
        metadataFromMint,
      }),
    )
  }, [gettingMetadataFromMint, gettingParsedProgramAccounts])
  return (
    <div>
      {loadingState.message}
      <ProgressBar value={loadingState.progress / 100} />
    </div>
  )
}

const MetadataCard = ({ metadata }) => {
  const { name, uri } = metadata.data.data
  const { data, error, isLoading } = useResource(uri)
  return (
    <Card
      className="flex flex-col mb-4 justify-between p-0"
      interactive={false}
    >
      {!isLoading && (
        <img
          alt={`${name} - thumbnail image`}
          className="rounded"
          src={data.image}
        />
      )}
      <div className="mt-2 bg-slate-200">
        <h5 className="text-lg text-black bg-slate-100 py-2 px-4">
          {name}
        </h5>
        {!isLoading && (
          <div className="p-4">
            <p className="text-gray-600">{data.description}</p>
            <div className="mt-2 flex flex-wrap justify-start">
              <Tag minimal round icon="dollar" className="mr-2 mt-2">
                {data.symbol}
              </Tag>
              {data.attributes.map((a) => (
                <Tag
                  key={a.trait_type}
                  icon="tag"
                  minimal
                  round
                  className="mt-2 mr-2"
                >
                  {a.trait_type}: {a.value}
                </Tag>
              ))}
            </div>
          </div>
        )}
        {isLoading && <div>Loading ...</div>}
        <div className="px-4 pb-4">
          <Button fill intent={Intent.PRIMARY} text="Deposit" />
        </div>
      </div>
    </Card>
  )
}

const MetadataList = ({ metadataFromMint }) => {
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4">
      {Object.keys(metadataFromMint).map((mint) => {
        return (
          <MetadataCard
            key={mint}
            metadata={metadataFromMint[mint]}
          />
        )
      })}
    </div>
  )
}
const ViewNfts = () => {
  const [
    positiveBalanceProgramAccounts,
    setPositiveBalanceProgramAccounts,
  ] = useState(null)

  const wallet = useConnectedWallet()
  const {
    gettingParsedProgramAccounts,
    parsedProgramAccounts,
    gettingMetadataFromMint,
    metadataFromMint,
  } = useAtom(tokenState)

  useEffect(() => {
    if (wallet) getParsedProgramAccounts(wallet)
  }, [wallet])

  useEffect(() => {
    const filtered = filterEmptyProgramAccounts(parsedProgramAccounts)
    setPositiveBalanceProgramAccounts(filtered)

    filtered.map((pa) =>
      getMetadataFromMint(pa.account.data.parsed.info.mint),
    )
  }, [parsedProgramAccounts])

  const isLoading =
    positiveBalanceProgramAccounts &&
    metadataFromMint &&
    positiveBalanceProgramAccounts.length !==
      Object.values(metadataFromMint).length

  return (
    <div>
      {isLoading && (
        <Progress
          positiveBalanceProgramAccounts={
            positiveBalanceProgramAccounts
          }
        />
      )}
      {!isLoading && (
        <div>
          <MetadataList metadataFromMint={metadataFromMint} />
        </div>
      )}
    </div>
  )
}

export default ViewNfts
