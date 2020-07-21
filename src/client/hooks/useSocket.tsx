/* gloabls DOMAIN */
import { useMemo } from 'react'
import io from 'socket.io-client'

declare global { const DOMAIN: string }

export default function useSocket () {
  const socket = useMemo(() => io(DOMAIN), [DOMAIN])
  return socket
}
