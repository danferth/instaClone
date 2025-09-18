import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  const { docs: gram } = await payload.find({
    collection: 'grams',
    limit: 10,
    sort: '-date',
  })
  console.log(gram[0])

  return (
    <div className="home">
      <div className="content">
        {!user && <h1>Welcome to your new project.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <div className="links">
          <a
            className="btn btn-primary btn-sm"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
        </div>
      </div>
      {gram?.map((g) => (
        <div key={g.id} className="gram">
          <h2>{g.title}</h2>
          {g.image && typeof g.image === 'object' && (
            <Image
              alt={g.image.alt}
              height={300}
              src={g.image.url || '../../images/kenye.jpg'}
              width={300}
            />
          )}
          <p>{g.caption}</p>
          <p>date/time: {new Date(g.date).toLocaleDateString()}</p>
          <p>location: {g.location}</p>
        </div>
      ))}
    </div>
  )
}
