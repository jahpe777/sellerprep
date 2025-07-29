// src/components/LandingPage.tsx
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="sp-landing">
      {/* Hero Section */}
      <section className="sp-hero">
        <div className="sp-hero-content">
          <h1 className="sp-hero-title">
            Organize Your Home's History,<br />
            <span className="sp-hero-highlight">Maximize Your Sale Value</span>
          </h1>
          <p className="sp-hero-subtitle">
            SellerPrep helps homeowners document repairs, upgrades, and maintenance 
            to create comprehensive property records that increase buyer confidence 
            and sale prices.
          </p>
          <div className="sp-hero-actions">
            <a href="/register" className="sp-hero-btn sp-hero-btn-primary">
              Start Organizing Free
            </a>
            <a href="#how-it-works" className="sp-hero-btn sp-hero-btn-secondary">
              See How It Works
            </a>
          </div>
        </div>
        <div className="sp-hero-visual">
          <div className="sp-hero-card">
            <div className="sp-hero-card-header">
              <div className="sp-hero-card-title">Kitchen Renovation</div>
              <div className="sp-hero-card-date">March 2024</div>
            </div>
            <div className="sp-hero-card-items">
              <div className="sp-hero-card-item">✓ New granite countertops</div>
              <div className="sp-hero-card-item">✓ Stainless steel appliances</div>
              <div className="sp-hero-card-item">✓ Custom cabinet hardware</div>
            </div>
            <div className="sp-hero-card-value">$15,000 investment</div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="sp-problem">
        <div className="sp-container">
          <h2 className="sp-section-title">
            Most Sellers Leave Money on the Table
          </h2>
          <div className="sp-problem-grid">
            <div className="sp-problem-item">
              <div className="sp-problem-icon">📋</div>
              <h3>Forgotten Improvements</h3>
              <p>Homeowners forget 40% of repairs and upgrades when listing their home</p>
            </div>
            <div className="sp-problem-item">
              <div className="sp-problem-icon">💸</div>
              <h3>Undervalued Properties</h3>
              <p>Without documentation, buyers assume the worst and offer less</p>
            </div>
            <div className="sp-problem-item">
              <div className="sp-problem-icon">⚠️</div>
              <h3>Legal Liability</h3>
              <p>Missing disclosure information can lead to post-sale disputes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="sp-solution" id="how-it-works">
        <div className="sp-container">
          <h2 className="sp-section-title">
            Your Complete Property Documentation System
          </h2>
          <div className="sp-features-grid">
            <div className="sp-feature">
              <div className="sp-feature-number">1</div>
              <div className="sp-feature-content">
                <h3>Organize by Room & System</h3>
                <p>Create sections for Kitchen, HVAC, Plumbing, and more. Upload photos, receipts, and warranty information in one place.</p>
              </div>
            </div>
            <div className="sp-feature">
              <div className="sp-feature-number">2</div>
              <div className="sp-feature-content">
                <h3>Track Repairs & Upgrades</h3>
                <p>Document every improvement with costs, dates, and contractor information. Build a complete timeline of your property's care.</p>
              </div>
            </div>
            <div className="sp-feature">
              <div className="sp-feature-number">3</div>
              <div className="sp-feature-content">
                <h3>Generate Professional Reports</h3>
                <p>Create polished PDF reports for agents and buyers that showcase your property's value and maintenance history.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="sp-benefits" id="benefits">
        <div className="sp-container">
          <h2 className="sp-section-title">
            Why Organized Sellers Get Better Offers
          </h2>
          <div className="sp-benefits-grid">
            <div className="sp-benefit">
              <div className="sp-benefit-stat">3-7%</div>
              <div className="sp-benefit-label">Higher Sale Price</div>
              <p>Well-documented homes sell for 3-7% more than comparable properties</p>
            </div>
            <div className="sp-benefit">
              <div className="sp-benefit-stat">15 Days</div>
              <div className="sp-benefit-label">Faster Sales</div>
              <p>Buyers feel confident making offers on properties with complete histories</p>
            </div>
            <div className="sp-benefit">
              <div className="sp-benefit-stat">90%</div>
              <div className="sp-benefit-label">Fewer Disputes</div>
              <p>Transparent documentation prevents post-sale legal issues</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="sp-cta">
        <div className="sp-container">
          <div className="sp-cta-content">
            <h2>Ready to Maximize Your Home's Value?</h2>
            <p>Join thousands of homeowners who've increased their sale prices with SellerPrep</p>
            <a href="/register" className="sp-cta-btn">
              Start Your Property Portfolio Free
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;