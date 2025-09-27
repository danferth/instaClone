import { create } from 'zustand'
import type { Gram } from '../../payload-types'

interface GramStoreState {
  gram: Gram | null
  setGram: (gram: Gram) => void
}

const useGramStore = create<GramStoreState>((set) => ({
  gram: null,
  setGram: (gram) => set({ gram }),
}))

export default useGramStore
