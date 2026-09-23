'use client'

import { useEffect } from 'react'

/**
 * Widget Tawk.to propre à ce site (tableau de bord Tawk → Administration →
 * Chat Widget → lien direct). Sans variable, le chat n'est pas chargé.
 */
const TAWK_SRC = process.env.NEXT_PUBLIC_TAWK_SRC
/** Délai maximal avant chargement, pour un visiteur qui ne touche à rien. */
const FALLBACK_DELAY_MS = 8000
const TRIGGERS = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const

declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>
    Tawk_LoadStart?: Date
  }
}

/**
 * Chat en direct Tawk.to, chargé à la première interaction (ou après 8 s).
 * Chargé dès la fin du chargement de la page, sa bulle d'accueil animée
 * provoquait un décalage de mise en page (CLS 0,19) et faisait perdre
 * ~9 points au score mobile de PageSpeed.
 */
export default function TawkChat() {
  useEffect(() => {
    if (!TAWK_SRC || document.getElementById('tawk-to')) return

    let timer: ReturnType<typeof setTimeout> | undefined
    const load = () => {
      cleanup()
      if (document.getElementById('tawk-to')) return
      window.Tawk_API = window.Tawk_API || {}
      window.Tawk_LoadStart = new Date()
      const script = document.createElement('script')
      script.id = 'tawk-to'
      script.async = true
      script.src = TAWK_SRC as string
      script.charset = 'UTF-8'
      script.setAttribute('crossorigin', '*')
      document.body.appendChild(script)
    }
    const cleanup = () => {
      if (timer) clearTimeout(timer)
      TRIGGERS.forEach((event) => window.removeEventListener(event, load))
    }

    TRIGGERS.forEach((event) => window.addEventListener(event, load, { once: true, passive: true }))
    timer = setTimeout(load, FALLBACK_DELAY_MS)
    return cleanup
  }, [])

  return null
}
