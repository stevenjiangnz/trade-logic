import { main as dataLoader} from './edge/data.loader';

function main() {
  let action = '';

  if (process.argv.length > 2) {
    action = process.argv[2];
  }

  switch (action) {
    case 'data.loader':
      dataLoader();
      break;
    default:
      break;
  }
}

main();
