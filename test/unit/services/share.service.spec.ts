import { expect } from 'chai';
import { ShareService } from '../../../src/services/share.service';

describe.only('Trade Service Description', function () {
    this.timeout(5000);

    it('Should return share list', async () => {
        const ts = new ShareService();
        const shareList = await ts.getShareList();
        // console.log(shareList);
        expect(shareList).to.not.null;
        expect(shareList.length).to.gt(0);
    });

})