import React, { useState, useEffect } from 'react';
import { Search, X, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { TickerData, IndexData, CryptoForexData } from '../types/market';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  stocks: TickerData[];
  indices: IndexData[];
  cryptoForex: CryptoForexData[];
  onSelectInstrument: (symbol: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  stocks,
  indices,
  cryptoForex,
  onSelectInstrument,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Aggregate searchable items
  const allItems = [
    ...indices.map((idx) => ({
      symbol: idx.symbol,
      name: idx.name,
      type: 'Index',
      price: idx.price,
      change: idx.changePercent,
    })),
    ...stocks.map((stk) => ({
      symbol: stk.symbol,
      name: stk.name,
      type: 'Stock',
      price: stk.price,
      change: stk.changePercent,
    })),
    ...cryptoForex.map((cf) => ({
      symbol: cf.symbol,
      name: cf.pair,
      type: cf.type === 'crypto' ? 'Crypto' : 'Forex',
      price: cf.price,
      change: cf.changePercent,
    })),
  ];

  const filteredItems = allItems.filter((item) => {
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || item.type.toLowerCase() === activeCategory.toLowerCase();
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-[#1E222D] border border-[#2A2E39] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-3 border-b border-[#2A2E39] flex items-center gap-3 bg-[#171b26]">
          <Search className="w-5 h-5 text-[#2962FF]" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, company, crypto or forex..."
            className="w-full bg-transparent text-white placeholder-[#787B86] text-[15px] font-mono focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#787B86] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[11px] font-mono bg-[#2A2E39] text-[#D1D4DC] px-2 py-1 hover:bg-[#353945]"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-2 bg-[#131722] border-b border-[#2A2E39] overflow-x-auto text-[10px] font-mono">
          {['All', 'Stock', 'Crypto', 'Forex', 'Index'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#2962FF] text-white font-semibold'
                  : 'bg-[#1E222D] text-[#787B86] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-[#2A2E39] max-h-[400px]">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-[#787B86] font-mono text-[12px]">
              No instruments match &quot;{query}&quot;
            </div>
          ) : (
            filteredItems.map((item) => {
              const isPositive = item.change >= 0;
              return (
                <div
                  key={item.symbol}
                  onClick={() => {
                    onSelectInstrument(item.symbol);
                    onClose();
                  }}
                  className="p-3 flex items-center justify-between hover:bg-[#131722] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] px-1.5 py-0.5 bg-[#2A2E39] text-[#D1D4DC]">
                      {item.type}
                    </span>
                    <div>
                      <div className="font-headline font-bold text-white group-hover:text-[#2962FF] transition-colors">
                        {item.symbol}
                      </div>
                      <div className="font-mono text-[11px] text-[#787B86]">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-white font-semibold text-[13px] tabular-nums">
                      ${item.price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div
                      className={`text-[10px] font-bold tabular-nums ${
                        isPositive ? 'text-[#22AB94]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {item.change.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-[#171b26] border-t border-[#2A2E39] flex justify-between items-center text-[10px] font-mono text-[#787B86]">
          <span>Select symbol to launch Superchart</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
