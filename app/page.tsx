'use client'

import Link from 'next/link'
import { SignUpButton, useUser } from '@clerk/nextjs'
import { ArrowRight, Zap, Shield, Clock, Target, Users, BarChart3 } from 'lucide-react'

export default function Home() {
  const { isSignedIn } = useUser()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span>Currently in Development</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Stop watching VODs.
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"> Start winning.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            SiegeScope automatically parses your R6 match replays and delivers instant stats—K/D, entry frags, operator performance, and more. Built for competitive players and coaches who need data, not hours of VOD review.
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {isSignedIn ? (
              <Link 
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg hover:opacity-90 transition text-lg font-medium"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <SignUpButton mode="modal">
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg hover:opacity-90 transition text-lg font-medium">
                  Join the Waitlist
                  <ArrowRight className="w-5 h-5" />
                </button>
              </SignUpButton>
            )}
            <Link 
              href="/pricing"
              className="inline-flex items-center gap-2 border border-gray-300 px-8 py-4 rounded-lg hover:bg-gray-50 transition text-lg font-medium"
            >
              View Pricing
            </Link>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-sm text-gray-500">
            Trusted by pro players and competitive teams
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gray-900 text-white px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-orange-500">10+</div>
            <div className="text-gray-400 text-sm mt-1">Stats Tracked</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500">100%</div>
            <div className="text-gray-400 text-sm mt-1">Local & Private</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500">Hours</div>
            <div className="text-gray-400 text-sm mt-1">Saved Per Week</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-500">Auto</div>
            <div className="text-gray-400 text-sm mt-1">Replay Parsing</div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">VOD review is killing your prep time</h2>
            <p className="text-gray-600 text-lg">
              Coaches and analysts spend hours scrubbing through replays just to pull basic stats. 
              SiegeScope does it in seconds—automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
              <h3 className="font-semibold text-red-800 mb-4">❌ Without SiegeScope</h3>
              <ul className="space-y-3 text-red-700">
                <li>• Hours watching match replays manually</li>
                <li>• Spreadsheets to track player stats</li>
                <li>• Missing key data points</li>
                <li>• No time for actual strategy work</li>
              </ul>
            </div>

            {/* After */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-8">
              <h3 className="font-semibold text-green-800 mb-4">✓ With SiegeScope</h3>
              <ul className="space-y-3 text-green-700">
                <li>• Instant stats from every match</li>
                <li>• Auto-parsing when replays are created</li>
                <li>• Complete data: entries, trades, HS%</li>
                <li>• Focus on coaching, not data entry</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to analyze matches</h2>
            <p className="text-gray-600">Comprehensive stats pulled directly from .rec files</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Combat Stats</h3>
              <p className="text-gray-600">
                K/D, headshot percentage, entry kills, entry deaths, opening duels, and trade kills—all tracked automatically.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Player & Operator Data</h3>
              <p className="text-gray-600">
                Track performance by player and operator. See who's fragging, who's getting picked first, and operator win rates.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Round-by-Round Breakdown</h3>
              <p className="text-gray-600">
                Full kill feed, site played, attack/defense splits, and win conditions for every round.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automatic Parsing</h3>
              <p className="text-gray-600">
                Point SiegeScope at your replay folder. New matches are parsed automatically—zero manual work.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Local & Private</h3>
              <p className="text-gray-600">
                Your data never leaves your machine. No cloud uploads, no accounts required for core features.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Hours Every Week</h3>
              <p className="text-gray-600">
                What used to take hours of VOD review now takes seconds. Get back to what matters—winning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial/Use Case */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Built for the competitive scene</h2>
            <p className="text-xl opacity-90 mb-8">
              Whether you're a coach prepping for match day, an analyst building reports, or a player grinding ranked—SiegeScope gives you the data edge.
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap text-sm opacity-80">
              <span>✓ Pro Teams</span>
              <span>✓ Collegiate</span>
              <span>✓ Competitive Ranked</span>
              <span>✓ Content Creators</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to level up your analysis?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join the waitlist and be first to access SiegeScope when we launch.
          </p>
          
          {isSignedIn ? (
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg hover:opacity-90 transition text-lg font-medium"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <SignUpButton mode="modal">
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg hover:opacity-90 transition text-lg font-medium">
                Join the Waitlist
                <ArrowRight className="w-5 h-5" />
              </button>
            </SignUpButton>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          © 2025 SiegeScope. All rights reserved.
        </div>
      </footer>
    </div>
  )
}