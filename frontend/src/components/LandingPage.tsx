// src/components/LandingPage.tsx
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="sp-landing">
      {/* Hero Section */}
      <section className="sp-hero">
        <div className="sp-hero-content">
          <h1 className="sp-hero-title">
The Complete Property Documentation Platform<br />
            <span className="sp-hero-highlight">For Agents & Sellers</span>
          </h1>
          <p className="sp-hero-subtitle">
Empower your listings with complete property histories. SellerPrep helps real estate professionals and their seller clients document every repair, upgrade, and improvement to justify higher prices and close deals faster.
          </p>
          <div className="sp-hero-actions">
            <a href="/app/register" className="sp-hero-btn sp-hero-btn-primary">
Start Your First Property
            </a>
            <a href="#how-it-works" className="sp-hero-btn sp-hero-btn-secondary">
See How Agents Use It
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
            Streamline Your Listing with Complete Property Records
          </h2>
          <div className="sp-features-grid">
            <div className="sp-feature">
              <div className="sp-feature-number">1</div>
              <div className="sp-feature-content">
                <h3>Comprehensive Property Organization</h3>
                <p>Help your clients organize repairs, upgrades, and maintenance by room and system. Perfect for pre-listing preparation and MLS enhancement.</p>
              </div>
            </div>
            <div className="sp-feature">
              <div className="sp-feature-number">2</div>
              <div className="sp-feature-content">
                <h3>Document Value-Add Improvements</h3>
                <p>Create a detailed record of every repair and upgrade with receipts, warranties, and contractor details. Show buyers exactly what they're getting.</p>
              </div>
            </div>
            <div className="sp-feature">
              <div className="sp-feature-number">3</div>
              <div className="sp-feature-content">
                <h3>Professional Marketing Materials</h3>
                <p>Generate branded PDF reports to share with potential buyers, showcase in listings, and support higher asking prices with documented improvements.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="sp-benefits" id="benefits">
        <div className="sp-container">
          <h2 className="sp-section-title">
            Why Agents & Sellers Choose SellerPrep
          </h2>
          <div className="sp-benefits-grid">
            <div className="sp-benefit">
              <div className="sp-benefit-stat">3-7%</div>
              <div className="sp-benefit-label">Higher Sale Price</div>
              <p>Documented improvements justify higher listing prices and give buyers confidence to offer more</p>
            </div>
            <div className="sp-benefit">
              <div className="sp-benefit-stat">40%</div>
              <div className="sp-benefit-label">Faster Negotiations</div>
              <p>Reduce back-and-forth during due diligence. Buyers and agents have all the information they need upfront</p>
            </div>
            <div className="sp-benefit">
              <div className="sp-benefit-stat">85%</div>
              <div className="sp-benefit-label">Smoother Closings</div>
              <p>Complete disclosure documentation reduces inspection surprises and post-sale disputes for agents and clients</p>
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
            <a href="/app/register" className="sp-cta-btn">
              Start Your Property Portfolio Free
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;