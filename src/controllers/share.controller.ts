import * as config from 'config';
import * as fs from 'fs';
import {ShareService} from '../services/share.service';

export class ShareController {
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

    console.log('share detail 111 ', shareList[0]);
    return shareList;
  }
}