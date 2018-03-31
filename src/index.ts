import { main as dataLoader} from './edge/data.loader';
import { main as tradeAnalysis} from './edge/trade.analysis';
import { Logger } from './utils/logger';

async function main() {
  let action = '';
  const logger = new Logger();

  if (process.argv.length > 2) {
    action = process.argv[2];
  }

  switch (action) {
    case 'data.loader':
      await dataLoader();
      break;
    case 'trade.analysis':
      tradeAnalysis();
      break;
    default:
      logger.error(`input paremeter (${action}) is not supported.`);
      break;
  }
}

main();
