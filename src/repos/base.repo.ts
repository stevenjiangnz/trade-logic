import * as config from 'config';
import { Logger } from '../utils/logger';

export class BaseRepo {
  public logger: any;
  constructor() {
    this.logger = new Logger();
  }
}