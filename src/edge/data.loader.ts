import { Logger } from '../utils/logger';
import {ShareController} from '../controller/share.controller';

export async function main() {
  const logger = new Logger();
  const sc = new ShareController();
  const result = await sc.loadSharesFromDb();
  console.log('result for share list: ', result);
  logger.info('data loader is still to be wired up...');
}
