import React from 'react';
import { X, TrendingUp, TrendingDown, DollarSign, RefreshCw, Trash2 } from 'lucide-react';
import { OrderPosition, TickerData } from '../types/market';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  positions: OrderPosition[];
  onClosePosition: (id: string) => void;
  onResetPortfolio: () => void;
  stocks: TickerData[];
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  isOpen,
  onClose,
  balance,
  positions,
  onClosePosition,
  onResetPortfolio,
  stocks,
}) => {
  if (!isOpen) return null;

  // Calculate current positions equity and P&L
  let positionsValue = 0;
  let totalProfitLoss = 0;

  const positionsWithLivePrice = positions.map((pos) => {
    const liveStock = stocks.find((s) => s.symbol === pos.symbol);
    const currentPrice = liveStock ? liveStock.price : pos.currentPrice;
    const value = pos.shares * currentPrice;
    const cost = pos.shares * pos.entryPrice;
    const pnl = pos.side === 'BUY' ? value - cost : cost - value;
    const pnlPercent = (pnl / cost) * 100;

    positionsValue += value;
    totalProfitLoss += pnl;

    return {
      ...pos,
      currentPrice,
      pnl,
      pnlPercent,
      value,
    };
  });

  const totalEquity = balance + positionsValue;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div className="bg-[#1E222D] border border-[#2A2E39] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-[#2A2E39] flex items-center justify-between bg-[#171b26]">
          <div className="flex items-center gap-2">
            <span className="font-headline font-bold text-white text-[18px]">
              Institutional Paper Trading Account
            </span>
            <span className="font-mono text-[9px] bg-[#22AB94] text-[#131722] px-1.5 py-0.5 font-bold">
              ACTIVE
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#787B86] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Account Balances Strip */}
        <div className="p-4 grid grid-cols-3 gap-3 border-b border-[#2A2E39] bg-[#131722] font-mono">
          <div className="border border-[#2A2E39] p-2.5 bg-[#1E222D]">
            <div className="text-[10px] text-[#787B86]">Total Equity</div>
            <div className="text-[18px] font-bold text-white tabular-nums">
              ${totalEquity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className="border border-[#2A2E39] p-2.5 bg-[#1E222D]">
            <div className="text-[10px] text-[#787B86]">Cash Balance</div>
            <div className="text-[18px] font-bold text-white tabular-nums">
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className="border border-[#2A2E39] p-2.5 bg-[#1E222D]">
            <div className="text-[10px] text-[#787B86]">Unrealized P&amp;L</div>
            <div
              className={`text-[18px] font-bold tabular-nums ${
                totalProfitLoss >= 0 ? 'text-[#22AB94]' : 'text-[#F23645]'
              }`}
            >
              {totalProfitLoss >= 0 ? '+' : ''}$
              {totalProfitLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Positions Table */}
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-headline font-semibold text-white text-[14px]">
              Open Positions ({positions.length})
            </h4>
            {positions.length > 0 && (
              <button
                onClick={onResetPortfolio}
                className="font-mono text-[10px] text-[#787B86] hover:text-[#F23645] flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Simulation</span>
              </button>
            )}
          </div>

          {positions.length === 0 ? (
            <div className="py-12 text-center text-[#787B86] font-mono text-[12px] border border-dashed border-[#2A2E39]">
              No active paper positions.
              <br />
              <span className="text-[10px] text-[#D1D4DC] mt-1 block">
                Open any Superchart to execute simulated Buy or Sell orders!
              </span>
            </div>
          ) : (
            <div className="border border-[#2A2E39] overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-[11px]">
                <thead>
                  <tr className="border-b border-[#2A2E39] bg-[#171b26] text-[#787B86] text-[9px] uppercase">
                    <th className="p-2">Symbol</th>
                    <th className="p-2">Side</th>
                    <th className="p-2 text-right">Shares</th>
                    <th className="p-2 text-right">Avg Entry</th>
                    <th className="p-2 text-right">Current</th>
                    <th className="p-2 text-right">P&amp;L</th>
                    <th className="p-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2E39]">
                  {positionsWithLivePrice.map((pos) => (
                    <tr key={pos.id} className="hover:bg-[#131722]">
                      <td className="p-2 font-bold text-white font-headline">
                        {pos.symbol}
                      </td>
                      <td className="p-2">
                        <span
                          className={`px-1.5 py-0.5 text-[9px] font-bold ${
                            pos.side === 'BUY'
                              ? 'bg-[#22AB94] text-[#131722]'
                              : 'bg-[#F23645] text-white'
                          }`}
                        >
                          {pos.side}
                        </span>
                      </td>
                      <td className="p-2 text-right text-white tabular-nums">
                        {pos.shares}
                      </td>
                      <td className="p-2 text-right text-[#D1D4DC] tabular-nums">
                        ${pos.entryPrice.toFixed(2)}
                      </td>
                      <td className="p-2 text-right text-white font-semibold tabular-nums">
                        ${pos.currentPrice.toFixed(2)}
                      </td>
                      <td
                        className={`p-2 text-right font-bold tabular-nums ${
                          pos.pnl >= 0 ? 'text-[#22AB94]' : 'text-[#F23645]'
                        }`}
                      >
                        {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toFixed(2)} (
                        {pos.pnlPercent.toFixed(2)}%)
                      </td>
                      <td className="p-2 text-right">
                        <button
                          onClick={() => onClosePosition(pos.id)}
                          className="px-2 py-0.5 bg-[#2A2E39] hover:bg-[#F23645] hover:text-white text-[#D1D4DC] text-[10px] cursor-pointer transition-colors"
                        >
                          Close
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#2A2E39] bg-[#171b26] flex justify-between items-center text-[10px] font-mono text-[#787B86]">
          <span>Paper Capital: Risk-Free Simulation Sandbox</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#2962FF] text-white font-semibold hover:bg-blue-600"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
