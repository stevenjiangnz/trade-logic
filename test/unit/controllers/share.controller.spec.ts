import { expect } from 'chai';
import { ShareController } from '../../../src/controllers/share.controller';
import * as _ from 'lodash';

describe.skip('Share Repo Description', function () {
    this.timeout(15000);
    const path = './fixture/asx50.csv';

    it('Should load asx 50 from the disk', async () => {
        const sc = new ShareController();
        const shareList = await sc.loadAsx50FromDisk(path);
        expect(shareList.length).to.gt(0);
    });

    it('Should load ASX list full', async () => {
        const sc = new ShareController();
        const shareList = await sc.loadAsx50ListFull(path);

        expect(shareList.length).to.gt(10);
    });

    it('Should get indicators for the given share', async () => {
        const sc = new ShareController();
        const tickerList = await sc.getIndicators(83, 20100101, 20100606);
        expect(tickerList.length).to.gt(10);
    });

    it('Should load tickers into the db', async () => {
        const sc = new ShareController();
        await sc.loadTickersIntoDb();
    });
})