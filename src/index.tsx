import './index.css'

import { ReactElement } from 'react'
import { WalletKitProvider } from '@gokiprotocol/walletkit'
import ReactDOM from 'react-dom'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

import CreateUniverse from './views/CreateUniverse'
import ListUniverses from './views/ListUniverses'

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
    {
      defaultNetwork: 'devnet',
      app: { name: 'Meta Blocks Universes' }
    }
  ],
  [BrowserRouter, {}],
  [Routes, {}]
]

const Root = combineProviders(providers)

function App(): ReactElement {
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
