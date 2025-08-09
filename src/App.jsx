import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import WidgetPage from '@/pages/WidgetPage';
import WidgetInstructionsPage from '@/pages/WidgetInstructionsPage';
import StripeCancelPage from '@/pages/StripeCancelPage';
import WelcomePage from '@/pages/WelcomePage';
import CreateAccountPage from '@/pages/CreateAccountPage';
import HowToEmbedPage from '@/pages/HowToEmbedPage';
import AppDashboardPage from '@/pages/AppDashboardPage';
import OnboardingTrialPage from '@/pages/OnboardingTrialPage';
import TrialSignupPage from '@/pages/TrialSignupPage';
import AuthCallbackPage from '@/pages/AuthCallbackPage';
import WelcomeOnboardingPage from '@/pages/WelcomeOnboardingPage';
import { Toaster } from '@/components/ui/toaster';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/widget-instructions" element={<WidgetInstructionsPage />} />
        <Route path="/how-to-embed" element={<HowToEmbedPage />} />
        <Route path="/widget" element={<WidgetPage />} />
        <Route path="/payment-cancel" element={<StripeCancelPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/welcome-onboarding" element={<WelcomeOnboardingPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/app" element={
          <ProtectedRoute>
            <AppDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/start-trial" element={<OnboardingTrialPage />} />
        <Route path="/trial-signup" element={<TrialSignupPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;