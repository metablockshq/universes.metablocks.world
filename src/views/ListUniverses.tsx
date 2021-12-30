import React, { ReactElement } from 'react'

import Nav from '../components/Nav'
import Placard from '../components/Placard'
import woman from '../img/woman.svg'

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
    </>
  )
}

export default ListUniverses
