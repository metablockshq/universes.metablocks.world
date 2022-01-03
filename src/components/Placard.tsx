import { ReactElement } from 'react'

interface IPlacardProps {
  imgSrc: string
  title: string
  body?: string
}

function Placard({ imgSrc, title, body }: IPlacardProps): ReactElement {
  return (
    <div className="text-center w-full flex content-center flex-col">
      <img className="h-36" src={imgSrc} />
      <p className="text-xl my-2">{title}</p>
      <p className="text-slate-600">{body}</p>
    </div>
  )
}

export default Placard
