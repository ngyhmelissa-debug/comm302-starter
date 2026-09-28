import React from 'react';

interface FooterProps {
  onNavigate: (view: 'markets' | 'superchart' | 'screener' | 'calendar') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full px-4 md:px-6 py-8 border-t border-[#2A2E39] bg-[#0a0e19]">
      {/* Footer Navigation Columns */}
      <div className="max-w-[1720px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pb-8 border-b border-[#2A2E39]">
        <div>
          <h4 className="font-headline font-bold text-white mb-3 text-[15px]">
            Products
          </h4>
          <ul className="space-y-2 font-mono text-[9px] text-[#787B86]">
            <li>
              <button
                onClick={() => onNavigate('superchart')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Supercharts
              </button>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Pine Script®
              </span>
            </li>
            <li>
              <button
                onClick={() => onNavigate('screener')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Stock Screener
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('screener')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                ETF Screener
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('screener')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Crypto Screener
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('screener')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Forex Screener
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold text-white mb-3 text-[15px]">
            Markets
          </h4>
          <ul className="space-y-2 font-mono text-[9px] text-[#787B86]">
            <li>
              <button
                onClick={() => onNavigate('markets')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Indices
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('screener')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                US Stocks
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('markets')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                World Stocks
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('markets')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Crypto
              </button>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Futures
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Bonds
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold text-white mb-3 text-[15px]">
            Community
          </h4>
          <ul className="space-y-2 font-mono text-[9px] text-[#787B86]">
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Trading Ideas
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Educational Scripts
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Pine Wizards
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                House Rules
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Moderators
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold text-white mb-3 text-[15px]">
            Calendars
          </h4>
          <ul className="space-y-2 font-mono text-[9px] text-[#787B86]">
            <li>
              <button
                onClick={() => onNavigate('calendar')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Economic Calendar
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('calendar')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                Earnings Calendar
              </button>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Dividend Calendar
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                IPO Calendar
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold text-white mb-3 text-[15px]">
            Company
          </h4>
          <ul className="space-y-2 font-mono text-[9px] text-[#787B86]">
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                About Us
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Careers
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Blog
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Media Kit
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Security
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold text-white mb-3 text-[15px]">
            Business Solutions
          </h4>
          <ul className="space-y-2 font-mono text-[9px] text-[#787B86]">
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Widgets
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Charting Libraries
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Lightweight Charts™
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Brokerage Integration
              </span>
            </li>
            <li>
              <span className="hover:text-white transition-colors cursor-pointer">
                Partner Program
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Row: Copyright & Social Shell */}
      <div className="max-w-[1720px] mx-auto pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[#787B86] font-mono text-[9px]">
        <div className="flex items-center gap-3">
          <span className="font-headline font-bold text-white text-[15px]">
            TradingView
          </span>
          <span>© 2025 TradingView, Inc. All rights reserved.</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[#787B86]">
          <button
            onClick={() => onNavigate('markets')}
            className="hover:text-[#D1D4DC] transition-colors cursor-pointer"
          >
            Markets
          </button>
          <button
            onClick={() => onNavigate('screener')}
            className="hover:text-[#D1D4DC] transition-colors cursor-pointer"
          >
            Screeners
          </button>
          <span className="hover:text-[#D1D4DC] transition-colors cursor-pointer">
            Community
          </span>
          <span className="hover:text-[#D1D4DC] transition-colors cursor-pointer">
            Pricing
          </span>
          <span className="hover:text-[#D1D4DC] transition-colors cursor-pointer">
            Terms of service
          </span>
          <span className="hover:text-[#D1D4DC] transition-colors cursor-pointer">
            Privacy policy
          </span>
        </div>

        <div className="text-right text-[10px] text-[#787B86]">
          Select market data provided by ICE Data Services.
        </div>
      </div>
    </footer>
  );
};
