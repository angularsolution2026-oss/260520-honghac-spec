'use client'

// FallbackModal — hiện khi route chưa implement
// surface: popup_fallback — 00 §3 glossary

export function FallbackModal({ trigger }: { trigger: string }) {
  // Sprint P0: passive, no auto-trigger
  // Sprint 1A: wire up exit-intent + scroll trigger logic
  void trigger
  return null
}
