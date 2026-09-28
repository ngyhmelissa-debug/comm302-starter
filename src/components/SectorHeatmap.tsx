import React, { useState } from 'react';

interface SectorHeatmapProps {
  onSelectStock: (symbol: string) => void;
}

interface SectorInfo {
  id: string;
  name: string;
  change: string;
  isPositive: boolean;
  colSpan: string;
  bgClass: string;
  borderClass: string;
  stocks: Array<{ symbol: string; change: string; positive: boolean }>;
}

export const SectorHeatmap: React.FC<SectorHeatmapProps> = ({ onSelectStock }) => {
  const [activeSector, setActiveSector] = useState<string | null>(null);

  const sectors: SectorInfo[] = [
    {
      id: 'tech',
      name: 'TECHNOLOGY',
      change: '+2.41%',
      isPositive: true,
      colSpan: 'col-span-12 sm:col-span-6',
      bgClass: 'bg-[#22AB94]/20 hover:bg-[#22AB94]/30',
      borderClass: 'border-[#22AB94]/50',
      stocks: [
        { symbol: 'NVDA', change: '+3.1%', positive: true },
        { symbol: 'AAPL', change: '+0.7%', positive: true },
        { symbol: 'MSFT', change: '+0.5%', positive: true },
      ],
    },
    {
      id: 'fin',
      name: 'FINANCIAL',
      change: '-0.85%',
      isPositive: false,
      colSpan: 'col-span-6 sm:col-span-3',
      bgClass: 'bg-[#F23645]/20 hover:bg-[#F23645]/30',
      borderClass: 'border-[#F23645]/50',
      stocks: [{ symbol: 'JPM', change: '-1.2%', positive: false }],
    },
    {
      id: 'health',
      name: 'HEALTHCARE',
      change: '+0.05%',
      isPositive: true,
      colSpan: 'col-span-6 sm:col-span-3',
      bgClass: 'bg-[#2A2E39]/40 hover:bg-[#1E222D]',
      borderClass: 'border-[#2A2E39]',
      stocks: [{ symbol: 'LLY', change: '+0.4%', positive: true }],
    },
    {
      id: 'consumer',
      name: 'CONSUMER',
      change: '+0.92%',
      isPositive: true,
      colSpan: 'col-span-12 sm:col-span-5',
      bgClass: 'bg-[#22AB94]/15 hover:bg-[#22AB94]/25',
      borderClass: 'border-[#22AB94]/40',
      stocks: [
        { symbol: 'AMZN', change: '+1.2%', positive: true },
        { symbol: 'TSLA', change: '-1.8%', positive: false },
      ],
    },
    {
      id: 'comm',
      name: 'COMMUNICATION',
      change: '-0.42%',
      isPositive: false,
      colSpan: 'col-span-6 sm:col-span-4',
      bgClass: 'bg-[#F23645]/20 hover:bg-[#F23645]/30',
      borderClass: 'border-[#F23645]/40',
      stocks: [
        { symbol: 'GOOGL', change: '-0.3%', positive: false },
        { symbol: 'META', change: '-0.5%', positive: false },
      ],
    },
    {
      id: 'energy',
      name: 'ENERGY',
      change: '+1.80%',
      isPositive: true,
      colSpan: 'col-span-6 sm:col-span-3',
      bgClass: 'bg-[#22AB94]/20 hover:bg-[#22AB94]/30',
      borderClass: 'border-[#22AB94]/40',
      stocks: [{ symbol: 'XOM', change: '+2.1%', positive: true }],
    },
  ];

  return (
    <div className="bg-[#1E222D] border border-[#2A2E39] p-4">
      {/* Title & Legend */}
      <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
        <div>
          <h3 className="text-[18px] font-semibold text-white font-headline">
            S&amp;P 500 Performance Map
          </h3>
          <p className="font-mono text-[9px] text-[#787B86]">
            Weight &amp; Delta distribution across key industry sectors
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] text-[#D1D4DC]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-[#F23645]" /> -3%
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-[#2A2E39]" /> 0%
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-[#22AB94]" /> +3%
          </span>
        </div>
      </div>

      {/* Heatmap Visual Mosaic */}
      <div className="grid grid-cols-12 gap-1.5 min-h-[192px] font-mono text-[9px]">
        {sectors.map((sec) => (
          <div
            key={sec.id}
            onClick={() => setActiveSector(activeSector === sec.id ? null : sec.id)}
            className={`${sec.colSpan} ${sec.bgClass} border ${sec.borderClass} p-2 flex flex-col justify-between transition-colors cursor-pointer group`}
          >
            <div className="flex justify-between items-start gap-1">
              <span className="font-headline font-bold text-white text-[11px] tracking-wide">
                {sec.name}
              </span>
              <span
                className={`px-1 font-bold text-[9px] ${
                  sec.isPositive
                    ? 'bg-[#22AB94] text-[#131722]'
                    : 'bg-[#F23645] text-white'
                }`}
              >
                {sec.change}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1 mt-2">
              {sec.stocks.map((stk) => (
                <button
                  key={stk.symbol}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectStock(stk.symbol);
                  }}
                  className={`p-1 text-center font-bold text-white transition-all hover:ring-1 hover:ring-[#2962FF] cursor-pointer ${
                    stk.positive ? 'bg-[#22AB94]/30' : 'bg-[#F23645]/30'
                  }`}
                  title={`View ${stk.symbol} Superchart`}
                >
                  {stk.symbol} {stk.change}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
