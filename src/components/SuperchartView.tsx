import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  TrendingUp,
  BarChart2,
  Sliders,
  DollarSign,
  Clock,
  Layers,
  Check,
} from 'lucide-react';
import { generateCandles } from '../data/mockMarketData';
import { CandleData } from '../types/market';

interface SuperchartViewProps {
  symbol: string;
  onBack: () => void;
  onPlaceOrder: (order: {
    symbol: string;
    side: 'BUY' | 'SELL';
    shares: number;
    price: number;
  }) => void;
  stockPrice?: number;
  stockName?: string;
  stockChange?: number;
}

export const SuperchartView: React.FC<SuperchartViewProps> = ({
  symbol,
  onBack,
  onPlaceOrder,
  stockPrice = 138.25,
  stockName = 'NVIDIA Corporation',
  stockChange = 3.14,
}) => {
  const [timeframe, setTimeframe] = useState<'1m' | '5m' | '15m' | '1H' | '1D' | '1W'>('5m');
  const [chartType, setChartType] = useState<'candles' | 'line'>('candles');
  const [showSMA, setShowSMA] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);

  // Order Ticket state
  const [orderSide, setOrderSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [shares, setShares] = useState<number>(10);
  const [limitPrice, setLimitPrice] = useState<number>(stockPrice);
  const [orderNotification, setOrderNotification] = useState<string | null>(null);

  // Generate candle data
  const candles = useMemo(() => {
    return generateCandles(stockPrice, 32);
  }, [symbol, stockPrice, timeframe]);

  // Derived price extents
  const minPrice = Math.min(...candles.map((c) => c.low)) * 0.998;
  const maxPrice = Math.max(...candles.map((c) => c.high)) * 1.002;
  const priceRange = maxPrice - minPrice || 1;

  const maxVolume = Math.max(...candles.map((c) => c.volume)) || 1;

  const currentCandle = hoveredCandle || candles[candles.length - 1];
  const isPositiveChange = stockChange >= 0;

  const handleExecuteOrder = () => {
    const executionPrice = orderType === 'MARKET' ? stockPrice : limitPrice;
    onPlaceOrder({
      symbol,
      side: orderSide,
      shares,
      price: executionPrice,
    });
    setOrderNotification(
      `Order Executed: ${orderSide} ${shares} shares of ${symbol} @ $${executionPrice.toFixed(2)}`
    );
    setTimeout(() => setOrderNotification(null), 4000);
  };

  // Depth of Market data
  const bids = [
    { price: stockPrice - 0.05, size: 2400, depth: 85 },
    { price: stockPrice - 0.1, size: 4800, depth: 65 },
    { price: stockPrice - 0.15, size: 6200, depth: 50 },
    { price: stockPrice - 0.2, size: 9100, depth: 30 },
  ];
  const asks = [
    { price: stockPrice + 0.05, size: 1800, depth: 80 },
    { price: stockPrice + 0.1, size: 3600, depth: 60 },
    { price: stockPrice + 0.15, size: 5400, depth: 45 },
    { price: stockPrice + 0.2, size: 8200, depth: 25 },
  ];

  return (
    <div className="space-y-4">
      {/* Top Superchart Navigation Bar */}
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
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-white text-[20px] tracking-tight">
                {symbol}
              </span>
              <span className="font-mono text-[10px] text-[#787B86] bg-[#2A2E39] px-2 py-0.5">
                NASDAQ
              </span>
              <span className="w-2 h-2 rounded-full bg-[#22AB94] animate-pulse" />
            </div>
            <div className="font-mono text-[11px] text-[#787B86]">
              {stockName}
            </div>
          </div>
        </div>

        {/* Live quote ticker */}
        <div className="flex items-center gap-4 font-mono">
          <div>
            <div className="text-[22px] font-bold text-white tabular-nums">
              ${stockPrice.toFixed(2)}
            </div>
            <div
              className={`text-[11px] font-semibold tabular-nums ${
                isPositiveChange ? 'text-[#22AB94]' : 'text-[#F23645]'
              }`}
            >
              {isPositiveChange ? '+' : ''}
              {stockChange.toFixed(2)}%
            </div>
          </div>

          <div className="hidden md:flex flex-col text-[10px] text-[#787B86] border-l border-[#2A2E39] pl-4">
            <span>
              24h High:{' '}
              <strong className="text-[#D1D4DC]">${(stockPrice * 1.025).toFixed(2)}</strong>
            </span>
            <span>
              24h Low:{' '}
              <strong className="text-[#D1D4DC]">${(stockPrice * 0.975).toFixed(2)}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Chart Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#171b26] border border-[#2A2E39] p-2 text-xs font-mono">
        <div className="flex items-center gap-1">
          {/* Timeframes */}
          <div className="flex items-center border border-[#2A2E39] bg-[#131722]">
            {(['1m', '5m', '15m', '1H', '1D', '1W'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 text-[10px] font-semibold cursor-pointer ${
                  timeframe === tf
                    ? 'bg-[#2962FF] text-white'
                    : 'text-[#787B86] hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Type */}
          <div className="flex items-center border border-[#2A2E39] bg-[#131722] ml-2">
            <button
              onClick={() => setChartType('candles')}
              className={`px-2 py-1 text-[10px] font-semibold cursor-pointer ${
                chartType === 'candles'
                  ? 'bg-[#1E222D] text-white border-b-2 border-[#2962FF]'
                  : 'text-[#787B86] hover:text-white'
              }`}
            >
              Candles
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-2 py-1 text-[10px] font-semibold cursor-pointer ${
                chartType === 'line'
                  ? 'bg-[#1E222D] text-white border-b-2 border-[#2962FF]'
                  : 'text-[#787B86] hover:text-white'
              }`}
            >
              Line
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSMA(!showSMA)}
            className={`px-2 py-1 text-[10px] border border-[#2A2E39] cursor-pointer ${
              showSMA
                ? 'bg-[#2962FF]/20 text-[#2962FF] border-[#2962FF]/50'
                : 'text-[#787B86] hover:text-white'
            }`}
          >
            SMA 20
          </button>
          <button
            onClick={() => setShowVolume(!showVolume)}
            className={`px-2 py-1 text-[10px] border border-[#2A2E39] cursor-pointer ${
              showVolume
                ? 'bg-[#22AB94]/20 text-[#22AB94] border-[#22AB94]/50'
                : 'text-[#787B86] hover:text-white'
            }`}
          >
            Volume
          </button>
        </div>
      </div>

      {/* Main Grid: Chart on Left (8 cols), Order Ticket & Depth on Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Chart Viewport */}
        <div className="lg:col-span-8 bg-[#131722] border border-[#2A2E39] p-4 flex flex-col justify-between relative min-h-[460px]">
          {/* Candle readout bar */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-[#787B86] pb-2 border-b border-[#2A2E39]/60">
            <span>
              Time: <strong className="text-white">{currentCandle.time}</strong>
            </span>
            <span>
              O: <strong className="text-white">${currentCandle.open.toFixed(2)}</strong>
            </span>
            <span>
              H: <strong className="text-white">${currentCandle.high.toFixed(2)}</strong>
            </span>
            <span>
              L: <strong className="text-white">${currentCandle.low.toFixed(2)}</strong>
            </span>
            <span>
              C:{' '}
              <strong
                className={
                  currentCandle.close >= currentCandle.open
                    ? 'text-[#22AB94]'
                    : 'text-[#F23645]'
                }
              >
                ${currentCandle.close.toFixed(2)}
              </strong>
            </span>
            <span>
              Vol:{' '}
              <strong className="text-[#D1D4DC]">
                {currentCandle.volume.toLocaleString()}
              </strong>
            </span>
          </div>

          {/* SVG Interactive Financial Chart Canvas */}
          <div className="relative w-full h-[360px] my-3">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 800 360"
              preserveAspectRatio="none"
            >
              {/* Horizontal Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => {
                const y = 20 + i * 65;
                const priceLevel = maxPrice - (i / 4) * priceRange;
                return (
                  <g key={i}>
                    <line
                      x1="0"
                      y1={y}
                      x2="800"
                      y2={y}
                      stroke="#2A2E39"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                    />
                    <text
                      x="795"
                      y={y - 4}
                      fill="#787B86"
                      fontSize="9"
                      fontFamily="JetBrains Mono"
                      textAnchor="end"
                    >
                      ${priceLevel.toFixed(2)}
                    </text>
                  </g>
                );
              })}

              {/* Volume Bars */}
              {showVolume &&
                candles.map((candle, idx) => {
                  const x = (idx / (candles.length - 1)) * 740 + 20;
                  const volHeight = (candle.volume / maxVolume) * 70;
                  const isUp = candle.close >= candle.open;
                  return (
                    <rect
                      key={`vol-${idx}`}
                      x={x - 6}
                      y={340 - volHeight}
                      width="12"
                      height={volHeight}
                      fill={isUp ? 'rgba(34, 171, 148, 0.25)' : 'rgba(242, 54, 69, 0.25)'}
                    />
                  );
                })}

              {/* SMA 20 Overlay Line */}
              {showSMA && (
                <path
                  d={candles
                    .map((c, i) => {
                      const x = (i / (candles.length - 1)) * 740 + 20;
                      // Simple moving average approximation
                      const avg =
                        candles
                          .slice(Math.max(0, i - 4), i + 1)
                          .reduce((acc, curr) => acc + curr.close, 0) /
                        Math.min(5, i + 1);
                      const y = 300 - ((avg - minPrice) / priceRange) * 260;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#2962FF"
                  strokeWidth="2"
                />
              )}

              {/* Candlesticks or Line Mode */}
              {chartType === 'candles' ? (
                candles.map((candle, idx) => {
                  const x = (idx / (candles.length - 1)) * 740 + 20;
                  const isUp = candle.close >= candle.open;
                  const wickTop = 300 - ((candle.high - minPrice) / priceRange) * 260;
                  const wickBottom = 300 - ((candle.low - minPrice) / priceRange) * 260;
                  const bodyTop =
                    300 -
                    ((Math.max(candle.open, candle.close) - minPrice) / priceRange) * 260;
                  const bodyBottom =
                    300 -
                    ((Math.min(candle.open, candle.close) - minPrice) / priceRange) * 260;
                  const bodyHeight = Math.max(3, bodyBottom - bodyTop);

                  return (
                    <g
                      key={`candle-${idx}`}
                      onMouseEnter={() => setHoveredCandle(candle)}
                      className="cursor-pointer group"
                    >
                      {/* High/Low Wick */}
                      <line
                        x1={x}
                        y1={wickTop}
                        x2={x}
                        y2={wickBottom}
                        stroke={isUp ? '#22AB94' : '#F23645'}
                        strokeWidth="1.5"
                      />
                      {/* Real Body */}
                      <rect
                        x={x - 5}
                        y={bodyTop}
                        width="10"
                        height={bodyHeight}
                        fill={isUp ? '#22AB94' : '#F23645'}
                        stroke={isUp ? '#22AB94' : '#F23645'}
                        strokeWidth="1"
                        className="transition-all hover:brightness-125"
                      />
                    </g>
                  );
                })
              ) : (
                <path
                  d={candles
                    .map((c, i) => {
                      const x = (i / (candles.length - 1)) * 740 + 20;
                      const y = 300 - ((c.close - minPrice) / priceRange) * 260;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke={isPositiveChange ? '#22AB94' : '#F23645'}
                  strokeWidth="2.5"
                />
              )}
            </svg>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-[#787B86] pt-2 border-t border-[#2A2E39]">
            <span>Interactive Chart Engine · Institutional Feed</span>
            <span>Hover bars for OHLC inspector</span>
          </div>
        </div>

        {/* Right Panel: Order Execution & Market Depth */}
        <div className="lg:col-span-4 space-y-4">
          {/* Order Placement Ticket */}
          <div className="bg-[#1E222D] border border-[#2A2E39] p-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2E39]">
              <span className="font-headline font-bold text-white text-[15px]">
                Order Execution Ticket
              </span>
              <span className="font-mono text-[9px] bg-[#2A2E39] text-[#22AB94] px-1.5 py-0.5 font-bold">
                SIMULATED PAPER
              </span>
            </div>

            {/* Buy / Sell Tabs */}
            <div className="grid grid-cols-2 gap-1 my-3 bg-[#131722] p-1 border border-[#2A2E39] font-mono text-[12px] font-bold">
              <button
                onClick={() => setOrderSide('BUY')}
                className={`py-2 transition-colors cursor-pointer ${
                  orderSide === 'BUY'
                    ? 'bg-[#22AB94] text-[#131722]'
                    : 'text-[#787B86] hover:text-white'
                }`}
              >
                BUY / LONG
              </button>
              <button
                onClick={() => setOrderSide('SELL')}
                className={`py-2 transition-colors cursor-pointer ${
                  orderSide === 'SELL'
                    ? 'bg-[#F23645] text-white'
                    : 'text-[#787B86] hover:text-white'
                }`}
              >
                SELL / SHORT
              </button>
            </div>

            {/* Order Type */}
            <div className="flex items-center justify-between text-[11px] font-mono mb-2">
              <span className="text-[#787B86]">Type:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setOrderType('MARKET')}
                  className={`px-2 py-0.5 border text-[10px] cursor-pointer ${
                    orderType === 'MARKET'
                      ? 'border-[#2962FF] text-[#2962FF] bg-[#2962FF]/10'
                      : 'border-[#2A2E39] text-[#787B86]'
                  }`}
                >
                  Market
                </button>
                <button
                  onClick={() => setOrderType('LIMIT')}
                  className={`px-2 py-0.5 border text-[10px] cursor-pointer ${
                    orderType === 'LIMIT'
                      ? 'border-[#2962FF] text-[#2962FF] bg-[#2962FF]/10'
                      : 'border-[#2A2E39] text-[#787B86]'
                  }`}
                >
                  Limit
                </button>
              </div>
            </div>

            {/* Shares input */}
            <div className="space-y-2 font-mono text-[11px]">
              <div>
                <label className="text-[#787B86] block mb-1">Quantity (Shares):</label>
                <input
                  type="number"
                  min="1"
                  value={shares}
                  onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-[#131722] border border-[#2A2E39] px-3 py-1.5 text-white font-mono focus:border-[#2962FF] focus:outline-hidden"
                />
              </div>

              {orderType === 'LIMIT' && (
                <div>
                  <label className="text-[#787B86] block mb-1">Limit Price ($):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(parseFloat(e.target.value) || stockPrice)}
                    className="w-full bg-[#131722] border border-[#2A2E39] px-3 py-1.5 text-white font-mono focus:border-[#2962FF] focus:outline-hidden"
                  />
                </div>
              )}

              <div className="pt-2 border-t border-[#2A2E39] flex justify-between text-[#D1D4DC]">
                <span>Est. Total:</span>
                <span className="text-white font-bold tabular-nums">
                  ${(shares * (orderType === 'MARKET' ? stockPrice : limitPrice)).toLocaleString(
                    'en-US',
                    { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                  )}
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handleExecuteOrder}
              className={`w-full mt-4 py-2.5 font-mono text-[12px] font-bold text-center transition-colors cursor-pointer ${
                orderSide === 'BUY'
                  ? 'bg-[#22AB94] text-[#131722] hover:bg-[#1f9b86]'
                  : 'bg-[#F23645] text-white hover:bg-[#d82a38]'
              }`}
            >
              EXECUTE {orderSide} {shares} {symbol}
            </button>

            {orderNotification && (
              <div className="mt-2 p-2 bg-[#22AB94]/20 border border-[#22AB94] text-[#22AB94] text-[10px] font-mono flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>{orderNotification}</span>
              </div>
            )}
          </div>

          {/* Depth of Market Ladder */}
          <div className="bg-[#1E222D] border border-[#2A2E39] p-3 font-mono text-[11px]">
            <div className="flex items-center justify-between pb-2 border-b border-[#2A2E39] text-[#787B86] text-[10px]">
              <span>ORDER BOOK</span>
              <span>DEPTH (SHARES)</span>
            </div>

            {/* Asks (Sell) */}
            <div className="space-y-1 my-2">
              {asks.reverse().map((ask, i) => (
                <div
                  key={`ask-${i}`}
                  className="flex justify-between items-center text-[10px] relative px-1 py-0.5"
                >
                  <div
                    className="absolute inset-y-0 right-0 bg-[#F23645]/15"
                    style={{ width: `${ask.depth}%` }}
                  />
                  <span className="text-[#F23645] relative z-10 tabular-nums">
                    ${ask.price.toFixed(2)}
                  </span>
                  <span className="text-[#D1D4DC] relative z-10 tabular-nums">
                    {ask.size}
                  </span>
                </div>
              ))}
            </div>

            {/* Spread Bar */}
            <div className="py-1 my-1 border-y border-[#2A2E39] bg-[#131722] px-2 flex justify-between text-[10px] text-[#787B86]">
              <span>SPREAD: $0.10</span>
              <span className="text-white font-bold">${stockPrice.toFixed(2)}</span>
            </div>

            {/* Bids (Buy) */}
            <div className="space-y-1 my-2">
              {bids.map((bid, i) => (
                <div
                  key={`bid-${i}`}
                  className="flex justify-between items-center text-[10px] relative px-1 py-0.5"
                >
                  <div
                    className="absolute inset-y-0 right-0 bg-[#22AB94]/15"
                    style={{ width: `${bid.depth}%` }}
                  />
                  <span className="text-[#22AB94] relative z-10 tabular-nums">
                    ${bid.price.toFixed(2)}
                  </span>
                  <span className="text-[#D1D4DC] relative z-10 tabular-nums">
                    {bid.size}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
