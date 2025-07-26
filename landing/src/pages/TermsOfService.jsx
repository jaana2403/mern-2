import React from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
  return (
    <div className="policy-page">
      <div className="policy-container">
        <header className="policy-header">
          <h1 className="policy-title">Terms of Service</h1>
        </header>

        <div className="policy-content">
          <section className="policy-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using EY Technological Solution's Business Continuity Management 
              Program services, you accept and agree to be bound by the terms and provision of 
              this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="policy-section">
            <h2>2. Description of Service</h2>
            <p>
              EY Technological Solution provides Business Continuity Management Program (BCMP) 
              services designed to help organizations prepare for, respond to, and recover from 
              business disruptions. Our services include:
            </p>
            <ul>
              <li>Risk assessment and business impact analysis</li>
              <li>Continuity strategy development</li>
              <li>Plan implementation and testing</li>
              <li>Training and awareness programs</li>
              <li>Ongoing maintenance and support</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. User Responsibilities</h2>
            <p>As a user of our services, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use our services in compliance with applicable laws and regulations</li>
              <li>Not misuse or attempt to gain unauthorized access to our systems</li>
              <li>Cooperate with reasonable requests for information or assistance</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>4. Intellectual Property Rights</h2>
            <p>
              All content, methodologies, frameworks, and materials provided by EY Technological 
              Solution are protected by intellectual property laws. You may not reproduce, 
              distribute, or create derivative works without explicit written permission.
            </p>
          </section>

          <section className="policy-section">
            <h2>5. Confidentiality</h2>
            <p>
              We understand the sensitive nature of business continuity planning. Both parties 
              agree to maintain strict confidentiality regarding all information shared during 
              the engagement, except as required by law or with explicit consent.
            </p>
          </section>

          <section className="policy-section">
            <h2>6. Limitation of Liability</h2>
            <p>
              EY Technological Solution shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages arising from your use of our services. Our total 
              liability shall not exceed the amount paid for the services in question.
            </p>
          </section>

          <section className="policy-section">
            <h2>7. Service Availability</h2>
            <p>
              While we strive to provide continuous service availability, we do not guarantee 
              uninterrupted access to our services. We may perform maintenance, updates, or 
              experience technical issues that temporarily affect service availability.
            </p>
          </section>

          <section className="policy-section">
            <h2>8. Termination</h2>
            <p>
              Either party may terminate the service agreement with appropriate notice as specified 
              in the individual service contract. Upon termination, certain provisions of these 
              terms shall survive, including confidentiality and intellectual property clauses.
            </p>
          </section>

          <section className="policy-section">
            <h2>9. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the 
              laws of the jurisdiction where EY Technological Solution is incorporated, without 
              regard to conflict of law principles.
            </p>
          </section>

          <section className="policy-section">
            <h2>10. Contact Information</h2>
            <p>
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong>Saraansh.Agarwal@in.ey.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong>EY Bangalore , INDIA</p>
            </div>
          </section>

          <section className="policy-section">
            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be 
              effective immediately upon posting to our website. Your continued use of our services 
              after any such changes constitutes acceptance of the new terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
