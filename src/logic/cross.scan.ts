import * as _ from 'lodash';
import { IScan } from '../interface/iscan'
import { Logger } from '../utils/logger';
import { FileHelper } from '../utils/file.helper';
import { Analysis} from '../entity/model';
import { TickerHelper } from '../utils/ticker.helper';

export class CrossScan implements IScan {
  private logger;
  public input;
  private LONG_LINE = 'bb_20_2_5_m';
  private SHORT_LINE = 'ema_10';

  constructor() {
    this.logger = new Logger();
  }

  get criteria() {
    return (items) => {
      const output = [];
      const len = items.length

      for (let i = 1; i < len - 1 ; i++) {

        if (items[i - 1][this.SHORT_LINE] > items[i - 1][this.LONG_LINE] && items[i][this.SHORT_LINE] < items[i][this.LONG_LINE]) {
          items[i].analysis = new Analysis();
          (items[i].analysis as Analysis).isDownCross = true;
          (items[i].analysis as Analysis).originalIndex = i;

          output.push(items[i]);
        }
        if (items[i - 1][this.SHORT_LINE] < items[i - 1][this.LONG_LINE] && items[i][this.SHORT_LINE] > items[i][this.LONG_LINE]) {
          items[i].analysis = new Analysis();
          (items[i].analysis as Analysis).isUpCross = true;
          (items[i].analysis as Analysis).originalIndex = i;

          output.push(items[i]);
        }
      }

      console.log('found cross ', output.length);
      FileHelper.writeToFile('./output/output_cross.json', JSON.stringify(output, null, 2));
      return output;
    };

  }

  get filter() {
    return (items) => {
      const output = [];

      for (let i = 0; i < items.length; i++) {
        if (i === 0) {
          items[i].analysis.spanDays = items[i].analysis.originalIndex;
          items[i].analysis.diffPer = (this.getMaxDiff(0, items[i].analysis.originalIndex, items[i].analysis.isUpCross)) / items[i][this.LONG_LINE];
          output.push(items[i]);
        } else {
          items[i].analysis.spanDays = items[i].analysis.originalIndex - items[i - 1].analysis.originalIndex;
          items[i].analysis.diffPer = (this.getMaxDiff(items[i - 1].analysis.originalIndex, items[i].analysis.originalIndex, items[i].analysis.isUpCross)) / items[i - 1][this.LONG_LINE];
          output.push(items[i]);
        }

      }

      console.log('found filtered ', output.length);
      FileHelper.writeToFile('./output/output_filtered.json', JSON.stringify(output, null, 2));

      const summaryList = [];

      output.forEach(item => {
        const summary = {
          tradingDate: item.tradingDate,
          isDownCross: item.analysis.isDownCross,
          isUpCross: item.analysis.isUpCross,
          spanDays: item.analysis.spanDays,
          diffPer: (item.analysis.diffPer * 100).toFixed(4)
        };

        summaryList.push(summary);
      });

      // this.logger.table(summaryList, './output/output_summary3.json');

      const spanAvg = _.meanBy(summaryList, 'spanDays');

      let sumPer = 0;

      summaryList.forEach(element => {
        sumPer += element['diffPer'] * 1;
      });

      // console.log('avg:  ', spanAvg, sumPer / summaryList.length, summaryList.length);
      // FileHelper.writeToFile('./output/output_summary2.json', JSON.stringify(summaryList));
      return summaryList;
    } ;
  }

  public scan(input) {
    this.input = input;
    const scannedList = this.criteria(input);
    const filteredList = this.filter(scannedList);
    return filteredList;
  }

  private getMaxDiff(start, end, isUpCross) {
    let max = 0;

    for (let i = start; i < end; i++) {
      let measure = 'close';
      const diff = Math.abs(this.input[i][this.LONG_LINE] - this.input[i][measure])

      if (diff > max) {
        max = diff;
      }
    }

    return max;
  }
}