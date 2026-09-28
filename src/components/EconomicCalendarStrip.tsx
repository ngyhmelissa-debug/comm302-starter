import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { EconomicEventData } from '../types/market';

interface EconomicCalendarStripProps {
  events: EconomicEventData[];
  onOpenCalendar: () => void;
  onSelectEvent?: (event: EconomicEventData) => void;
}

export const EconomicCalendarStrip: React.FC<EconomicCalendarStripProps> = ({
  events,
  onOpenCalendar,
  onSelectEvent,
}) => {
  const displayedEvents = events.slice(0, 4);

  const getImpactBadge = (impact: EconomicEventData['impact']) => {
    switch (impact) {
      case 'HIGH IMPACT':
        return (
          <span className="bg-[#F23645]/20 text-[#F23645] font-mono text-[9px] px-1 border border-[#F23645]/30 font-semibold">
            HIGH IMPACT
          </span>
        );
      case 'EARNINGS':
        return (
          <span className="bg-[#22AB94]/20 text-[#22AB94] font-mono text-[9px] px-1 border border-[#22AB94]/30 font-semibold">
            EARNINGS
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="bg-[#353945] text-[#D1D4DC] font-mono text-[9px] px-1 font-semibold">
            MEDIUM
          </span>
        );
      default:
        return (
          <span className="bg-[#2A2E39] text-[#787B86] font-mono text-[9px] px-1">
            LOW
          </span>
        );
    }
  };

  return (
    <section className="border border-[#2A2E39] bg-[#1E222D] p-4">
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#2A2E39] gap-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#2962FF]" />
          <h3 className="text-[18px] font-semibold text-white font-headline">
            Economic Calendar &amp; Earnings Today
          </h3>
        </div>
        <button
          onClick={onOpenCalendar}
          className="font-mono text-[12px] text-[#2962FF] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
        >
          <span>Open Full Calendar</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3 font-mono text-[14px]">
        {displayedEvents.map((evt) => (
          <div
            key={evt.id}
            onClick={() => onSelectEvent && onSelectEvent(evt)}
            className="border border-[#2A2E39] bg-[#131722] p-3 hover:border-[#2962FF] transition-colors cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-white">
                  {evt.time} · {evt.currency}
                </span>
                {getImpactBadge(evt.impact)}
              </div>
              <div className="font-headline font-semibold text-[14px] text-white group-hover:text-[#2962FF] transition-colors truncate">
                {evt.title}
              </div>
            </div>

            <div className="mt-2 text-[11px] text-[#787B86] flex justify-between pt-2 border-t border-[#2A2E39]/40">
              <span className="truncate">Forecast: {evt.forecast}</span>
              <span className="truncate pl-2">Prior: {evt.prior}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
