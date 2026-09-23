'use client'

import { useEffect } from 'react'

export default function ClearApplicationDraft() {
  useEffect(() => {
    window.sessionStorage.removeItem('canada-eta-session-draft')
  }, [])
  return null
}
