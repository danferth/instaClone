'use client'
import React, { useState, useEffect, useRef } from 'react'
import CurrentGram from '../components/CurrentGram'
import GramSquare from '../components/GramSquare'
import './styles.css'
import axios from 'axios'
import useScroll from '../components/useScroll'
import type { Gram } from '../../payload-types'
import { useInView } from 'react-intersection-observer'
// import usePayload from '../components/usePayload'
export default function HomePage() {
  // const gram = await usePayload({ limit: 25, page: 1, sort: '-date' })

  interface GramResponce {
    docs: Gram[]
    hasNextPage: true
    hasPrevPage: false
    limit: 25
    nextPage: 2
    page: 1
    pagingCounter: 1
    prevPage: null
    totalDocs: 34
    totalPages: 2
  }
  const [gramResponce, setGramResponce] = useState<GramResponce | null>(null)
  const [grams, setGrams] = useState<Gram[] | []>([])
  // pagination
  const [currentPageState, setCurrentPage] = useState<number>(1)
  const [hasNextPageState, setHasNextPage] = useState<boolean>(true)
  useEffect(() => {
    fetchGrams(1)
  }, [])
  // fetch gram posts with page number
  async function fetchGrams(page: number) {
    console.log('fetching...')
    const url = typeof window !== 'undefined' ? window.location.origin : ''
    const query = `?limit=12&page=${page}&sort=-date`
    try {
      const response = await axios.get(`${url}/api/grams${query}`)
      console.log(response)
      setGramResponce(response.data)
      setGrams((grams) => [...grams, ...response.data.docs])
      setCurrentPage(response.data.page || 1)
      setHasNextPage(response.data.hasNextPage)
    } catch (error) {
      console.error(error)
    }
  }
  // handle load more gram posts
  function loadMoreGrams() {
    if (!hasNextPageState) {
      console.log('no more pages')
      return
    } else {
      console.log('has next page')
      const nextPage = currentPageState + 1
      fetchGrams(nextPage)
    }
  }

  // detect window height and scroll to load more grams
  const { ref, inView } = useInView({
    threshold: 1,
    rootMargin: '0px',
    triggerOnce: false,
  })

  // const anchor = useRef<HTMLDivElement | null>(null)
  // const scrollY = useScroll()
  useEffect(() => {
    if (inView) {
      grams && loadMoreGrams()
    }
  }, [inView, grams])

  return (
    <div className="min-h-screen">
      {/* curent gram display */}
      <div className="w-full px-4 md:px-0 flex items-center justify-center mt-8 mb-12">
        {grams && grams.length > 0 ? (
          <CurrentGram gram={grams[0]} />
        ) : (
          <div className="">Loading...</div>
        )}
      </div>
      {/* images wrapper */}
      <div className="mx-auto md:max-w-9/12 w-full h-full grid grid-cols-3 md:grid-cols-4 gap-4 px-4 md:px-0 pb-4">
        {grams && grams.length > 0 ? (
          grams?.map((g) => <GramSquare key={g.id} g={g} />)
        ) : (
          <div className="">Loading...</div>
        )}
        {grams.length > 0 && (
          <div ref={ref} className="border border-t-slate-900 col-span-3 md:col-span-4"></div>
        )}
      </div>
    </div>
  )
}
