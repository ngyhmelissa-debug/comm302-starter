export interface TickerData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  marketCap: string;
  sector: string;
  high52w: number;
  low52w: number;
  pe: number;
  sparkline: number[];
  category?: 'stock' | 'crypto' | 'index' | 'forex' | 'bond';
}

export interface IndexData {
  symbol: string;
  code: string;
  name: string;
  provider: string;
  price: number;
  change: number;
  changePercent: number;
  badge: string;
  badgeBg: string;
  sparkline: number[];
}

export interface CryptoForexData {
  symbol: string;
  pair: string;
  price: number;
  changePercent: number;
  changeUsd: number;
  icon: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  type: 'crypto' | 'forex';
}

export interface SovereignYieldData {
  name: string;
  code: string;
  yield: number;
  changeBps: number;
}

export interface WorldIndexData {
  code: string;
  name: string;
  price: number;
  changePercent: number;
}

export interface EconomicEventData {
  id: string;
  time: string;
  currency: string;
  country: string;
  title: string;
  impact: 'HIGH IMPACT' | 'MEDIUM' | 'LOW' | 'EARNINGS';
  forecast: string;
  prior: string;
  actual?: string;
}

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OrderPosition {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  shares: number;
  entryPrice: number;
  currentPrice: number;
  timestamp: string;
}
