import { Logger } from '../utils/logger';
import { TradeController } from '../controller/trade.controller'
import { TickerController } from '../controller/ticker.controller'
import { ShareController } from '../controller/share.controller'
import { TurningScan } from '../logic/turning.scan'
import { CrossScan } from '../logic/cross.scan'

export async function main() {
  const logger = new Logger();

  const sr = new ShareController();

  const shareLists = await sr.loadSharesFromDb();
  const tc = new TradeController();

  tc.analysisByShareList(shareLists, 20080101, 20120117);
  console.log(shareLists);
  // const tr = new TickerController();
  // const result = await tr.loadSharesFromDb(83, 20080101, 20120117);
  // const ts = new CrossScan();
  // const tc = new TradeController();

  // const aReturn = tc.analysis(result, ts);
}
