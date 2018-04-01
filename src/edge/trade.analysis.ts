import { Logger } from '../utils/logger';
import { TradeController } from '../controller/trade.controller'
import { TickerController } from '../controller/ticker.controller'
import { TurningScan } from '../logic/turning.scan'

export async function main() {
  const logger = new Logger();
  const tr = new TickerController();
  const result = await tr.loadSharesFromDb(83, 20090601, 20100601);
  const ts = new TurningScan();
  const tc = new TradeController();

  tc.analysis(result, ts);
}
