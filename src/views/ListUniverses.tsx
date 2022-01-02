import { Card, Intent, Tag } from '@blueprintjs/core'
import { formatDistanceToNow } from 'date-fns'
import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import Nav from '../components/Nav'
import Placard from '../components/Placard'
import woman from '../img/woman.svg'

interface UniverseCardProps {
  id: string
  thumbnailUrl: string
  name: string
  description: string
  numOwners: number
  createdAt: Date
}

const UniverseCard = ({
  name,
  id,
  thumbnailUrl,
  description,
  numOwners,
  createdAt
}: UniverseCardProps): ReactElement => {
  return (
    <Link to={`/universe/${id}`} className="hover:no-underline">
      <Card
        className="flex flex-col mb-4 h-[28rem] justify-between"
        interactive={true}
      >
        <div>
          <img
            alt={`${name} - thumbnail image`}
            className="rounded"
            src={thumbnailUrl}
          />
          <div className="mt-2">
            <h5 className="text-2xl text-black">{name}</h5>
            <p className="text-gray-500">{description}</p>
          </div>
        </div>
        <div>
          <Tag
            minimal={true}
            intent={Intent.SUCCESS}
            round={true}
            className="mr-2"
            icon="people"
          >
            {numOwners} owners
          </Tag>
          <Tag minimal={true} intent={Intent.PRIMARY} round={true} icon="time">
            Created {formatDistanceToNow(createdAt)} ago
          </Tag>
        </div>
      </Card>
    </Link>
  )
}

const dummyUniverses: UniverseCardProps[] = [
  {
    name: 'Genopets',
    description: 'Play to earn evolable NFTs',
    id: 'FSVdqBzx5D4UsqBLnvmH5dFx2dCm1pTPAbQWJ1PYzTJ2',
    thumbnailUrl:
      'https://s2.coinmarketcap.com/static/img/coins/64x64/13632.png',
    numOwners: 789,
    createdAt: new Date()
  },
  {
    name: 'Dengen Ape Academy',
    // eslint-disabled-next-line
    description:
      'Take 10,000 of the smoothest brained apes, put them all in one location and let the mayhem ensue.',
    id: 'FSVdqBzx5D4UsqBLnvmH5dFx2dCm1pTPAbQWJ1PYzTJ2',
    thumbnailUrl:
      'https://pbs.twimg.com/profile_images/1420551018685763586/UGfbY4f6_400x400.jpg',
    numOwners: 789,
    createdAt: new Date()
  },
  {
    name: 'Genopets',
    description: 'Play to earn evolable NFTs',
    id: 'FSVdqBzx5D4UsqBLnvmH5dFx2dCm1pTPAbQWJ1PYzTJ2',
    thumbnailUrl:
      'https://s2.coinmarketcap.com/static/img/coins/64x64/13632.png',
    numOwners: 789,
    createdAt: new Date()
  },
  {
    name: 'Dengen Ape Academy',
    // eslint-disabled-next-line
    description:
      'Take 10,000 of the smoothest brained apes, put them all in one location and let the mayhem ensue.',
    id: 'FSVdqBzx5D4UsqBLnvmH5dFx2dCm1pTPAbQWJ1PYzTJ2',
    thumbnailUrl:
      'https://pbs.twimg.com/profile_images/1420551018685763586/UGfbY4f6_400x400.jpg',
    numOwners: 789,
    createdAt: new Date()
  },
  {
    name: 'Dengen Ape Academy',
    // eslint-disabled-next-line
    description:
      'Take 10,000 of the smoothest brained apes, put them all in one location and let the mayhem ensue.',
    id: 'FSVdqBzx5D4UsqBLnvmH5dFx2dCm1pTPAbQWJ1PYzTJ2',
    thumbnailUrl:
      'https://pbs.twimg.com/profile_images/1420551018685763586/UGfbY4f6_400x400.jpg',
    numOwners: 789,
    createdAt: new Date()
  },
  {
    name: 'Dengen Ape Academy',
    // eslint-disabled-next-line
    description:
      'Take 10,000 of the smoothest brained apes, put them all in one location and let the mayhem ensue.',
    id: 'FSVdqBzx5D4UsqBLnvmH5dFx2dCm1pTPAbQWJ1PYzTJ2',
    thumbnailUrl:
      'https://pbs.twimg.com/profile_images/1420551018685763586/UGfbY4f6_400x400.jpg',
    numOwners: 789,
    createdAt: new Date()
  },
  {
    name: 'Genopets',
    description: 'Play to earn evolable NFTs',
    id: 'FSVdqBzx5D4UsqBLnvmH5dFx2dCm1pTPAbQWJ1PYzTJ2',
    thumbnailUrl:
      'https://s2.coinmarketcap.com/static/img/coins/64x64/13632.png',
    numOwners: 789,
    createdAt: new Date()
  }
]

const ListUniverses = (): ReactElement => {
  return (
    <>
      <Nav />
      <div className="mt-10 w-2/3 lg:w-2/6 mx-auto">
        <Placard
          imgSrc={woman}
          title="A list of universes will show up here"
          body="The Meta Blocks protocol is under active development. This place will soon show a list of all the universes created on Meta Blocks."
        />
      </div>
      <div className="m-4 grid grid-cols-6 gap-4">
        {dummyUniverses.map((u) => (
          <UniverseCard key={u.id} {...u} />
        ))}
      </div>
    </>
  )
}

export default ListUniverses
