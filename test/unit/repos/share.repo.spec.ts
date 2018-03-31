import { expect } from 'chai';
import { ShareRepo } from '../../../src/repos/share.repo';
import * as config from 'config';

describe.skip('Share Repo Description', function () {
    this.timeout(5000);
    const asxList = [{ code: 'AGL',
    company: 'AGL Energy Limited',
    sector: 'Utilities',
    marketCap: '14,336,300,000',
    weight: 1.11,
    shareId: 83,
    symbol: 'AGL.AX' },
  { code: 'ALL',
    company: 'Aristocrat Leisure',
    sector: 'Consumer Discretionary',
    marketCap: '15,740,100,000',
    weight: 1.22,
    shareId: 140,
    symbol: 'ALL.AX' }];

    const conn = config.get('settings.mongoConnection');

    it('Should save asx 50 shares',  async () => {
        const sr = new ShareRepo();
        await sr.connect(conn);

        const result = await sr.saveAsx50Shares(asxList);
        await sr.disconnect();
    });

    it('Should get asx 50 shares',  async () => {
      const sr = new ShareRepo();
      await sr.connect(conn);

      const result = await sr.getAsx50Shares();
      await sr.disconnect();
  });

})