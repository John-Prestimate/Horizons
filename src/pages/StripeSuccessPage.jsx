import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StripeSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // This page is deprecated in favor of the /welcome page flow.
    // Redirect immediately to the new welcome page.
    navigate('/welcome', { replace: true });
  }, [navigate]);

  return null; // Render nothing as we are redirecting
};

export default StripeSuccessPage;