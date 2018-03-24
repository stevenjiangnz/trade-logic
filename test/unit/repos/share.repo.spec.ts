import { expect } from 'chai';
import { ShareRepo } from '../../../src/repos/share.repo';

describe('Share Repo Description', function () {
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

    it('Should save share',  (done) => {
        const sr = new ShareRepo();

        sr.saveAsx50Share(asxList).then(() => {
          done();
        });
    });

})