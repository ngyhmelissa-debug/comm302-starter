import React from 'react';
import { ChevronRight } from 'lucide-react';
import { IndexData } from '../types/market';

interface IndicesBentoProps {
  indices: IndexData[];
  selectedPeriod: string;
  onSelectPeriod: (period: string) => void;
  onSelectIndex: (symbol: string) => void;
}

export const IndicesBento: React.FC<IndicesBentoProps> = ({
  indices,
  selectedPeriod,
  onSelectPeriod,
  onSelectIndex,
}) => {
  const periods = ['1D', '5D', '1M', '1Y', 'ALL'];

  return (
    <div className="space-y-3">
      {/* Section Heading & Period Selector */}
      <div className="flex items-center justify-between border-b border-[#2A2E39] pb-3">
        <button
          onClick={() => onSelectIndex(indices[0]?.symbol || 'SPX')}
          className="flex items-center gap-2 group cursor-pointer text-left"
        >
          <h2 className="text-[22px] font-semibold text-white tracking-tight font-headline group-hover:text-[#2962FF] transition-colors">
            Indices
          </h2>
          <ChevronRight className="w-5 h-5 text-[#787B86] group-hover:text-white transition-colors" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-[#2A2E39] bg-[#131722]">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => onSelectPeriod(period)}
                className={`px-2.5 py-1 font-mono text-[10px] font-semibold transition-colors cursor-pointer ${
                  selectedPeriod === period
                    ? 'bg-[#1E222D] text-white border-b-2 border-[#2962FF]'
                    : 'text-[#787B86] hover:text-white'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Major Indices Highlight Cards (4-column Bento Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {indices.map((idx) => {
          const isPositive = idx.change >= 0;
          return (
            <div
              key={idx.symbol}
              onClick={() => onSelectIndex(idx.symbol)}
              className="bg-[#1E222D] border border-[#2A2E39] p-4 hover:border-[#2962FF] transition-colors flex flex-col justify-between cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center font-headline shrink-0"
                    style={{ backgroundColor: idx.badgeBg }}
                  >
                    {idx.badge}
                  </span>
                  <div>
                    <div className="font-headline font-semibold text-[15px] text-white group-hover:text-[#2962FF] transition-colors leading-tight">
                      {idx.name}
                    </div>
                    <div className="font-mono text-[9px] text-[#787B86]">
                      {idx.code} · {idx.provider}
                    </div>
                  </div>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-[#22AB94] animate-pulse shrink-0" />
              </div>

              <div className="my-4">
                <div className="text-[22px] font-mono font-semibold text-white tracking-tight tabular-nums">
                  {idx.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="flex items-center gap-2 mt-1 font-mono">
                  <span
                    className={`text-[12px] font-semibold tabular-nums ${
                      isPositive ? 'text-[#22AB94]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {idx.change.toFixed(2)}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 text-[9px] font-bold tabular-nums ${
                      isPositive
                        ? 'bg-[#22AB94] text-[#131722]'
                        : 'bg-[#F23645] text-white'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {idx.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Sparkline SVG */}
              <div className="h-10 w-full pt-1">
                <svg
                  className={`w-full h-full fill-none ${
                    isPositive ? 'stroke-[#22AB94]' : 'stroke-[#F23645]'
                  }`}
                  preserveAspectRatio="none"
                  viewBox="0 0 200 40"
                >
                  {isPositive ? (
                    idx.symbol === 'SPX' ? (
                      <path
                        d="M0,32 Q25,30 50,22 T100,24 T150,12 T200,6"
                        strokeLinecap="square"
                        strokeWidth="2"
                      />
                    ) : idx.symbol === 'NDX' ? (
                      <path
                        d="M0,28 Q30,22 60,30 T110,18 T160,8 T200,4"
                        strokeLinecap="square"
                        strokeWidth="2"
                      />
                    ) : (
                      <path
                        d="M0,24 Q30,28 70,20 T120,16 T160,12 T200,8"
                        strokeLinecap="square"
                        strokeWidth="2"
                      />
                    )
                  ) : (
                    <path
                      d="M0,10 Q40,8 80,18 T130,25 T170,30 T200,34"
                      strokeLinecap="square"
                      strokeWidth="2"
                    />
                  )}
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
