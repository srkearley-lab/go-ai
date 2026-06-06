const Stripe = require('stripe')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const { packageId, packageName, amount } = req.body

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: packageName || 'GO AI Website Package' },
            unit_amount: amount || 75000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/new`,
      metadata: { packageId: packageId || '' },
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
