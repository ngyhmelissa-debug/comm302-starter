import React from 'react';
import { WorldIndexData } from '../types/market';

interface WorldIndicesListProps {
  indices: WorldIndexData[];
  onSelectIndex: (code: string) => void;
  onOpenScreener: () => void;
}

export const WorldIndicesList: React.FC<WorldIndicesListProps> = ({
  indices,
  onSelectIndex,
  onOpenScreener,
}) => {
  return (
    <div className="bg-[#1E222D] border border-[#2A2E39]">
      <div className="p-3 border-b border-[#2A2E39] flex items-center justify-between bg-[#171b26]">
        <h3 className="text-[18px] font-semibold text-white font-headline">
          World Indices
        </h3>
        <button
          onClick={onOpenScreener}
          className="font-mono text-[9px] text-[#2962FF] hover:underline cursor-pointer"
        >
          See all
        </button>
      </div>
      <div className="divide-y divide-[#2A2E39] font-mono text-[14px]">
        {indices.map((idx) => {
          const isPositive = idx.changePercent >= 0;
          return (
            <div
              key={idx.code}
              onClick={() => onSelectIndex(idx.code)}
              className="p-2.5 flex items-center justify-between hover:bg-[#131722] transition-colors cursor-pointer group"
            >
              <div>
                <span className="font-bold text-white group-hover:text-[#2962FF] transition-colors">
                  {idx.code}
                </span>
                <span className="text-[11px] text-[#787B86] ml-2">
                  {idx.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold tabular-nums">
                  {idx.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span
                  className={`font-mono text-[9px] px-1.5 py-0.5 tabular-nums ${
                    isPositive ? 'text-[#22AB94]' : 'text-[#F23645]'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {idx.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
