'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
  serverParticipants: Participants[]
}

export default function Dashboard({ serverParticipants }: Props) {
  return (
    <>
      <ul className="my-aut">
        <h1>asdfasdf</h1>
      </ul>
    </>
  )
}
