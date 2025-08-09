import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 hero-gradient rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Prestimate</span>
            </div>
            <p className="text-gray-400">
              The #1 AI estimator for pressure washing businesses.
            </p>
          </div>
          
          <div>
            <span className="font-semibold mb-4 block">Product</span>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/#features" className="hover:text-white">Features</a></li>
              <li><a href="/#pricing" className="hover:text-white">Pricing</a></li>
              <li><Link to="/app" className="hover:text-white">Dashboard</Link></li>
              <li><Link to="/how-to-embed" className="hover:text-white">How to Embed</Link></li>
            </ul>
          </div>
          
          <div>
            <span className="font-semibold mb-4 block">Resources</span>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#faq" className="hover:text-white">Help Center</a></li>
              <li><a href="mailto:support@prestimate.io" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <span className="font-semibold mb-4 block">Legal</span>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Prestimate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;