import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, apiKey } = body

    if (!userId || !apiKey) {
      return NextResponse.json(
        { valid: false, error: 'Missing userId or apiKey' },
        { status: 400 }
      )
    }

    // Verify API key format
    if (!apiKey.startsWith('ss_')) {
      return NextResponse.json(
        { valid: false, error: 'Invalid API key format' },
        { status: 400 }
      )
    }

    // Decode and verify the API key matches the user ID
    const encoded = apiKey.slice(3)
    let decoded: string
    try {
      const padded = encoded + '='.repeat((4 - (encoded.length % 4)) % 4)
      decoded = Buffer.from(padded, 'base64').toString('utf-8')
    } catch {
      return NextResponse.json(
        { valid: false, error: 'Invalid API key' },
        { status: 400 }
      )
    }

    if (decoded !== userId) {
      return NextResponse.json(
        { valid: false, error: 'API key mismatch' },
        { status: 400 }
      )
    }

    // Fetch user from Clerk
    const userResponse = await fetch(
      `https://api.clerk.com/v1/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!userResponse.ok) {
      return NextResponse.json(
        { valid: false, error: 'User not found' },
        { status: 404 }
      )
    }

    const user = await userResponse.json()

    // Check subscription via Clerk Commerce API
    let hasActiveSubscription = false

    try {
      const subsResponse = await fetch(
        `https://api.clerk.com/v1/commerce/subscriptions?user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          },
        }
      )

      if (subsResponse.ok) {
        const subsData = await subsResponse.json()
        
        if (subsData.data && subsData.data.length > 0) {
          hasActiveSubscription = subsData.data.some(
            (sub: { status: string }) => sub.status === 'active'
          )
        }
      }
    } catch (e) {
      console.error('Error checking subscriptions:', e)
    }

    return NextResponse.json({
      valid: hasActiveSubscription,
      user: {
        id: user.id,
        email: user.email_addresses?.[0]?.email_address || '',
        firstName: user.first_name || '',
      },
    })

  } catch (error) {
    console.error('Subscription verification error:', error)
    return NextResponse.json(
      { valid: false, error: 'Verification failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', endpoint: 'verify-subscription' })
}