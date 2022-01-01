import React, { ReactElement, ReactNode, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { WalletKitProvider } from '@gokiprotocol/walletkit'

import ReactDOM from 'react-dom'

import CreateUniverse from './views/CreateUniverse'
import ListUniverses from './views/ListUniverses'

import './main.css'

const combineProviders =
  (providers) =>
    ({ children }) =>
      providers.reduceRight(
        (tree, [Component, props]) => <Component {...props}>{tree}</Component>,
        children
      )

const providers = [
  [
    WalletKitProvider,
    { defaultNetwork: 'devnet', app: { name: 'Meta Blocks Universes' } }
  ],
  [BrowserRouter, {}],
  [Routes, {}]
]

const Root = combineProviders(providers)

const App = (): ReactElement => {
  useEffect(() => { }, [])

  return (
    <Root>
      <Route path="/" element={<ListUniverses />} />
      <Route path="/create-universe" element={<CreateUniverse />} />
    </Root>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
