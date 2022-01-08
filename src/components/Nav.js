import {
  InputGroup,
  NavbarDivider,
  Alignment,
  Button,
  Classes,
  Intent,
  Menu,
  MenuItem,
  Navbar,
  Position,
} from '@blueprintjs/core'
import { Popover2 } from '@blueprintjs/popover2'
import { Select, ItemRenderer } from '@blueprintjs/select'
import { useWalletKit } from '@gokiprotocol/walletkit'
import { useConnectedWallet, useSolana } from '@saberhq/use-solana'
import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { networks } from '../config'
import { retractMiddle } from '../utils/string'
import { useAtom } from '../utils/hooks'
import networkState, { switchNetwork } from '../domain/network'

function ConnectedPopover({ children, disconnect }) {
  return (
    <Popover2
      content={
        <Menu>
          <MenuItem
            icon="log-out"
            onClick={disconnect}
            text="Disconnect"
          />
        </Menu>
      }
      position={Position.BOTTOM_RIGHT}
    >
      {children}
    </Popover2>
  )
}

function NetworkSelectPopover({ children }) {
  return (
    <Popover2
      content={
        <Menu>
          {networks.map((n) => (
            <MenuItem
              key={n.id}
              text={n.label}
              onClick={() => switchNetwork(n.id)}
            />
          ))}
        </Menu>
      }
      position={Position.BOTTOM_RIGHT}
    >
      {children}
    </Popover2>
  )
}

function UniverseSearch() {
  return (
    <InputGroup
      className="mr-2"
      placeholder="Search for a universe"
      leftIcon="search"
    />
  )
}

function Nav(): ReactElement {
  const { connect } = useWalletKit()
  const wallet = useConnectedWallet()
  const { disconnect } = useSolana()

  const { selectedNetwork } = useAtom(networkState)

  return (
    <div className="pb-8">
      <Navbar fixedToTop>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading className="font-bold">
            <Link to="/" className="hover:no-underline">
              ✨ Meta Blocks Universes ⍺
            </Link>
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT} className="">
          <UniverseSearch />
          <Link
            className={[
              Classes.BUTTON,
              Classes.MINIMAL,
              `${Classes.ICON}-new-object`,
              'mr-2',
            ].join(' ')}
            to="/create-universe"
          >
            Create Universe
          </Link>
          {!wallet && (
            <Button
              intent={Intent.PRIMARY}
              icon="user"
              text="Connect wallet"
              onClick={connect}
            />
          )}
          {wallet && (
            <NetworkSelectPopover>
              <Button
                icon="globe-network"
                minimal={true}
                className="mr-2"
                rightIcon="caret-down"
                text={selectedNetwork.label}
              />
            </NetworkSelectPopover>
          )}

          {wallet && (
            <ConnectedPopover disconnect={disconnect}>
              <Button
                intent={Intent.PRIMARY}
                icon="user"
                rightIcon="caret-down"
                text={retractMiddle(wallet.publicKey.toString(), 8)}
              />
            </ConnectedPopover>
          )}
        </Navbar.Group>
      </Navbar>
    </div>
  )
}

export default Nav
