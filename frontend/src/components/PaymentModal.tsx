// src/components/PaymentModal.tsx
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: number;
  propertyAddress: string;
  onPaymentSuccess: () => void;
}

const PaymentForm: React.FC<Omit<PaymentModalProps, 'isOpen'>> = ({
  onClose,
  propertyId,
  propertyAddress,
  onPaymentSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('5');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const suggestedAmounts = ['5', '10', '25', '50'];

  const handlePayment = async () => {
    const numAmount = parseFloat(amount);
    if (numAmount < 1) {
      setError('Minimum payment is $1.00');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // Create payment intent
      const response = await fetch('/api/payments/create-intent/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify({
          property_id: propertyId,
          amount: numAmount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      // Validate Stripe is loaded
      if (!stripe || !elements) {
        throw new Error('Stripe failed to load');
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Confirm payment with Stripe
      const { error: stripeError } = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      // Confirm payment on backend
      const confirmResponse = await fetch('/api/payments/confirm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify({
          payment_intent_id: data.payment_intent_id,
          property_id: propertyId,
        }),
      });

      if (!confirmResponse.ok) {
        const confirmData = await confirmResponse.json();
        throw new Error(confirmData.error || 'Payment confirmation failed');
      }

      onPaymentSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
      <div className="sp-overlay-content sp-payment-modal">
        <div className="sp-payment-modal-header">
          <h2>Support SellerPrep</h2>
          <button className="sp-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="sp-payment-modal-body">
          <div className="sp-property-info">
            <h3>Exporting: {propertyAddress}</h3>
            <p>Pay what you think this property report is worth to you</p>
          </div>
          
          <div className="sp-amount-section">
            <label htmlFor="amount">Amount (minimum $1.00)</label>
            <div className="sp-amount-input-container">
              <span className="sp-dollar-sign">$</span>
              <input
                id="amount"
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="sp-amount-input"
                placeholder="5.00"
              />
            </div>
          </div>
          
          <div className="sp-suggested-amounts">
            <p>Quick select:</p>
            <div className="sp-amount-buttons">
              {suggestedAmounts.map((suggAmount) => (
                <button
                  key={suggAmount}
                  className={`sp-amount-btn ${amount === suggAmount ? 'active' : ''}`}
                  onClick={() => setAmount(suggAmount)}
                >
                  ${suggAmount}
                </button>
              ))}
            </div>
          </div>
          
          <div className="sp-card-element-container">
            <label htmlFor="card-element">Card Details</label>
            <CardElement
              id="card-element"
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          
          <div className="sp-payment-info">
            <p>Your contribution helps us:</p>
            <ul>
              <li>Keep SellerPrep free to organize properties</li>
              <li>Improve features for agents and sellers</li>
              <li>Maintain secure, reliable service</li>
            </ul>
          </div>
          
          {error && (
            <div className="sp-payment-error">
              {error}
            </div>
          )}
          
          <div className="sp-payment-actions">
            <button
              className="sp-btn sp-btn-secondary"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              className="sp-btn sp-btn-primary"
              onClick={handlePayment}
              disabled={isProcessing || parseFloat(amount) < 1 || !stripe}
            >
              {isProcessing ? 'Processing...' : `Pay $${parseFloat(amount || '0').toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
  );
};

const PaymentModal: React.FC<PaymentModalProps> = (props) => {
  if (!props.isOpen) return null;

  return (
    <div className="sp-overlay">
      <Elements stripe={stripePromise}>
        <PaymentForm {...props} />
      </Elements>
    </div>
  );
};

export default PaymentModal;