'use client'

import { useUser, useAuth } from '@clerk/nextjs'
import { Download, Monitor, CheckCircle, FileText, MessageCircle, Lock, Key, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Replace FILE_ID with your actual Google Drive file IDs
const DOWNLOADS = {
  windows: 'https://drive.google.com/uc?export=download&id=YOUR_WINDOWS_FILE_ID',
  linux: 'https://drive.google.com/uc?export=download&id=YOUR_LINUX_FILE_ID',
}

function LockedState() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-3">This tool is currently in private testing</h2>
        <p className="text-gray-600 mb-8">
          We're preparing for a full release and are inviting early testers to join. Sign up and be among the first to try it out! We'll notify you as soon as your testing access is approved.

        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl hover:opacity-90 transition font-medium text-lg"
        >
        [Join the Early Access List]
        </Link>
        <p className="text-sm text-gray-400 mt-4">
        You'll receive an email within a day or two with the next steps.
        </p>
      </div>
    </div>
  )
}

interface UserType {
  id: string
  firstName?: string | null
}

function ApiKeySection({ user }: { user: UserType | null | undefined }) {
  const [copied, setCopied] = useState(false)
  const [showKey, setShowKey] = useState(false)

  // Generate API key from user ID
  const apiKey = user?.id 
    ? `ss_${Buffer.from(user.id).toString('base64').replace(/=/g, '')}` 
    : ''

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
          <Key className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Your API Key</h2>
          <p className="text-gray-500 text-sm">Use this to activate SiegeScope on your computer</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between gap-4">
          <code className="text-sm font-mono text-gray-800 break-all flex-1">
            {showKey ? apiKey : '••••••••••••••••••••••••••••••••'}
          </code>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setShowKey(!showKey)}
              className="p-2 hover:bg-gray-200 rounded-lg transition text-sm text-gray-600"
            >
              {showKey ? 'Hide' : 'Show'}
            </button>
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-gray-200 rounded-lg transition"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Keep this key secret!</strong> Don&apos;t share it with anyone. 
          This key is tied to your subscription and is required to use SiegeScope.
        </p>
      </div>
    </div>
  )
}

function DownloadContent({ user }: { user: UserType | null | undefined }) {
  return (
    <>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Welcome, {user?.firstName || 'Operator'}! 🎯
        </h1>
        <p className="text-xl text-gray-600">
          Download SiegeScope and start analyzing your matches
        </p>
      </div>

      {/* API Key Section */}
      <ApiKeySection user={user} />

      {/* Download Cards */}
      <div className="grid md:mb-12">
        {/* Windows */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border-2 border-transparent hover:border-orange-500 transition">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <Monitor className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Windows</h2>
              <p className="text-gray-500 text-sm">Windows 10/11 (64-bit)</p>
            </div>
          </div>
          
          <a 
            href={DOWNLOADS.windows}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-4 rounded-xl hover:opacity-90 transition font-medium text-lg"
          >
            <Download className="w-5 h-5" />
            Download for Windows
          </a>
          
          <p className="text-center text-sm text-gray-400 mt-4">
            v1.0.0 • .exe installer
          </p>
        </div>
      </div>

      {/* Installation Steps */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-12 mt-12">
        <h2 className="text-xl font-bold mb-6">Quick Setup</h2>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold text-sm">1</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Download & Install</h3>
              <p className="text-gray-600">Download the installer for your operating system and run it.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold text-sm">2</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Activate with API Key</h3>
              <p className="text-gray-600">
                Copy your API key above, open SiegeScope, and paste it in the activation screen.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold text-sm">3</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Set Your Replay Folder</h3>
              <p className="text-gray-600">
                Point SiegeScope to your R6 replay folder. Default location:
              </p>
              <code className="text-sm bg-gray-100 px-3 py-1 rounded mt-2 inline-block text-gray-700">
                %USERPROFILE%\Documents\My Games\Rainbow Six - Siege\...
              </code>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold text-sm">4</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Play & Analyze</h3>
              <p className="text-gray-600">
                SiegeScope automatically parses new matches. View stats instantly after each game.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Reminder */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white mb-12">
        <h2 className="text-xl font-bold mb-6">What&apos;s Included</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span>K/D, HS%, Entry stats</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span>Round-by-round breakdown</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span>Operator picks</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span>Player & team stats</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span>100% local & private</span>
          </div>
        </div>
      </div>

      {/* Help Links */}
      <div className="grid md:grid-cols-2 gap-6">
        <a href="#" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold">Documentation</h3>
            <p className="text-gray-500 text-sm">Setup guides & tutorials</p>
          </div>
        </a>

        <a href="#" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold">Discord Community</h3>
            <p className="text-gray-500 text-sm">Get help & share feedback</p>
          </div>
        </a>
      </div>
    </>
  )
}

function LoadingState() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500">Checking subscription...</p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user } = useUser()
  const { has, isLoaded } = useAuth()
  const [hasPro, setHasPro] = useState<boolean | null>(null)

  useEffect(() => {
    const checkSubscription = async () => {
      if (isLoaded && has) {
        const hasProPlan = await has({ plan: 'pro_user' })
        const hasProFeature = await has({ feature: 'pro_user' })
        
        console.log('Has pro plan:', hasProPlan)
        console.log('Has pro feature:', hasProFeature)
        
        setHasPro(hasProPlan || hasProFeature)
      }
    }
    
    checkSubscription()
  }, [has, isLoaded])

  if (!isLoaded || hasPro === null) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <LoadingState />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {hasPro ? (
          <DownloadContent user={user} />
        ) : (
          <LockedState />
        )}
      </div>
    </div>
  )
}