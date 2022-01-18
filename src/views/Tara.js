import { Classes } from '@blueprintjs/core'
import {
  useLocation,
  Link,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'

import Nav from '../components/Nav'
import Intro from './tara/Intro'

const tabLinks = [
  {
    id: 'intro',
    label: 'Intro',
    to: '/tara',
    icon: '',
  },
  {
    id: 'view',
    label: 'View NFTs',
    to: '/tara/view-nfts',
    icon: '',
  },
]

function TaraNav() {
  const { pathname } = useLocation()

  return (
    <ul className={`${Classes.TAB_LIST}`}>
      {tabLinks.map((l) => (
        <li
          className={Classes.TAB}
          key={l.id}
          role="tab"
          aria-selected={pathname === l.to}
        >
          <Link to={l.to}>{l.label}</Link>
        </li>
      ))}
    </ul>
  )
}

function Tara() {
  return (
    <>
      <Nav />
      <div className={`mt-8 px-4`}>
        <TaraNav />

        <Outlet />
      </div>
    </>
  )
}

export default Tara
