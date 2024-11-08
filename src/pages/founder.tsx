import Layout from '@theme/Layout';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Founder() {
  const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig;

  // Stripe initialization
  const stripePromise = customFields.REACT_APP_STRIPE_PUBLISHABLE_KEY
    ? loadStripe(String(customFields.REACT_APP_STRIPE_PUBLISHABLE_KEY))
    : null;

  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState('usd'); // Default currency
  const [username, setUsername] = useState(''); // Username input state

  // Prices for different currencies
  const prices = {
    usd: 10, // Price in USD
    eur: 9, // Price in EUR
    gbp: 8, // Price in GBP
    aud: 15, // Price in AUD
    mxn: 200, // Price in MXN
  };

  const handlePurchase = async () => {
    if (!username.trim()) {
      alert('Username is required.');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${customFields.REACT_APP_BACKEND_URL}/founders/checkout/${username}/${currency}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe initialization failed');
      }

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Become a Founder">
      <main className="py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">Become a Founder</h1>
          <p className="text-center text-lg mb-12">
            Want to ramp up your operation whilst supporting development and server costs? Become a founder!
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Package */}
            <div className="bg-[#181E25] bg-opacity-30 rounded-lg shadow p-6 relative pb-16">
              <h2 className="text-2xl font-semibold mb-4">Free Package</h2>
              <ul className="list-disc ml-6 mb-4">
                <li>Settle up to <strong>2 colonies</strong></li>
                <li>Up to <strong>10 pilgrims</strong></li>
                <li><strong>30 inventory slots</strong></li>
                <li>Praying gives <strong>400 faith</strong> every 24 hours</li>
              </ul>
              <p className="text-gray-500">Already included for all users.</p>
              <button
                className="btn btn-outline border-orange-500 text-orange-500 opacity-50 cursor-not-allowed absolute bottom-4 left-4"
                disabled
              >
                Already Owned
              </button>
            </div>

            {/* Founder’s Package */}
            <div className="bg-[#181E25] bg-opacity-30 rounded-lg shadow p-6 relative pb-16">
              {/* Currency Selection */}
              <div className="absolute top-4 right-4">
                <label htmlFor="currency" className="block text-sm font-semibold mb-1">
                  Currency
                </label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-500 w-40"
                >
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="gbp">GBP</option>
                  <option value="aud">AUD</option>
                  <option value="mxn">MXN</option>
                </select>
              </div>

              <h2 className="text-2xl font-semibold mb-4">Founder’s Package</h2>
              <ul className="list-disc ml-6 mb-4">
                <li>Exclusive <strong>Founder Title</strong></li>
                <li>Settle up to <strong>5 colonies</strong></li>
                <li>Up to <strong>50 pilgrims</strong></li>
                <li><strong>100 inventory slots</strong></li>
                <li>Praying gives <strong>1000 faith</strong> every 24 hours</li>
              </ul>
              <hr />
              {/* Username Input */}
              <div className="mb-4">
                <label htmlFor="username" className="block text-lg font-semibold mb-2">
                  Enter Your Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-500"
                  required
                />
              </div>

              <p className="text-gray-500 mb-6">
                One-time purchase to unlock these features.
                <br />
                <strong>Price: {prices[currency]} {currency.toUpperCase()}</strong>
              </p>
              <button
                onClick={handlePurchase}
                disabled={isLoading}
                className={`btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-[#1c232b] absolute bottom-4 left-4 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Processing...' : 'Purchase'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
