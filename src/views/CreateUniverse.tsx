import React, { ReactElement, useState } from 'react'
import { useConnectedWallet, useSolana } from '@saberhq/use-solana'
import {
  Button,
  FormGroup,
  InputGroup,
  Intent,
  TextArea
} from '@blueprintjs/core'

import Nav from '../components/Nav'
import { wireEventValue } from '../utils/func'
import man from '../img/man.svg'
import Placard from '../components/Placard'

const ConnectWalletPrompt = () => (
  <Placard imgSrc={man} title={'Connect your wallet to continue'} />
)

const CreateUniversForm = () => {
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [websiteUrl, setWebsiteUrl] = useState()

  return (
    <div className="w-2/3 lg:w-2/6 mx-auto">
      <h1 className="text-2xl my-2">Create a new universe</h1>
      <form>
        <FormGroup
          label="Name"
          labelFor="name"
          labelInfo="*"
          helperText="Name of your project: Ex: 3moji"
        >
          <InputGroup
            id="name"
            value={name}
            onChange={wireEventValue(setName)}
          />
        </FormGroup>
        <FormGroup
          label="Description"
          labelFor="description"
          helperText="A short intro to your project"
        >
          <TextArea
            fill={true}
            id="description"
            value={description}
            onChange={wireEventValue(setDescription)}
          />
        </FormGroup>
        <FormGroup label="Website" labelFor="website" labelInfo="*">
          <InputGroup
            id="website"
            value={websiteUrl}
            onChange={wireEventValue(setWebsiteUrl)}
          />
        </FormGroup>

        <Button intent={Intent.PRIMARY}>Create</Button>
      </form>
    </div>
  )
}

const CreateUniverse = (): ReactElement => {
  const wallet = useConnectedWallet()

  return (
    <>
      <Nav />
      <div className="mt-10">
        {wallet ? <CreateUniversForm /> : <ConnectWalletPrompt />}
      </div>
    </>
  )
}

export default CreateUniverse
