import {IScan} from '../interface/iscan';
import { Logger } from '../utils/logger';
import { FileHelper } from '../utils/file.helper';
import { Analysis} from '../entity/model'


export class TurningScan implements IScan {
  private logger;
  public input;

  constructor() {
    this.logger = new Logger();
  }

  get criteria() {
    const IND = 'ema_10';
    return (input) => {
      const output = [];
      const len = input.length

      for (let i = 1; i < len - 1 ; i++) {
        if (input[i - 1][IND] > input[i][IND] && input[i][IND] < input[i + 1][IND]) {
          input[i].analysis = new Analysis();
          (input[i].analysis as Analysis).isBottom = true;

          output.push(input[i]);
        }
        if (input[i - 1][IND] < input[i][IND] && input[i][IND] > input[i + 1][IND]) {
          input[i].analysis = new Analysis();
          (input[i].analysis as Analysis).isPeak = true;

          output.push(input[i]);
        }
      }

      FileHelper.writeToFile('./output.json', JSON.stringify(output, null, 2));
      return output;
    };
  }

  public scan(input) {
    return this.criteria(input);
  }
}