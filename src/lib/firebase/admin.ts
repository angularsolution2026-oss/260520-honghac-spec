import { getApps, initializeApp, cert, getApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

function getAdminApp() {
  if (getApps().length > 0) return getApp()

  const sdkRaw = process.env.FIREBASE_ADMIN_SDK
  if (!sdkRaw) {
    throw new Error('FIREBASE_ADMIN_SDK env var is not set')
  }

  const serviceAccount = JSON.parse(
    Buffer.from(sdkRaw, 'base64').toString('utf-8')
  )

  return initializeApp({
    credential: cert(serviceAccount),
  })
}

export function getAdminDb() {
  return getFirestore(getAdminApp())
}

export function getAdminAuth() {
  return getAuth(getAdminApp())
}
