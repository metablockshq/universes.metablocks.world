import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar,
  Alignment,
  Button,
  Intent,
  Classes,
  Menu,
  MenuItem,
  Position
} from '@blueprintjs/core'
import { Popover2 } from '@blueprintjs/popover2'
import { useWalletKit } from '@gokiprotocol/walletkit'
import { useConnectedWallet, useSolana } from '@saberhq/use-solana'

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
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading className="font-bold">
          <Link to="/" className="hover:no-underline">
            ✨ Meta Blocks Universes
          </Link>
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
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
  )
}

export default Nav
