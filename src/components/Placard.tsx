import React, { ReactElement } from 'react'

interface PlacardProps {
  imgSrc: string
  title: string
  body?: string
}

const Placard = ({ imgSrc, title, body }: PlacardProps): ReactElement => {
  return (
    <div className="text-center w-full flex content-center flex-col">
      <img className="h-36" src={imgSrc} />
      <p className="text-xl my-2">{title}</p>
      <p className="text-slate-600">{body}</p>
    </div>
  )
}

export default Placard
