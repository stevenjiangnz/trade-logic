import * as config from 'config';
import * as fs from 'fs';
import * as _ from 'lodash';
import { ShareService } from '../services/share.service';
import { ShareRepo } from '../repos/share.repo';
import { TickerRepo } from '../repos/ticker.repo';
import { Logger } from '../utils/logger';

export class ShareController {
  conn = config.get('settings.mongoConnection');
  private sr: ShareRepo;
  private shares;
  constructor() {
    this.sr = new ShareRepo();
  }

  public loadAsx50FromDisk(path: string): Promise<any> {
    const shareList = [];
    const csv = require('csv-parser');

    return new Promise((resolver, reject) => {
      fs.createReadStream(path)
      .pipe(csv({
        separator: ',',
      }))
      .on('data', function (data) {
        shareList.push({
          code: data[Object.keys(data)[0]], // hacking to get the code
          company: data.Company,
          sector: data.Sector,
          marketCap: data['Market Cap'],
          weight: data['Weight(%)'] ? Number(data['Weight(%)']) : 0
        });
      })
      .on('end', function () {
        resolver(shareList);
      });
    });
  }

  public async loadAsx50ListFull(path): Promise<any> {
    const shareService = new ShareService();

    const shareList = await shareService.getShareList();
    const asxList = await this.loadAsx50FromDisk(path);

    asxList.forEach(asx50 => {
      const result = _.find(shareList, (o) => {
        return o.symbol ===  asx50.code + '.AX';
      })

      if (!result) {
        console.log('missing share', asx50);
      } else {
        asx50.shareId = result.id;
        asx50.symbol = asx50.code + '.AX';
      }
    });

    const sr = new ShareRepo();

    await sr.connect(this.conn);
    const savedAsxList = await sr.saveAsx50Shares(asxList);

    await sr.disconnect();
    return savedAsxList;
  }

  public async saveIndicators(shareID): Promise<any> {
    await this.sr.connect(this.conn);

    const asxList = await this.sr.getAsx50Shares();
  }

  public async getIndicators(shareID, startDate = null, endDate = null): Promise<any> {
    const ss = new ShareService();

    const indictorObj = await ss.getTickerWithIndicator(shareID, startDate, endDate);

    return this.getTickerListFromIndicator(indictorObj);
  }

  public async loadTickersIntoDb(): Promise<any> {
    this.shares = await this.loadSharesFromDb();

    const tr = new TickerRepo();
    tr.connect(this.conn);

    let count = 0;
    this.shares.forEach(async (s) => {
      console.log('about to process', s.symbol)
      const tickerList = await this.getIndicators(s.shareId);
      count += tickerList.length;
      console.log('found itmes: ', tickerList.length, s.symbol, count);
      tr.saveTickers(tickerList);
    });

    tr.disconnect();
    return null;
  }

  public async loadSharesFromDb() {
    const sr = new ShareRepo();
    sr.connect(this.conn);
    const shares = await sr.getAsx50Shares();
    sr.disconnect();

    return shares;
  }
  private getTickerListFromIndicator(indicatorObj) {
    const tickerDocs = [];
    let share = null;
    let len = 0;

    if (indicatorObj && indicatorObj.tickerList && indicatorObj.tickerList.length > 0) {
      len = indicatorObj.tickerList.length;
      share = _.find(this.shares, (s) => s.shareId === indicatorObj.tickerList[0].shareId);
    }

    for (let i = 0; i < len; i++) {
      const tDoc = {
        shareId: share.shareId,
        symbol: share.symbol,
        tradingDate: indicatorObj.tickerList[i].tradingDate,
        open: indicatorObj.tickerList[i].open,
        close: indicatorObj.tickerList[i].close,
        high: indicatorObj.tickerList[i].high,
        low: indicatorObj.tickerList[i].low,
        ema_10: indicatorObj.indicators['ema,10'][i],
        ema_20: indicatorObj.indicators['ema,20'][i],
        sma_5: indicatorObj.indicators['sma,5'][i],
        sma_10: indicatorObj.indicators['sma,10'][i],
        sma_30: indicatorObj.indicators['sma,30'][i],
        sma_50: indicatorObj.indicators['sma,50'][i],
        sma_200: indicatorObj.indicators['sma,200'][i],
        bb_20_2_5_m: indicatorObj.indicators['bb,20,2.5_m'][i],
        bb_20_2_5_h: indicatorObj.indicators['bb,20,2.5_h'][i],
        bb_20_2_5_l: indicatorObj.indicators['bb,20,2.5_l'][i],
        adx_di_plus: indicatorObj.indicators['adx_di+'][i],
        adx_di_neg: indicatorObj.indicators['adx_di-'][i],
        adx: indicatorObj.indicators['adx'][i],
        macd_hist_26_12_9: indicatorObj.indicators['hist_macd,26,12,9'][i],
        macd_signal_26_12_9: indicatorObj.indicators['signal_macd,26,12,9'][i],
        macd_26_12_9: indicatorObj.indicators['macd,26,12,9'][i],
        heikin_open: indicatorObj.indicators['open_heikin'][i],
        heikin_close: indicatorObj.indicators['close_heikin'][i],
        heikin_high: indicatorObj.indicators['high_heikin'][i],
        heikin_low: indicatorObj.indicators['low_heikin'][i],
        stoch_k: indicatorObj.indicators['stochastic,14,3_k'][i],
        stoch_d: indicatorObj.indicators['stochastic,14,3_d'][i],
        rsi_6: indicatorObj.indicators['rsi,6'][i],
        william_14: indicatorObj.indicators['william,14'][i],
      };

      tickerDocs.push(tDoc);
    }

    return tickerDocs;
  }
}