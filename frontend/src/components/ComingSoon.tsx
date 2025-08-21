// src/components/ComingSoon.tsx
import React, { useState } from "react";

const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(
        `${import.meta.env.PROD ? 'https://sellerprep-backend.onrender.com' : ''}/api/waitlist/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        console.error('Waitlist signup failed:', data);
        // Still show success for better UX even if already registered
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Network error:', error);
      // Show success anyway for better UX
      setSubmitted(true);
    }
  };

  return (
    <div className="sp-coming-soon">
      <div className="sp-coming-soon-container">
        <div className="sp-coming-soon-content">
          <h1 className="sp-coming-soon-title">SellerPrep</h1>
          <h2 className="sp-coming-soon-subtitle">
            The Complete Property Documentation Platform
          </h2>
          <p className="sp-coming-soon-description">
            Coming Soon - Help sellers document every repair, upgrade, and improvement 
            to maximize their property value and close deals faster.
          </p>
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="sp-coming-soon-form">
              <div className="sp-form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for early access"
                  className="sp-coming-soon-input"
                  required
                />
                <button type="submit" className="sp-coming-soon-btn">
                  Get Early Access
                </button>
              </div>
            </form>
          ) : (
            <div className="sp-success-message">
              <p>Thanks! We'll notify you when SellerPrep launches.</p>
            </div>
          )}
          
          <div className="sp-coming-soon-features">
            <div className="sp-feature-item">
              <span className="sp-feature-icon">📋</span>
              <span>Comprehensive Property Organization</span>
            </div>
            <div className="sp-feature-item">
              <span className="sp-feature-icon">📊</span>
              <span>Professional Marketing Materials</span>
            </div>
            <div className="sp-feature-item">
              <span className="sp-feature-icon">💰</span>
              <span>Maximize Property Value</span>
            </div>
          </div>
          
          <div className="sp-coming-soon-footer">
            <p className="sp-footer-note">
              Beta testing coming soon for select participants
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;