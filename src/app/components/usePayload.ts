import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

interface UsePayloadProps {
  limit: number
  page: number
  sort: string
}

const usePayload = async (props: UsePayloadProps) => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const gram = await payload.find({
    collection: 'grams',
    limit: props.limit || 20,
    sort: props.sort || '-date',
    page: props.page || 1,
  })

  return gram
}

export default usePayload
