import React from 'react';
import { Search, Globe, User, TrendingUp, Sliders, Calendar } from 'lucide-react';

interface HeaderProps {
  currentView: 'markets' | 'superchart' | 'screener' | 'calendar';
  onViewChange: (view: 'markets' | 'superchart' | 'screener' | 'calendar') => void;
  onOpenSearch: () => void;
  onOpenPortfolio: () => void;
  portfolioBalance: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onOpenSearch,
  onOpenPortfolio,
  portfolioBalance,
}) => {
  return (
    <header className="w-full px-4 md:px-6 py-3 flex items-center justify-between border-b border-[#2A2E39] bg-[#0f131e] sticky top-0 z-50">
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Logo */}
        <button
          onClick={() => onViewChange('markets')}
          className="flex items-center gap-2 group cursor-pointer text-left"
          title="Back to Markets Home"
        >
          <svg
            className="w-8 h-8 fill-white group-hover:text-[#2962FF] transition-colors"
            fill="none"
            viewBox="0 0 36 28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 22H7V6h7v16zm15-16h-7v10h7V6zm-7 12h-7v4h7v-4z"
              fill="currentColor"
            />
          </svg>
          <span className="text-[18px] font-bold text-white tracking-tight font-headline">
            TradingView
          </span>
        </button>

        {/* Search Bar Button */}
        <div className="relative hidden sm:flex items-center">
          <button
            onClick={onOpenSearch}
            className="flex items-center bg-[#1E222D] border border-[#2A2E39] px-3 py-1.5 gap-2 w-64 text-[#787B86] hover:border-[#2962FF] hover:text-[#D1D4DC] transition-colors duration-150 cursor-pointer text-left"
          >
            <Search className="w-4 h-4 text-[#787B86] shrink-0" />
            <span className="text-[12px] font-mono text-[#787B86] flex-1">
              Search (Ctrl+K)
            </span>
            <kbd className="hidden lg:inline text-[9px] bg-[#2A2E39] text-[#D1D4DC] px-1 py-0.5 font-mono">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5">
          <button
            onClick={() => onViewChange('superchart')}
            className={`font-mono text-[12px] transition-colors pb-0.5 cursor-pointer flex items-center gap-1 ${
              currentView === 'superchart'
                ? 'text-[#2962FF] font-semibold border-b-2 border-[#2962FF]'
                : 'text-[#D1D4DC] hover:text-white font-medium'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Supercharts
          </button>
          <button
            onClick={() => onViewChange('screener')}
            className={`font-mono text-[12px] transition-colors pb-0.5 cursor-pointer flex items-center gap-1 ${
              currentView === 'screener'
                ? 'text-[#2962FF] font-semibold border-b-2 border-[#2962FF]'
                : 'text-[#D1D4DC] hover:text-white font-medium'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Screeners
          </button>
          <button
            onClick={() => onViewChange('markets')}
            className={`font-mono text-[12px] transition-colors pb-0.5 cursor-pointer ${
              currentView === 'markets'
                ? 'text-[#2962FF] font-semibold border-b-2 border-[#2962FF]'
                : 'text-[#D1D4DC] hover:text-white font-medium'
            }`}
          >
            Markets
          </button>
          <button
            onClick={() => onViewChange('calendar')}
            className={`font-mono text-[12px] transition-colors pb-0.5 cursor-pointer flex items-center gap-1 ${
              currentView === 'calendar'
                ? 'text-[#2962FF] font-semibold border-b-2 border-[#2962FF]'
                : 'text-[#D1D4DC] hover:text-white font-medium'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Calendars
          </button>
          <span className="text-[#787B86] text-[12px] font-mono cursor-not-allowed hover:text-[#D1D4DC]">
            Brokers
          </span>
          <span className="text-[#787B86] text-[12px] font-mono cursor-not-allowed hover:text-[#D1D4DC]">
            Community
          </span>
        </nav>
      </div>

      {/* Trailing Actions */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={onOpenSearch}
          className="sm:hidden p-2 text-[#D1D4DC] hover:text-white bg-[#1E222D] border border-[#2A2E39]"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        <button
          className="flex items-center gap-1 text-[#D1D4DC] hover:text-white font-mono text-[12px] px-2 py-1 hover:bg-[#1E222D] border border-transparent hover:border-[#2A2E39] cursor-pointer"
          title="Language: English (US)"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>EN</span>
        </button>

        <button
          onClick={onOpenPortfolio}
          className="p-1.5 text-[#D1D4DC] hover:text-white hover:bg-[#1E222D] border border-transparent hover:border-[#2A2E39] flex items-center justify-center cursor-pointer"
          title="Account & Paper Portfolio"
        >
          <User className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenPortfolio}
          className="bg-[#2962FF] text-white font-mono text-[12px] font-semibold px-3 md:px-4 py-2 hover:bg-blue-600 active:opacity-90 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <span>Get started</span>
          <span className="hidden sm:inline opacity-75 text-[10px]">
            (${portfolioBalance.toLocaleString()})
          </span>
        </button>
      </div>
    </header>
  );
};
