import React, { useState, useEffect } from 'react';
import { Wifi, Activity } from 'lucide-react';

interface MarketStatusTickerProps {
  isStreaming: boolean;
  onToggleStreaming: () => void;
  vixValue: number;
  vixChange: number;
  us10yValue: number;
  us10yChange: number;
  btcDValue: number;
}

export const MarketStatusTicker: React.FC<MarketStatusTickerProps> = ({
  isStreaming,
  onToggleStreaming,
  vixValue,
  vixChange,
  us10yValue,
  us10yChange,
  btcDValue,
}) => {
  const [estTime, setEstTime] = useState<string>('');
  const [rtt, setRtt] = useState<number>(1.8);

  useEffect(() => {
    const updateClock = () => {
      // Format current time in America/New_York (EST/EDT)
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setEstTime(formatter.format(new Date()));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isStreaming) return;
    const rttInterval = setInterval(() => {
      // Jitter around 1.6 - 2.2ms
      setRtt(+(1.6 + Math.random() * 0.6).toFixed(1));
    }, 4000);
    return () => clearInterval(rttInterval);
  }, [isStreaming]);

  return (
    <div className="w-full bg-[#171b26] border-b border-[#2A2E39] px-4 md:px-6 py-1.5 flex items-center justify-between text-[11px] font-mono overflow-x-auto whitespace-nowrap scrollbar-none">
      <div className="flex items-center gap-4 divide-x divide-[#2A2E39]">
        {/* Market Status indicator */}
        <div className="flex items-center gap-2 pr-3">
          <span
            className={`w-2 h-2 rounded-full ${
              isStreaming ? 'bg-[#22AB94] animate-pulse' : 'bg-[#787B86]'
            }`}
          />
          <span className="text-[10px] text-[#22AB94] tracking-wider uppercase font-semibold">
            Markets open
          </span>
          <span className="text-[#787B86]">· US Regular Session</span>
        </div>

        {/* Real-time Tickers */}
        <div className="flex items-center gap-5 md:gap-6 pl-4 text-[#D1D4DC] text-[10px]">
          <span className="flex items-center gap-1.5">
            <span className="text-[#787B86]">NYSE / NASDAQ</span>
            <span className="text-white font-semibold tabular-nums">
              {estTime || '14:42:19'} EST
            </span>
          </span>

          <span className="flex items-center gap-1.5">
            <span className="text-[#787B86]">VIX:</span>
            <span
              className={`font-semibold tabular-nums ${
                vixChange < 0 ? 'text-[#22AB94]' : 'text-[#F23645]'
              }`}
            >
              {vixValue.toFixed(2)} ({vixChange > 0 ? '+' : ''}
              {vixChange.toFixed(2)}%)
            </span>
          </span>

          <span className="flex items-center gap-1.5">
            <span className="text-[#787B86]">US10Y:</span>
            <span
              className={`font-semibold tabular-nums ${
                us10yChange > 0 ? 'text-[#F23645]' : 'text-[#22AB94]'
              }`}
            >
              {us10yValue.toFixed(3)}% ({us10yChange > 0 ? '+' : ''}
              {us10yChange.toFixed(3)})
            </span>
          </span>

          <span className="flex items-center gap-1.5">
            <span className="text-[#787B86]">BTC.D:</span>
            <span className="text-white font-semibold tabular-nums">
              {btcDValue.toFixed(1)}%
            </span>
          </span>
        </div>
      </div>

      {/* Latency and Stream state */}
      <div className="hidden xl:flex items-center gap-4 text-[#787B86] text-[9px]">
        <button
          onClick={onToggleStreaming}
          className="flex items-center gap-1 text-[#D1D4DC] hover:text-white px-1.5 py-0.5 border border-[#2A2E39] bg-[#1E222D] cursor-pointer"
          title={isStreaming ? 'Pause streaming updates' : 'Resume live data feed'}
        >
          <Activity
            className={`w-3 h-3 ${isStreaming ? 'text-[#22AB94]' : 'text-[#787B86]'}`}
          />
          <span>{isStreaming ? 'LIVE FEED ON' : 'PAUSED'}</span>
        </button>

        <span className="flex items-center gap-1">
          <Wifi className="w-3 h-3 text-[#787B86]" />
          <span>SERVER: NY4-LOWLATENCY</span>
        </span>
        <span className="text-[#22AB94] font-semibold">RTT: {rtt}ms</span>
      </div>
    </div>
  );
};
