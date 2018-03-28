import { expect } from 'chai';
import { ShareService } from '../../../src/services/share.service';

describe('Trade Service Description', function () {
    this.timeout(5000);

    it('Should return share list', async () => {
        const ts = new ShareService();
        const shareList = await ts.getShareList();
        // console.log(shareList);
        expect(shareList).to.not.null;
        expect(shareList.length).to.gt(0);
    });

    it('Should return ticker with indicators', async () => {
        const ts = new ShareService();
        const tickerList = await ts.getTickerWithIndicator(83, 20101010, 20110202);
        expect(tickerList).to.not.null;
        expect(Object.keys(tickerList).length).to.gt(0);

        console.log(Object.keys(tickerList.indicators));
        expect(tickerList.tickerList.length).to.gt(0);
    });


})