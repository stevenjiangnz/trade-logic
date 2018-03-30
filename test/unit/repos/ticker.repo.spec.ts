import { expect } from 'chai';
import { TickerRepo } from '../../../src/repos/ticker.repo';
import { TickerDoc } from '../../../src/repos/ticker.schema';
import * as config from 'config';

describe.skip('Share Repo Description', function () {
  this.timeout(5000);
  const tickerDocs = [{
    shareId: 83,
    symbol: 'AGL.AX',
    tradingDate: 20100315,
    open: 13.8875,
    close: 13.7947,
    high: 14.0545,
    low: 13.7947,
    ema_10: 13.648732854126534,
    ema_20: 13.437083464301379,
    sma_5: 13.81702,
    sma_10: 13.660229999999999,
    sma_30: 13.160823333333331,
    sma_50: 13.091738000000005,
    sma_200: null,
    bb_20_2_5_m: 13.31559,
    bb_20_2_5_h: 14.3549695502005,
    bb_20_2_5_l: 12.2762104497995,
    adx_di_plus: 31.643794277812827,
    adx_di_neg: 9.059169591710365,
    adx: 32.4037799150873,
    macd_hist_26_12_9: 0.062307555961730404,
    macd_signal_26_12_9: 0.17469493248950854,
    macd_26_12_9: 0.23700248845123895,
    heikin_open: 13.836407403575404,
    heikin_close: 13.88285,
    heikin_high: 14.0545,
    heikin_low: 13.7947,
    stoch_k: 87.02172341735532,
    stoch_d: 89.85927819663227,
    rsi_6: 65.257989739267,
    william_14: -20.14734393175651
  },
  {
    shareId: 83,
    symbol: 'AGL.AX',
    tradingDate: 20100316,
    open: 13.9524,
    close: 13.7484,
    high: 13.9524,
    low: 13.702,
    ema_10: 13.666854153376255,
    ema_20: 13.466732658177438,
    sma_5: 13.843,
    sma_10: 13.68714,
    sma_30: 13.186799999999998,
    sma_50: 13.102314000000003,
    sma_200: null,
    bb_20_2_5_m: 13.365225,
    bb_20_2_5_h: 14.377889575744977,
    bb_20_2_5_l: 12.352560424255024,
    adx_di_plus: 29.21538332653053,
    adx_di_neg: 11.205001037037192,
    adx: 33.271915064652084,
    macd_hist_26_12_9: 0.04547643717102676,
    macd_signal_26_12_9: 0.18606404178226524,
    macd_26_12_9: 0.231540478953292,
    heikin_open: 13.859628701787702,
    heikin_close: 13.838799999999999,
    heikin_high: 13.9524,
    heikin_low: 13.702,
    stoch_k: 81.63041309163962,
    stoch_d: 86.64072712103456,
    rsi_6: 60.31605966152113,
    william_14: -24.441073139572048
  }];

  const conn = config.get('settings.mongoConnection');

  it('Should save tickers ', async () => {
    const tr = new TickerRepo();
    await tr.connect(conn);

    const result = await tr.saveTickers(tickerDocs);
    console.log('result  ', result);
    await tr.disconnect();
  });

  it('Should get asx 50 tickers', async () => {
    const tr = new TickerRepo();
    await tr.connect(conn);

    const result = await tr.getAsx50Tickers();
    await tr.disconnect();
  });

  it('Should remove docs tickers', async () => {
    const tr = new TickerRepo();
    const ids = [];
    await tr.connect(conn);

    const result = await tr.getAsx50Tickers();
    result.forEach(r => {
      ids.push(r._id);
    });

    await tr.removeTickers(ids);
    await tr.disconnect();
  });
})