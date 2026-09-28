import React, { useState } from 'react';
import { ArrowLeft, Calendar, Filter, AlertCircle, TrendingUp } from 'lucide-react';
import { EconomicEventData } from '../types/market';

interface CalendarViewProps {
  events: EconomicEventData[];
  onBack: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events, onBack }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('ALL');
  const [selectedImpact, setSelectedImpact] = useState('ALL');

  const currencies = ['ALL', 'USD', 'EUR', 'JPY', 'GBP'];
  const impacts = ['ALL', 'HIGH IMPACT', 'EARNINGS', 'MEDIUM'];

  const filteredEvents = events.filter((evt) => {
    const matchCur = selectedCurrency === 'ALL' || evt.currency === selectedCurrency;
    const matchImp = selectedImpact === 'ALL' || evt.impact === selectedImpact;
    return matchCur && matchImp;
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
              Global Economic &amp; Earnings Calendar
            </h1>
            <p className="font-mono text-[11px] text-[#787B86]">
              Real-time macroeconomic releases, central bank events &amp; corporate earnings
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#787B86]">Timezone:</span>
          <span className="bg-[#1E222D] border border-[#2A2E39] px-2 py-1 text-white font-bold">
            EST (UTC-5)
          </span>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="bg-[#1E222D] border border-[#2A2E39] p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4">
          {/* Currency */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#787B86] font-mono text-[11px]">Currency:</span>
            <div className="flex border border-[#2A2E39] bg-[#131722]">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCurrency(c)}
                  className={`px-2.5 py-1 font-mono text-[10px] cursor-pointer ${
                    selectedCurrency === c
                      ? 'bg-[#2962FF] text-white font-bold'
                      : 'text-[#787B86] hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#787B86] font-mono text-[11px]">Impact:</span>
            <div className="flex border border-[#2A2E39] bg-[#131722]">
              {impacts.map((imp) => (
                <button
                  key={imp}
                  onClick={() => setSelectedImpact(imp)}
                  className={`px-2.5 py-1 font-mono text-[10px] cursor-pointer ${
                    selectedImpact === imp
                      ? 'bg-[#2962FF] text-white font-bold'
                      : 'text-[#787B86] hover:text-white'
                  }`}
                >
                  {imp}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-right font-mono text-[11px] text-[#787B86]">
          Total Events Today:{' '}
          <strong className="text-white">{filteredEvents.length}</strong>
        </div>
      </div>

      {/* Calendar Event Table */}
      <div className="bg-[#1E222D] border border-[#2A2E39] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#2A2E39] font-mono text-[9px] text-[#787B86] uppercase tracking-wider bg-[#171b26]">
              <th className="py-3 px-4 font-normal">Time (EST)</th>
              <th className="py-3 px-3 font-normal">Currency</th>
              <th className="py-3 px-4 font-normal">Event / Indicator</th>
              <th className="py-3 px-3 font-normal">Impact</th>
              <th className="py-3 px-3 font-normal text-right">Actual</th>
              <th className="py-3 px-3 font-normal text-right">Forecast</th>
              <th className="py-3 px-4 font-normal text-right">Prior</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2E39] font-mono text-[13px] text-[#D1D4DC]">
            {filteredEvents.map((evt) => (
              <tr key={evt.id} className="hover:bg-[#131722] transition-colors">
                <td className="py-3.5 px-4 font-bold text-white tabular-nums">
                  {evt.time}
                </td>
                <td className="py-3.5 px-3">
                  <span className="bg-[#2A2E39] text-[#D1D4DC] px-2 py-0.5 text-[10px] font-bold">
                    {evt.currency}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-headline font-semibold text-white">
                    {evt.title}
                  </div>
                  <div className="text-[10px] text-[#787B86]">{evt.country}</div>
                </td>
                <td className="py-3.5 px-3">
                  {evt.impact === 'HIGH IMPACT' && (
                    <span className="bg-[#F23645]/20 text-[#F23645] border border-[#F23645]/40 px-1.5 py-0.5 text-[9px] font-bold">
                      HIGH IMPACT
                    </span>
                  )}
                  {evt.impact === 'EARNINGS' && (
                    <span className="bg-[#22AB94]/20 text-[#22AB94] border border-[#22AB94]/40 px-1.5 py-0.5 text-[9px] font-bold">
                      EARNINGS
                    </span>
                  )}
                  {evt.impact === 'MEDIUM' && (
                    <span className="bg-[#353945] text-[#D1D4DC] px-1.5 py-0.5 text-[9px] font-bold">
                      MEDIUM
                    </span>
                  )}
                  {evt.impact === 'LOW' && (
                    <span className="bg-[#2A2E39] text-[#787B86] px-1.5 py-0.5 text-[9px]">
                      LOW
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-3 text-right font-bold text-white tabular-nums">
                  {evt.actual || '—'}
                </td>
                <td className="py-3.5 px-3 text-right text-[#787B86] tabular-nums">
                  {evt.forecast}
                </td>
                <td className="py-3.5 px-4 text-right text-[#787B86] tabular-nums">
                  {evt.prior}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
