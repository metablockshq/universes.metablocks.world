import {
  Button,
  FormGroup,
  InputGroup,
  Intent,
  TextArea,
} from '@blueprintjs/core'
import { useConnectedWallet } from '@saberhq/use-solana'
import { ReactElement, useState } from 'react'

import Nav from '../components/Nav'
import Placard from '../components/Placard'
import { createUniverse } from '../domain/wallet'
import man from '../img/man.svg'
import { wireEventValue } from '../utils/func'

function ConnectWalletPrompt() {
  return (
    <Placard imgSrc={man} title="Connect your wallet to continue" />
  )
}

function CreateUniversForm() {
  const wallet = useConnectedWallet()
  const [name, setName] = useState('test')
  const [description, setDescription] = useState('test')
  const [websiteUrl, setWebsiteUrl] = useState('https://test.est')

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
            fill
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

        <Button
          intent={Intent.PRIMARY}
          onClick={async (e) => {
            e.preventDefault()
            await createUniverse(
              wallet,
              name,
              description,
              websiteUrl,
            )
          }}
        >
          Create
        </Button>
      </form>
    </div>
  )
}

function CreateUniverse(): ReactElement {
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
