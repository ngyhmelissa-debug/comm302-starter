import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { TickerData } from '../types/market';

interface TrendingStocksTableProps {
  stocks: TickerData[];
  onSelectStock: (symbol: string) => void;
  onOpenScreener: () => void;
  flashingSymbols?: Record<string, 'up' | 'down'>;
}

export const TrendingStocksTable: React.FC<TrendingStocksTableProps> = ({
  stocks,
  onSelectStock,
  onOpenScreener,
  flashingSymbols = {},
}) => {
  const [activeFilter, setActiveFilter] = useState<
    'Most active' | 'Gainers' | 'Losers' | 'High volume' | 'Large cap'
  >('Most active');

  // Filter or sort stocks based on the active tab
  const getFilteredStocks = () => {
    const list = [...stocks];
    if (activeFilter === 'Gainers') {
      return list.sort((a, b) => b.changePercent - a.changePercent).slice(0, 6);
    }
    if (activeFilter === 'Losers') {
      return list.sort((a, b) => a.changePercent - b.changePercent).slice(0, 6);
    }
    if (activeFilter === 'High volume') {
      return list
        .sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume))
        .slice(0, 6);
    }
    if (activeFilter === 'Large cap') {
      return list
        .sort((a, b) => {
          const capA = a.marketCap.includes('T')
            ? parseFloat(a.marketCap) * 1000
            : parseFloat(a.marketCap);
          const capB = b.marketCap.includes('T')
            ? parseFloat(b.marketCap) * 1000
            : parseFloat(b.marketCap);
          return capB - capA;
        })
        .slice(0, 6);
    }
    // Default: Most active
    return list.slice(0, 6);
  };

  const displayedStocks = getFilteredStocks();
  const filters: Array<'Most active' | 'Gainers' | 'Losers' | 'High volume' | 'Large cap'> = [
    'Most active',
    'Gainers',
    'Losers',
    'High volume',
    'Large cap',
  ];

  return (
    <div className="bg-[#1E222D] border border-[#2A2E39]">
      {/* Header Panel */}
      <div className="p-3 border-b border-[#2A2E39] flex flex-wrap items-center justify-between gap-3 bg-[#171b26]">
        <div className="flex items-center gap-2">
          <span className="text-[18px] font-semibold text-white font-headline">
            Trending US Stocks
          </span>
          <span className="font-mono text-[9px] bg-[#2A2E39] text-[#D1D4DC] px-2 py-0.5">
            NASDAQ/NYSE
          </span>
        </div>

        {/* Segmented Control Filters */}
        <div className="flex items-center border border-[#2A2E39] bg-[#131722] text-[11px] font-mono overflow-x-auto max-w-full">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-2.5 py-1 whitespace-nowrap transition-colors cursor-pointer ${
                activeFilter === f
                  ? 'bg-[#1E222D] text-white font-semibold border-b-2 border-[#2962FF]'
                  : 'text-[#787B86] hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* High-density Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#2A2E39] font-mono text-[9px] text-[#787B86] uppercase tracking-wider">
              <th className="py-2.5 px-4 font-normal">Symbol</th>
              <th className="py-2.5 px-3 font-normal text-right">Last Price</th>
              <th className="py-2.5 px-3 font-normal text-right">Change %</th>
              <th className="py-2.5 px-3 font-normal text-right">Change $</th>
              <th className="py-2.5 px-3 font-normal text-right">Volume</th>
              <th className="py-2.5 px-4 font-normal text-right">Mkt Cap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2E39] font-mono text-[14px] text-[#D1D4DC]">
            {displayedStocks.map((stock) => {
              const isPositive = stock.change >= 0;
              const flash = flashingSymbols[stock.symbol];
              return (
                <tr
                  key={stock.symbol}
                  onClick={() => onSelectStock(stock.symbol)}
                  className={`hover:bg-[#131722] transition-colors group cursor-pointer ${
                    flash === 'up'
                      ? 'flash-up'
                      : flash === 'down'
                      ? 'flash-down'
                      : ''
                  }`}
                >
                  <td className="py-3 px-4 flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        isPositive ? 'bg-[#22AB94]' : 'bg-[#F23645]'
                      }`}
                    />
                    <div>
                      <div className="font-headline font-bold text-white group-hover:text-[#2962FF] transition-colors leading-tight">
                        {stock.symbol}
                      </div>
                      <div className="font-mono text-[11px] text-[#787B86]">
                        {stock.name}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right text-white font-semibold tabular-nums">
                    ${stock.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold inline-block tabular-nums ${
                        isPositive
                          ? 'bg-[#22AB94] text-[#131722]'
                          : 'bg-[#F23645] text-white'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {stock.changePercent.toFixed(2)}%
                    </span>
                  </td>
                  <td
                    className={`py-3 px-3 text-right tabular-nums ${
                      isPositive ? 'text-[#22AB94]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPositive ? '+' : ''}${stock.change.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-[10px] text-[#787B86] tabular-nums">
                    {stock.volume}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-white tabular-nums">
                    {stock.marketCap}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer bar */}
      <div className="p-3 border-t border-[#2A2E39] bg-[#171b26] flex justify-between items-center text-[10px]">
        <span className="font-mono text-[9px] text-[#787B86]">
          Showing {displayedStocks.length} of 500 active securities
        </span>
        <button
          onClick={onOpenScreener}
          className="font-mono text-[12px] text-[#2962FF] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
        >
          <span>See all most actively traded stocks</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
