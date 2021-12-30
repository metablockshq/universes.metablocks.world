import { ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'

import CreateUniverse from './views/CreateUniverse'

function App(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<CreateUniverse />} />
    </Routes>
  )
}

export default App
