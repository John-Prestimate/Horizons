import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = ({ handleSubscribe }) => {
  return (
    <nav className="fixed top-0 w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Prestimate</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="/#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            <Link to="/how-to-embed" className="text-gray-600 hover:text-gray-900 transition-colors">How to Embed</Link>
            <a href="https://prestimate-frontend.vercel.app/register" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">Dashboard</Button>
            </a>
            <Button onClick={() => handleSubscribe('trial')} className="hero-gradient text-white">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;