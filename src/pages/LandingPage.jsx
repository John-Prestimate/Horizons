import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PricingSection from '@/components/landing/PricingSection';
import HowItWorksSection from '@/components/landing/FaqSection';
import CtaSection from '@/components/landing/CtaSection';
import Footer from '@/components/landing/Footer';

const planIdToPaymentLink = {
  basic: 'https://buy.stripe.com/9B6bIUaPK7VH18wdOs6wE02',
  pro: 'https://buy.stripe.com/9B6cMYaPKdg1g3qfWA6wE03',
};

function LandingPage() {
  const navigate = useNavigate();

  const handleSubscribe = (planId) => {
    if (planId === 'trial') {
      navigate('/trial-signup');
      return;
    }

    const paymentLink = planIdToPaymentLink[planId];
    if (paymentLink) {
      window.location.href = paymentLink;
    } else {
      console.error('Invalid planId:', planId);
    }
  };

  return (
    <>
      <Helmet>
        <title>Prestimate - AI Estimator for Service Businesses</title>
        <meta name="description" content="Generate instant, accurate estimates for pressure washing, lawncare, landscaping, and more. Capture leads and grow your business with Prestimate." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation handleSubscribe={handleSubscribe} />
        <main>
          <HeroSection handleSubscribe={handleSubscribe} />
          <FeaturesSection />
          <PricingSection handleSubscribe={handleSubscribe} />
          <HowItWorksSection />
          <CtaSection handleSubscribe={handleSubscribe} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;