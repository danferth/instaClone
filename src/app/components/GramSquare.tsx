'use client'
import React from 'react'
import type { Gram } from '../../payload-types'
import Image from 'next/image'
import useGramStore from './GramStore'
interface GramSquareProps {
  g: Gram
}

const GramSquare: React.FC<GramSquareProps> = ({ g }) => {
  const setGram = useGramStore((state) => state.setGram)
  const image =
    typeof g.image === 'object' && g.image !== null
      ? g.image
      : { url: '/images/kanye.jpg', alt: 'placeholder image' }

  return (
    <button className="overflow-hidden rounded-sm" onClick={() => setGram(g)}>
      <Image
        className="w-full h-full"
        width={200}
        height={200}
        placeholder="blur"
        blurDataURL="/images/kanye.jpg"
        alt={image.alt || 'Instagram clone image'}
        src={image.url || '/images/kenye.jpg'}
      />
    </button>
  )
}

export default GramSquare
