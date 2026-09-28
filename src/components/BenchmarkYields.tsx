import React from 'react';
import { SovereignYieldData } from '../types/market';

interface BenchmarkYieldsProps {
  yields: SovereignYieldData[];
  onSelectYield?: (code: string) => void;
}

export const BenchmarkYields: React.FC<BenchmarkYieldsProps> = ({
  yields,
  onSelectYield,
}) => {
  return (
    <div className="bg-[#1E222D] border border-[#2A2E39]">
      <div className="p-3 border-b border-[#2A2E39] flex items-center justify-between bg-[#171b26]">
        <h3 className="text-[18px] font-semibold text-white font-headline">
          Global 10Y Benchmark Yields
        </h3>
        <span className="font-mono text-[9px] text-[#787B86]">GOVT BONDS</span>
      </div>
      <div className="p-3 space-y-2.5 font-mono text-[14px]">
        {yields.map((item) => {
          const isUp = item.changeBps > 0;
          return (
            <div
              key={item.code}
              onClick={() => onSelectYield && onSelectYield(item.code)}
              className="flex items-center justify-between hover:bg-[#131722] p-1.5 transition-colors cursor-pointer group"
            >
              <span className="font-headline text-[15px] text-white group-hover:text-[#2962FF] transition-colors">
                {item.name} ({item.code})
              </span>
              <div className="flex items-center gap-3">
                <span className="text-white font-bold tabular-nums">
                  {item.yield.toFixed(3)}%
                </span>
                <span
                  className={`font-mono text-[9px] px-1.5 py-0.5 font-bold tabular-nums ${
                    isUp ? 'bg-[#F23645] text-white' : 'bg-[#22AB94] text-[#131722]'
                  }`}
                >
                  {isUp ? '+' : ''}
                  {item.changeBps.toFixed(1)} bps
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
