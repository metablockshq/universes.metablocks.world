import { Callout, Card, Intent, Tag } from '@blueprintjs/core'
import { formatDistanceToNow, fromUnixTime } from 'date-fns'
import { Link } from 'react-router-dom'

import Nav from '../components/Nav'
import Placard from '../components/Placard'
import woman from '../img/woman.svg'
import thumbnail from '../img/placeholder-thumb.jpg'
import { useUniverses, useLastCrawledTime } from '../domain/universe'
import networkState from '../domain/network'
import { useAtom } from '../utils/hooks'

function UniverseCard({ universe }) {
  return (
    <Link
      to={`/universe/${universe.publicKey}`}
      className="hover:no-underline"
    >
      <Card
        className="flex flex-col mb-4 h-[28rem] justify-between"
        interactive
      >
        <div>
          <img
            alt={`${universe.name} - thumbnail image`}
            className="rounded"
            src={thumbnail}
          />
          <div className="mt-2">
            <h5 className="text-2xl text-black">{universe.name}</h5>
            <p className="text-gray-500">{universe.description}</p>
          </div>
        </div>
        <div>
          <Tag
            minimal
            intent={Intent.SUCCESS}
            round
            className="mr-2"
            icon="lock"
          >
            {universe.totalNFTs || 0} NFTs locked
          </Tag>
          <Tag minimal intent={Intent.PRIMARY} round icon="time">
            Created{' '}
            {formatDistanceToNow(
              fromUnixTime(universe.metadata.blockTime),
            )}{' '}
            ago
          </Tag>
        </div>
      </Card>
    </Link>
  )
}

function LoadingState() {
  return <div>Loading...</div>
}

function NoUniverses() {
  return (
    <div className="mt-10 w-2/3 lg:w-2/6 mx-auto">
      <Placard
        imgSrc={woman}
        title="A list of universes will show up here"
        body="The Meta Blocks protocol is under active development. This place will soon show a list of all the universes created on Meta Blocks."
      />
    </div>
  )
}

function Universes({ data, error }) {
  return (
    <div className="mt-10 mx-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {data &&
        !error &&
        data.map((u) => (
          <UniverseCard key={u.publicKey} universe={u} />
        ))}
    </div>
  )
}

function CrawlInfo({ data }) {
  return (
    <div className="mt-4">
      <Callout icon={'time'} intent={Intent.PRIMARY}>
        Last crawled{' '}
        {formatDistanceToNow(fromUnixTime(data.timestamp))} ago. It
        takes about an hour for your newly created universe to reflect
        on the index.
      </Callout>
    </div>
  )
}

function ListUniverses() {
  const { selectedNetwork } = useAtom(networkState)
  const { data, error } = useUniverses(selectedNetwork)
  const { data: lastCrawledData, error: lastCrawledError } =
    useLastCrawledTime(selectedNetwork)
  const isLoading = !error && !data

  return (
    <>
      <Nav />
      {isLoading && <LoadingState />}

      {!isLoading && !data && <NoUniverses />}

      {!lastCrawledError && lastCrawledData && (
        <CrawlInfo data={lastCrawledData} />
      )}

      {!isLoading && data && <Universes data={data} error={error} />}
    </>
  )
}

export default ListUniverses
