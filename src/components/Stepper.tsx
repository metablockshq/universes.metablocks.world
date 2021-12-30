import { ReactElement } from 'react'

interface Step {
  id: string
  title: string
}

interface Props {
  activeId: string
  steps: Step[]
}

function Stepper({ activeId, steps }: Props): ReactElement {
  return (
    <div className="grid grid-cols-3 gap-4 w-3/4 m-auto">
      <div className="border-t-4 border-purple-500 pt-4">
        <p className="uppercase text-purple-500 font-bold">Step 1</p>

        <p className="font-semibold">Job details</p>
      </div>
      <div className="border-t-4 border-purple-500 pt-4">
        <p className="uppercase text-purple-500 font-bold">Step 2</p>

        <p className="font-semibold">Application form</p>
      </div>
      <div className="border-t-4 border-gray-200 pt-4">
        <p className="uppercase text-gray-400 font-bold">Step 3</p>

        <p className="font-semibold">Preview</p>
      </div>
    </div>
  )
}

export default Stepper
