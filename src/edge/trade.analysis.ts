import { Logger } from '../utils/logger';
import { TickerController } from '../controllers/ticker.controller'

export async function main() {
  const logger = new Logger();

  const tr = new TickerController();
  const result = await tr.loadSharesFromDb(83, null, 20100601);
}
