import * as config from 'config';
import * as fs from 'fs';

export class ShareController {
  constructor() {
  }

  public loadAsx50(path: string): Promise<any> {
    const shareList = [];
    const csv = require('csv-parser');

    return new Promise((resolver, reject) => { fs.createReadStream(path)
    .pipe(csv({
      separator: ',',
    }))
    .on('data', function (data) {
      shareList.push ({
        code:  data[Object.keys(data)[0]], // hacking to get the code
        company: data.Company,
        sector: data.Sector,
        marketCap: data['Market Cap'],
        weight: data['Weight(%)'] ? Number(data['Weight(%)']) : 0
      });
    })
    .on('end', function() {
      resolver(shareList);
    });
  });
  }
}