/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Header } from './components/Header';
import { MarketStatusTicker } from './components/MarketStatusTicker';
import { IndicesBento } from './components/IndicesBento';
import { TrendingStocksTable } from './components/TrendingStocksTable';
import { SectorHeatmap } from './components/SectorHeatmap';
import { CryptoForexMajors } from './components/CryptoForexMajors';
import { BenchmarkYields } from './components/BenchmarkYields';
import { WorldIndicesList } from './components/WorldIndicesList';
import { EconomicCalendarStrip } from './components/EconomicCalendarStrip';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { SuperchartView } from './components/SuperchartView';
import { ScreenerView } from './components/ScreenerView';
import { CalendarView } from './components/CalendarView';
import { PortfolioModal } from './components/PortfolioModal';
import {
  initialIndices,
  initialStocks,
  initialCryptoForex,
  initialYields,
  initialWorldIndices,
  initialEconomicEvents,
} from './data/mockMarketData';
import {
  IndexData,
  TickerData,
  CryptoForexData,
  SovereignYieldData,
  WorldIndexData,
  EconomicEventData,
  OrderPosition,
} from './types/market';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<'markets' | 'superchart' | 'screener' | 'calendar'>('markets');
  const [selectedSymbol, setSelectedSymbol] = useState<string>('NVDA');

  // Category Filter Pill State in Markets view
  const [activeCategory, setActiveCategory] = useState<string>('Indices');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('5D');

  // Live Market Data State
  const [indices, setIndices] = useState<IndexData[]>(initialIndices);
  const [stocks, setStocks] = useState<TickerData[]>(initialStocks);
  const [cryptoForex, setCryptoForex] = useState<CryptoForexData[]>(initialCryptoForex);
  const [yields, setYields] = useState<SovereignYieldData[]>(initialYields);
  const [worldIndices, setWorldIndices] = useState<WorldIndexData[]>(initialWorldIndices);
  const [economicEvents, setEconomicEvents] = useState<EconomicEventData[]>(initialEconomicEvents);

  // Market Ticker bar values
  const [vixValue, setVixValue] = useState<number>(15.22);
  const [vixChange, setVixChange] = useState<number>(-1.45);
  const [us10yValue, setUs10yValue] = useState<number>(4.212);
  const [us10yChange, setUs10yChange] = useState<number>(0.038);
  const [btcDValue, setBtcDValue] = useState<number>(58.4);

  // Streaming & Live Tick Animation
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [flashingSymbols, setFlashingSymbols] = useState<Record<string, 'up' | 'down'>>({});

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState<boolean>(false);

  // Paper Trading Portfolio State
  const [portfolioBalance, setPortfolioBalance] = useState<number>(100000.0);
  const [positions, setPositions] = useState<OrderPosition[]>([
    {
      id: 'pos-1',
      symbol: 'NVDA',
      side: 'BUY',
      shares: 50,
      entryPrice: 134.5,
      currentPrice: 138.25,
      timestamp: '2026-09-28 09:35:10',
    },
    {
      id: 'pos-2',
      symbol: 'AAPL',
      side: 'BUY',
      shares: 40,
      entryPrice: 228.0,
      currentPrice: 232.15,
      timestamp: '2026-09-28 10:12:44',
    },
  ]);

  // Categories list matching user's spec
  const categories = [
    'Indices',
    'US stocks',
    'World stocks',
    'Crypto',
    'Futures',
    'Forex',
    'Government bonds',
    'Corporate bonds',
    'ETFs',
    'Economy',
  ];

  // Live streaming ticker effect
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      // Pick random stock or crypto to tick
      const isCryptoTick = Math.random() > 0.45;
      if (isCryptoTick) {
        setCryptoForex((prev) => {
          const idx = Math.floor(Math.random() * prev.length);
          const item = prev[idx];
          const delta = (Math.random() - 0.49) * (item.price * 0.002);
          const newPrice = +(item.price + delta).toFixed(
            item.type === 'crypto' ? 2 : item.symbol.includes('JPY') ? 3 : 5
          );
          const direction = delta >= 0 ? 'up' : 'down';

          setFlashingSymbols((f) => ({ ...f, [item.symbol]: direction }));
          setTimeout(() => {
            setFlashingSymbols((f) => {
              const copy = { ...f };
              delete copy[item.symbol];
              return copy;
            });
          }, 800);

          const updated = [...prev];
          updated[idx] = {
            ...item,
            price: newPrice,
            changePercent: +(item.changePercent + (delta / item.price) * 10).toFixed(2),
          };
          return updated;
        });
      } else {
        setStocks((prev) => {
          const idx = Math.floor(Math.random() * prev.length);
          const item = prev[idx];
          const delta = (Math.random() - 0.48) * (item.price * 0.0015);
          const newPrice = +(item.price + delta).toFixed(2);
          const direction = delta >= 0 ? 'up' : 'down';

          setFlashingSymbols((f) => ({ ...f, [item.symbol]: direction }));
          setTimeout(() => {
            setFlashingSymbols((f) => {
              const copy = { ...f };
              delete copy[item.symbol];
              return copy;
            });
          }, 800);

          const updated = [...prev];
          updated[idx] = {
            ...item,
            price: newPrice,
            change: +(item.change + delta).toFixed(2),
            changePercent: +(item.changePercent + (delta / item.price) * 100).toFixed(2),
          };
          return updated;
        });
      }
    }, 2400);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Handle Order Placement from Superchart
  const handlePlaceOrder = (order: {
    symbol: string;
    side: 'BUY' | 'SELL';
    shares: number;
    price: number;
  }) => {
    const totalCost = order.shares * order.price;
    if (order.side === 'BUY') {
      if (portfolioBalance < totalCost) {
        alert('Insufficient buying power for paper order.');
        return;
      }
      setPortfolioBalance((prev) => prev - totalCost);
    } else {
      setPortfolioBalance((prev) => prev + totalCost);
    }

    const newPosition: OrderPosition = {
      id: `pos-${Date.now()}`,
      symbol: order.symbol,
      side: order.side,
      shares: order.shares,
      entryPrice: order.price,
      currentPrice: order.price,
      timestamp: new Date().toLocaleTimeString(),
    };

    setPositions((prev) => [newPosition, ...prev]);
  };

  const handleClosePosition = (id: string) => {
    const pos = positions.find((p) => p.id === id);
    if (!pos) return;
    const currentPrice =
      stocks.find((s) => s.symbol === pos.symbol)?.price ||
      cryptoForex.find((c) => c.symbol === pos.symbol)?.price ||
      pos.currentPrice;

    const proceeds = pos.shares * currentPrice;
    setPortfolioBalance((prev) => prev + proceeds);
    setPositions((prev) => prev.filter((p) => p.id !== id));
  };

  const handleResetPortfolio = () => {
    setPortfolioBalance(100000.0);
    setPositions([]);
  };

  // Launch Superchart for given symbol
  const handleOpenSuperchart = (sym: string) => {
    setSelectedSymbol(sym);
    setCurrentView('superchart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find selected stock details for Superchart
  const activeStock = stocks.find((s) => s.symbol === selectedSymbol) || {
    symbol: selectedSymbol,
    name:
      indices.find((i) => i.symbol === selectedSymbol)?.name ||
      cryptoForex.find((c) => c.symbol === selectedSymbol)?.pair ||
      'Institutional Asset',
    price:
      indices.find((i) => i.symbol === selectedSymbol)?.price ||
      cryptoForex.find((c) => c.symbol === selectedSymbol)?.price ||
      150.0,
    changePercent:
      indices.find((i) => i.symbol === selectedSymbol)?.changePercent ||
      cryptoForex.find((c) => c.symbol === selectedSymbol)?.changePercent ||
      1.25,
  };

  // Category switch logic
  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'US stocks' || cat === 'ETFs') {
      // Stay on markets overview or smooth focus
      const el = document.getElementById('trending-stocks-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (cat === 'Crypto' || cat === 'Forex') {
      const el = document.getElementById('crypto-fx-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (cat === 'Government bonds' || cat === 'Corporate bonds') {
      const el = document.getElementById('yields-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (cat === 'Economy') {
      const el = document.getElementById('economic-calendar-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (cat === 'World stocks') {
      const el = document.getElementById('world-indices-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f131e] text-white flex flex-col font-mono selection:bg-[#2962FF] selection:text-white">
      {/* TopNavBar Shared Component */}
      <Header
        currentView={currentView}
        onViewChange={(v) => {
          setCurrentView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenPortfolio={() => setIsPortfolioOpen(true)}
        portfolioBalance={portfolioBalance}
      />

      {/* Market Status Ticker & Breadcrumb Bar */}
      <MarketStatusTicker
        isStreaming={isStreaming}
        onToggleStreaming={() => setIsStreaming(!isStreaming)}
        vixValue={vixValue}
        vixChange={vixChange}
        us10yValue={us10yValue}
        us10yChange={us10yChange}
        btcDValue={btcDValue}
      />

      {/* Main Content Area */}
      <main className="w-full max-w-[1720px] mx-auto px-4 md:px-6 py-6 space-y-8 flex-1">
        {currentView === 'markets' && (
          <>
            {/* Hero Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <h1 className="text-[32px] font-bold text-white tracking-tight font-headline">
                  Markets, everywhere
                </h1>
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-1 hover:bg-[#1E222D] text-[#D1D4DC] hover:text-white transition-colors flex items-center cursor-pointer"
                  title="Explore markets"
                >
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>

              {/* Category Filter Pills Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto border border-[#2A2E39] bg-[#171b26] p-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleSelectCategory(cat)}
                    className={`px-3.5 py-1.5 font-mono text-[12px] whitespace-nowrap transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#2A2E39] text-white font-semibold border-b-2 border-[#2962FF]'
                        : 'text-[#787B86] hover:text-white hover:bg-[#1E222D]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* Indices Highlight Cards (4-column Bento Grid) */}
            <IndicesBento
              indices={indices}
              selectedPeriod={selectedPeriod}
              onSelectPeriod={setSelectedPeriod}
              onSelectIndex={handleOpenSuperchart}
            />

            {/* Main 2-Column Institutional Market Board */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* Left Column: US Stocks & Heatmap (7 Cols) */}
              <div className="xl:col-span-7 space-y-6">
                <div id="trending-stocks-section">
                  <TrendingStocksTable
                    stocks={stocks}
                    onSelectStock={handleOpenSuperchart}
                    onOpenScreener={() => {
                      setCurrentView('screener');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    flashingSymbols={flashingSymbols}
                  />
                </div>

                <SectorHeatmap onSelectStock={handleOpenSuperchart} />
              </div>

              {/* Right Column: Crypto, Forex, Major Bonds & World Indices (5 Cols) */}
              <div className="xl:col-span-5 space-y-6">
                <div id="crypto-fx-section">
                  <CryptoForexMajors
                    items={cryptoForex}
                    onSelectItem={handleOpenSuperchart}
                    flashingSymbols={flashingSymbols}
                  />
                </div>

                <div id="yields-section">
                  <BenchmarkYields
                    yields={yields}
                    onSelectYield={(code) => handleOpenSuperchart(code)}
                  />
                </div>

                <div id="world-indices-section">
                  <WorldIndicesList
                    indices={worldIndices}
                    onSelectIndex={handleOpenSuperchart}
                    onOpenScreener={() => {
                      setCurrentView('screener');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Economic Calendar & Upcoming Events Strip */}
            <div id="economic-calendar-section">
              <EconomicCalendarStrip
                events={economicEvents}
                onOpenCalendar={() => {
                  setCurrentView('calendar');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          </>
        )}

        {currentView === 'superchart' && (
          <SuperchartView
            symbol={selectedSymbol}
            stockName={activeStock.name}
            stockPrice={activeStock.price}
            stockChange={activeStock.changePercent}
            onBack={() => setCurrentView('markets')}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {currentView === 'screener' && (
          <ScreenerView
            stocks={stocks}
            onBack={() => setCurrentView('markets')}
            onSelectStock={handleOpenSuperchart}
          />
        )}

        {currentView === 'calendar' && (
          <CalendarView
            events={economicEvents}
            onBack={() => setCurrentView('markets')}
          />
        )}
      </main>

      {/* Comprehensive Institutional Footer Shared Component */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Search Command Palette Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        stocks={stocks}
        indices={indices}
        cryptoForex={cryptoForex}
        onSelectInstrument={handleOpenSuperchart}
      />

      {/* Paper Trading Portfolio Modal */}
      <PortfolioModal
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
        balance={portfolioBalance}
        positions={positions}
        onClosePosition={handleClosePosition}
        onResetPortfolio={handleResetPortfolio}
        stocks={stocks}
      />
    </div>
  );
}
