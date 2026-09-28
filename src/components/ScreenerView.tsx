import React, { useState } from 'react';
import { ArrowLeft, Search, ArrowUpDown, ChevronDown, Filter } from 'lucide-react';
import { TickerData } from '../types/market';

interface ScreenerViewProps {
  stocks: TickerData[];
  onBack: () => void;
  onSelectStock: (symbol: string) => void;
}

export const ScreenerView: React.FC<ScreenerViewProps> = ({
  stocks,
  onBack,
  onSelectStock,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [sortField, setSortField] = useState<keyof TickerData>('marketCap');
  const [sortAsc, setSortAsc] = useState(false);

  const sectors = ['All', 'Technology', 'Consumer', 'Communication', 'Financial', 'Healthcare', 'Energy'];

  const handleSort = (field: keyof TickerData) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const filteredStocks = stocks
    .filter((stk) => {
      const matchSearch =
        stk.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stk.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSector = sectorFilter === 'All' || stk.sector === sectorFilter;
      return matchSearch && matchSector;
    })
    .sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (sortField === 'marketCap') {
        const getNum = (v: string) =>
          v.includes('T') ? parseFloat(v) * 1000 : parseFloat(v);
        valA = getNum(a.marketCap);
        valB = getNum(b.marketCap);
      } else if (sortField === 'volume') {
        valA = parseFloat(a.volume);
        valB = parseFloat(b.volume);
      }

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A2E39] pb-3 bg-[#131722] p-3 border">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1E222D] border border-[#2A2E39] hover:border-[#2962FF] text-[#D1D4DC] hover:text-white font-mono text-[11px] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Markets</span>
          </button>
          <div>
            <h1 className="text-[20px] font-bold text-white font-headline">
              Institutional Stock Screener
            </h1>
            <p className="font-mono text-[11px] text-[#787B86]">
              Real-time filter and analysis across active US securities
            </p>
          </div>
        </div>

        <div className="text-right font-mono text-[11px] text-[#787B86]">
          Matched Securities:{' '}
          <strong className="text-white">{filteredStocks.length}</strong>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="bg-[#1E222D] border border-[#2A2E39] p-3 flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="flex items-center bg-[#131722] border border-[#2A2E39] px-3 py-1.5 gap-2 w-72">
          <Search className="w-4 h-4 text-[#787B86]" />
          <input
            type="text"
            placeholder="Filter symbols..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-white font-mono text-[11px] focus:outline-hidden"
          />
        </div>

        {/* Sector Tabs */}
        <div className="flex items-center border border-[#2A2E39] bg-[#131722] text-[10px] font-mono overflow-x-auto">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSectorFilter(sec)}
              className={`px-3 py-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                sectorFilter === sec
                  ? 'bg-[#2962FF] text-white font-bold'
                  : 'text-[#787B86] hover:text-white'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Screener Table */}
      <div className="bg-[#1E222D] border border-[#2A2E39] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#2A2E39] font-mono text-[9px] text-[#787B86] uppercase tracking-wider bg-[#171b26]">
              <th
                onClick={() => handleSort('symbol')}
                className="py-3 px-4 cursor-pointer hover:text-white"
              >
                <div className="flex items-center gap-1">
                  <span>Symbol</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('price')}
                className="py-3 px-3 text-right cursor-pointer hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Price</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('changePercent')}
                className="py-3 px-3 text-right cursor-pointer hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Change %</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('volume')}
                className="py-3 px-3 text-right cursor-pointer hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Volume</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('marketCap')}
                className="py-3 px-3 text-right cursor-pointer hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Mkt Cap</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('pe')}
                className="py-3 px-3 text-right cursor-pointer hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>P/E</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3 px-4 text-right">52W Range</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2E39] font-mono text-[13px] text-[#D1D4DC]">
            {filteredStocks.map((stock) => {
              const isPositive = stock.change >= 0;
              const rangePercent =
                ((stock.price - stock.low52w) / (stock.high52w - stock.low52w)) * 100;
              return (
                <tr
                  key={stock.symbol}
                  onClick={() => onSelectStock(stock.symbol)}
                  className="hover:bg-[#131722] transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4 flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        isPositive ? 'bg-[#22AB94]' : 'bg-[#F23645]'
                      }`}
                    />
                    <div>
                      <div className="font-headline font-bold text-white group-hover:text-[#2962FF] transition-colors">
                        {stock.symbol}
                      </div>
                      <div className="text-[10px] text-[#787B86]">{stock.name}</div>
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

                  <td className="py-3 px-3 text-right text-[11px] text-[#787B86] tabular-nums">
                    {stock.volume}
                  </td>

                  <td className="py-3 px-3 text-right font-semibold text-white tabular-nums">
                    {stock.marketCap}
                  </td>

                  <td className="py-3 px-3 text-right text-[#D1D4DC] tabular-nums">
                    {stock.pe.toFixed(1)}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <div className="w-24 h-1.5 bg-[#2A2E39] relative">
                        <div
                          className="h-full bg-[#2962FF]"
                          style={{ width: `${Math.min(100, Math.max(0, rangePercent))}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-[#787B86] tabular-nums">
                        ${stock.low52w.toFixed(0)} - ${stock.high52w.toFixed(0)}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
