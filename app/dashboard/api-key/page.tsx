'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import { Copy, Check, Key } from 'lucide-react'
import Link from 'next/link'

export default function ApiKeyPage() {
  const { user } = useUser()
  const [copied, setCopied] = useState(false)

  // Generate a simple API key from user ID
  const apiKey = user?.id ? `ss_${Buffer.from(user.id).toString('base64').replace(/=/g, '')}` : ''

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link 
          href="/dashboard" 
          className="text-gray-500 hover:text-gray-700 mb-6 inline-block"
        >
          ← Back to Downloads
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Key className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Your API Key</h1>
              <p className="text-gray-500">Use this to activate SiegeScope</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between gap-4">
              <code className="text-sm font-mono text-gray-800 break-all">
                {apiKey || 'Loading...'}
              </code>
              <button
                onClick={copyToClipboard}
                className="flex-shrink-0 p-2 hover:bg-gray-200 rounded-lg transition"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-4 text-sm text-gray-600">
            <h3 className="font-semibold text-gray-900">How to use:</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Open SiegeScope on your computer</li>
              <li>Go to Settings → Account</li>
              <li>Paste your API key and click &quot;Activate&quot;</li>
            </ol>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Keep this key secret!</strong> Don&apos;t share it with anyone. 
              If you think your key has been compromised, contact support.
            </p>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h3 className="font-semibold mb-4">Account Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span>{user?.emailAddresses?.[0]?.emailAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">User ID</span>
              <span className="font-mono text-xs">{user?.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}