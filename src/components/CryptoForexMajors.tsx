import React from 'react';
import { CryptoForexData } from '../types/market';

interface CryptoForexMajorsProps {
  items: CryptoForexData[];
  onSelectItem: (symbol: string) => void;
  flashingSymbols?: Record<string, 'up' | 'down'>;
}

export const CryptoForexMajors: React.FC<CryptoForexMajorsProps> = ({
  items,
  onSelectItem,
  flashingSymbols = {},
}) => {
  return (
    <div className="bg-[#1E222D] border border-[#2A2E39]">
      <div className="p-3 border-b border-[#2A2E39] flex items-center justify-between bg-[#171b26]">
        <h3 className="text-[18px] font-semibold text-white font-headline">
          Crypto &amp; Forex Majors
        </h3>
        <span className="font-mono text-[9px] text-[#22AB94] flex items-center gap-1 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22AB94] animate-pulse" />
          24/7 STREAMING
        </span>
      </div>

      <div className="divide-y divide-[#2A2E39] font-mono text-[14px]">
        {items.map((item) => {
          const isPositive = item.changePercent >= 0;
          const flash = flashingSymbols[item.symbol];
          return (
            <div
              key={item.symbol}
              onClick={() => onSelectItem(item.symbol)}
              className={`p-3 flex items-center justify-between hover:bg-[#131722] transition-colors cursor-pointer group ${
                flash === 'up'
                  ? 'flash-up'
                  : flash === 'down'
                  ? 'flash-down'
                  : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 border text-xs flex items-center justify-center font-bold shrink-0"
                  style={{
                    backgroundColor: item.iconBg,
                    borderColor: item.iconBorder,
                    color: item.iconColor,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="font-headline font-bold text-white group-hover:text-[#2962FF] transition-colors leading-tight">
                    {item.symbol}
                  </div>
                  <div className="font-mono text-[11px] text-[#787B86]">
                    {item.pair}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-white tabular-nums">
                  {item.type === 'crypto'
                    ? `$${item.price.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : item.price.toFixed(item.symbol.includes('JPY') ? 3 : 5)}
                </div>
                <div
                  className={`font-mono text-[10px] font-semibold tabular-nums ${
                    isPositive ? 'text-[#22AB94]' : 'text-[#F23645]'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {item.changePercent.toFixed(2)}% ({isPositive ? '+$' : '-$'}
                  {Math.abs(item.changeUsd).toLocaleString('en-US', {
                    maximumFractionDigits: item.type === 'crypto' ? 2 : 4,
                  })}
                  )
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
