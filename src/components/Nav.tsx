import { InputGroup } from '@blueprintjs/core'
import { NavbarDivider } from '@blueprintjs/core'
import {
  Alignment,
  Button,
  Classes,
  Intent,
  Menu,
  MenuItem,
  Navbar,
  Position
} from '@blueprintjs/core'
import { Popover2 } from '@blueprintjs/popover2'
import { useWalletKit } from '@gokiprotocol/walletkit'
import { useConnectedWallet, useSolana } from '@saberhq/use-solana'
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { retractMiddle } from '../utils/string'

interface ConnectedPopoverProps {
  children: ReactElement
  disconnect: () => void
}

function ConnectedPopover({
  children,
  disconnect
}: ConnectedPopoverProps): ReactElement {
  return (
    <Popover2
      content={
        <Menu>
          <MenuItem icon="log-out" onClick={disconnect} text="Disconnect" />
        </Menu>
      }
      position={Position.BOTTOM_RIGHT}
    >
      {children}
    </Popover2>
  )
}

function Nav(): ReactElement {
  const { connect } = useWalletKit()
  const wallet = useConnectedWallet()
  const { disconnect } = useSolana()

  return (
    <div className="pb-8">
      <Navbar fixedToTop={true}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading className="font-bold">
            <Link to="/" className="hover:no-underline">
              ✨ Meta Blocks Universes
            </Link>
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT} className="">
          <InputGroup
            className="mr-2"
            placeholder={'Search for a universe'}
            leftIcon="search"
          />
          <Link
            className={[
              Classes.BUTTON,
              Classes.MINIMAL,
              Classes.ICON + '-new-object',
              'mr-2'
            ].join(' ')}
            to={'/create-universe'}
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
            <ConnectedPopover disconnect={disconnect}>
              <Button
                intent={Intent.PRIMARY}
                icon="user"
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
