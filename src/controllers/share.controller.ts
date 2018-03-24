import * as config from 'config';
import * as fs from 'fs';
import * as _ from 'lodash';
import { ShareService } from '../services/share.service';
import { ShareRepo } from '../repos/share.repo';
import { Logger } from '../utils/logger';

export class ShareController {
  conn = config.get('settings.mongoConnection');
  constructor() {
  }

  public loadAsx50FromDisk(path: string): Promise<any> {
    const shareList = [];
    const csv = require('csv-parser');

    return new Promise((resolver, reject) => {
      fs.createReadStream(path)
      .pipe(csv({
        separator: ',',
      }))
      .on('data', function (data) {
        shareList.push({
          code: data[Object.keys(data)[0]], // hacking to get the code
          company: data.Company,
          sector: data.Sector,
          marketCap: data['Market Cap'],
          weight: data['Weight(%)'] ? Number(data['Weight(%)']) : 0
        });
      })
      .on('end', function () {
        resolver(shareList);
      });
    });
  }

  public async loadAsx50ListFull(path): Promise<any> {
    const shareService = new ShareService();

    const shareList = await shareService.getShareList();
    const asxList = await this.loadAsx50FromDisk(path);

    asxList.forEach(asx50 => {
      const result = _.find(shareList, (o) => {
        return o.symbol ===  asx50.code + '.AX';
      })

      if (!result) {
        console.log('missing share', asx50);
      } else {
        asx50.shareId = result.id;
        asx50.symbol = asx50.code + '.AX';
      }
    });

    const sr = new ShareRepo();

    await sr.connect(this.conn);
    const savedAsxList = await sr.saveAsx50Shares(asxList);

    await sr.disconnect();
    return savedAsxList;
  }
}