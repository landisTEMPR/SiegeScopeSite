'use client'

import { PricingTable } from '@clerk/nextjs'

export default function PricingPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose your plan</h1>
          <p className="text-gray-600">Simple, transparent pricing</p>
        </div>
        
        <PricingTable />
      </div>
    </div>
  )
}