import './index.css'

import React from 'react'
import { WalletKitProvider } from '@gokiprotocol/walletkit'
import ReactDOM from 'react-dom'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { SWRConfig } from 'swr'

import CreateUniverse from './views/CreateUniverse'
import ListUniverses from './views/ListUniverses'
import ViewUniverse from './views/ViewUniverse'

const combineProviders =
  (providers) =>
  ({ children }) =>
    providers.reduceRight(
      (tree, [Component, props]) => (
        <Component {...props}>{tree}</Component>
      ),
      children,
    )

const providers = [
  [
    WalletKitProvider,
    {
      defaultNetwork: 'devnet',
      app: { name: 'Meta Blocks Universes' },
    },
  ],
  [
    SWRConfig,
    {
      value: {
        fetcher: (...args) =>
          fetch(...args).then((res) => res.json()),
      },
    },
  ],
  [BrowserRouter, {}],
  [Routes, {}],
]

const Root = combineProviders(providers)

function App() {
  return (
    <Root>
      <Route path="/" element={<ListUniverses />} />
      <Route path="/create-universe" element={<CreateUniverse />} />
      <Route
        path="/universes/:publicKey"
        element={<ViewUniverse />}
      />
    </Root>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
