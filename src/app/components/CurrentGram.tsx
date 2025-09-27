'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import type { Gram } from '../../payload-types'
import useGramStore from './GramStore'
interface CurrentGramProps {
  gram: Gram
}

const CurrentGram: React.FC<CurrentGramProps> = ({ gram }) => {
  const setGram = useGramStore((state) => state.setGram)
  const gramState = useGramStore((state) => state.gram)
  useEffect(() => {
    setGram(gram)
  }, [gram])

  const image =
    gramState && typeof gramState.image === 'object' && gramState.image !== null
      ? gramState.image
      : { url: '/images/kanye.jpg', alt: 'placeholder image' }

  return (
    <div className="bg-base-100 card card-xs w-full max-w-sm">
      <figure>
        <Image
          className="w-full aspect-square object-cover"
          src={image.url || '/images/kanye.jpg'}
          alt={image.alt || 'Instagram clone image'}
          width={300}
          height={300}
        />
      </figure>
      <div className="card-body">
        <h1 className="card-title">{gramState ? gramState.date : ''}</h1>
        <p className="shrink-1">{gramState ? gramState.caption : ''}</p>
        <p className="shrink-1">{gramState ? gramState.location : ''}</p>
      </div>
    </div>
  )
}

export default CurrentGram
