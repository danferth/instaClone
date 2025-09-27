'use client'
import React, { useState, useEffect } from 'react'

const useScroll = () => {
  const [scrollY, setScrollY] = useState(0)
  const safeWindow = typeof window !== 'undefined' ? true : false
  useEffect(() => {
    const handleScroll = () => {
      if (safeWindow) {
        setScrollY(window.scrollY) // For page scroll
        // For element scroll: setScrollY(elementRef.current.scrollTop);
      } else {
        return
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollY
}

export default useScroll
