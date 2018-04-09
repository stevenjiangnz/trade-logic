export class Analysis {
  public isPeak?: boolean;
  public isBottom?: boolean;
  public isUpCross?: boolean;
  public isDownCross?: boolean;
  public originalIndex?: Number;
}

export class Ticker {
  shareId: Number;
  symbol: String;
  tradingDate: Number;
  open: Number;
  close: Number;
  high: Number;
  low: Number;
  ema_10: Number;
  ema_20: Number;
  sma_5: Number;
  sma_10: Number;
  sma_30: Number;
  sma_50: Number;
  sma_200: Number;
  bb_20_2_5_m: Number;
  bb_20_2_5_h: Number;
  bb_20_2_5_l: Number;
  adx_di_plus: Number;
  adx_di_neg: Number;
  adx: Number;
  macd_hist_26_12_9: Number;
  macd_signal_26_12_9: Number;
  macd_26_12_9: Number;
  heikin_open: Number;
  heikin_close: Number;
  heikin_high: Number;
  heikin_low: Number;
  stoch_k: Number;
  stoch_d: Number;
  rsi_6: Number;
  william_14: Number;
  analysis?: Analysis;
}